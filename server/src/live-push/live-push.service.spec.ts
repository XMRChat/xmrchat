import { createECDH, randomBytes } from 'node:crypto';
import { EventEmitter } from 'node:events';
import { request } from 'node:https';
import * as webpush from 'web-push';
import { UnrecoverableError } from 'bullmq';
import { LivePushService } from './live-push.service';

jest.mock('node:https', () => ({ request: jest.fn() }));

describe('encrypted live push delivery', () => {
  const vapid = webpush.generateVAPIDKeys();
  const ecdh = createECDH('prime256v1');
  ecdh.generateKeys();
  const subscription = {
    id: '9431e16b-ab5a-4f51-90b6-fb64302fe065',
    endpoint: 'https://8.8.8.8/push',
    p256dh: ecdh.getPublicKey().toString('base64url'),
    auth: randomBytes(16).toString('base64url'),
    verifiedAt: new Date(),
  };
  let service: LivePushService;
  let repository: { findOneBy: jest.Mock; delete: jest.Mock };
  let status: number;
  let body: Buffer;

  beforeEach(() => {
    jest.clearAllMocks();
    status = 202;
    repository = {
      findOneBy: jest.fn().mockResolvedValue(subscription),
      delete: jest.fn(),
    };
    const config = {
      get: (key: string) =>
        ({
          XMRPOD_PUSH_VAPID_PUBLIC_KEY: vapid.publicKey,
          XMRPOD_PUSH_VAPID_PRIVATE_KEY: vapid.privateKey,
          XMRPOD_PUSH_VAPID_SUBJECT: 'https://xmrchat.com',
        })[key],
    };
    service = new LivePushService(
      config as any,
      repository as any,
      {} as any,
      {} as any,
    );
    (request as unknown as jest.Mock).mockImplementation(
      (_url, _options, callback) => {
        const response = Object.assign(new EventEmitter(), {
          statusCode: status,
          resume: jest.fn(),
        });
        const req = Object.assign(new EventEmitter(), {
          setTimeout: jest.fn(),
          end: (data: Buffer) => {
            body = data;
            callback(response);
            queueMicrotask(() => response.emit('end'));
          },
        });
        return req;
      },
    );
  });

  const job = () => ({
    id: subscription.id,
    endpoint: subscription.endpoint,
    message: { type: 'live' as const, sessionId: 'broadcast' },
    expiresAt: Date.now() + 300000,
  });

  it('sends RFC8291 ciphertext and pins the checked public address', async () => {
    await service.send(job());
    const options = (request as unknown as jest.Mock).mock.calls[0][1];
    expect(options.headers['Content-Encoding']).toBe('aes128gcm');
    expect(options.family).toBe(4);
    const callback = jest.fn();
    options.lookup('8.8.8.8', {}, callback);
    expect(callback).toHaveBeenCalledWith(null, '8.8.8.8', 4);
    expect(body.includes(Buffer.from('broadcast'))).toBe(false);
  });

  it('drops expired events and registrations removed after queueing', async () => {
    await service.send({ ...job(), expiresAt: Date.now() - 1 });
    repository.findOneBy.mockResolvedValue(null);
    await service.send(job());
    expect(request).not.toHaveBeenCalled();
  });

  it('does not fan out live events before the endpoint challenge is acknowledged', async () => {
    repository.findOneBy.mockResolvedValue({
      ...subscription,
      verifiedAt: null,
    });
    await service.send(job());
    expect(request).not.toHaveBeenCalled();
  });

  it('removes endpoints that the provider reports as gone', async () => {
    status = 410;
    await service.send(job());
    expect(repository.delete).toHaveBeenCalledWith(subscription.id);
  });

  it('retries a temporary provider failure', async () => {
    status = 503;
    await expect(service.send(job())).rejects.toThrow('503');
  });

  it('ignores an older challenge after a newer delivery test was requested', async () => {
    jest.spyOn(service, 'authorize').mockResolvedValue({
      ...subscription,
      challenge: 'new-challenge',
    } as any);
    await expect(
      service.acknowledge(subscription.id, 'token', 'old-challenge'),
    ).rejects.toMatchObject({ status: 409 });
  });

  it('accepts an acknowledgement retry after successful verification', async () => {
    jest
      .spyOn(service, 'authorize')
      .mockResolvedValue({ ...subscription, challenge: null } as any);
    await expect(
      service.acknowledge(subscription.id, 'token', 'same-challenge'),
    ).resolves.toEqual({ verified: true });
  });

  it.each([401, 403, 413])(
    'keeps the subscription and fails without retry on %s',
    async (code) => {
      status = code;
      const error = jest.spyOn((service as any).logger, 'error');
      error.mockImplementation(() => undefined);
      await expect(service.send(job())).rejects.toBeInstanceOf(
        UnrecoverableError,
      );
      expect(repository.delete).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalledWith(expect.stringContaining(`${code}`));
    },
  );

  it('removes endpoints that the provider reports as not found', async () => {
    status = 404;
    await service.send(job());
    expect(repository.delete).toHaveBeenCalledWith(subscription.id);
  });

  it.each([
    ['live', 'high'],
    ['test', 'high'],
    ['verify', 'normal'],
  ])('sends %s messages with urgency %s', async (type, urgency) => {
    await service.send({
      ...job(),
      message: { type: type as any, nonce: 'nonce' },
    });
    const options = (request as unknown as jest.Mock).mock.calls[0][1];
    expect(options.headers.Urgency).toBe(urgency);
  });
});
