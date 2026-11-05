import { LiveStreamPlatformEnum, PageStatusEnum } from 'src/shared/constants';
import { LivePushService } from './live-push.service';
import { LivePushState } from './live-push-state.entity';

describe('live push snapshot and outbox', () => {
  const stream = (videoId: string) => ({
    pageId: 1,
    platform: LiveStreamPlatformEnum.YOUTUBE,
    videoId,
    startedAt: new Date(Date.now() - 60_000).toISOString(),
    data: { embedUrl: 'https://example.com/player' },
  });

  const harness = (pages: any[]) => {
    const saved = new Map<number, LivePushState>();
    const events: any[] = [];
    const states = {
      existsBy: async ({ pageId }) => saved.has(pageId),
      findOneBy: async ({ pageId }) => saved.get(pageId),
      create: (value) => Object.assign(new LivePushState(), value),
      save: async (value) => saved.set(value.pageId, value),
    };
    const manager = {
      query: jest.fn(),
      getRepository: () => states,
      findBy: async () => pages,
      save: async (_entity, event) => events.push(event),
    };
    return { manager: manager as any, events, saved };
  };
  const service = (configured: boolean) =>
    new LivePushService(
      { get: () => (configured ? 'configured' : undefined) } as any,
      {} as any,
      {} as any,
      {} as any,
    );

  it('tracks sessions and returns session fields without VAPID keys, but writes no events', async () => {
    const page = { id: 1, path: 'creator', isPublic: true };
    const { manager, events } = harness([page]);
    const push = service(false);
    const first = await push.updateSnapshot(manager, [stream('first')]);
    const again = await push.updateSnapshot(manager, [stream('first')]);
    await push.updateSnapshot(manager, []);
    const later = await push.updateSnapshot(manager, [stream('second')]);
    expect(first[0].data.notificationSessionId).toEqual(expect.any(String));
    expect(first[0].data.notificationStartedAt).toEqual(expect.any(String));
    expect(again[0].data.notificationSessionId).toBe(
      first[0].data.notificationSessionId,
    );
    expect(later[0].data.notificationSessionId).not.toBe(
      first[0].data.notificationSessionId,
    );
    expect(events).toHaveLength(0);
  });

  it('keeps one session and one alert for an X stream whose startedAt changes every scan', async () => {
    const page = { id: 1, path: 'creator', isPublic: true };
    const { manager, events } = harness([page]);
    const push = service(true);
    await push.updateSnapshot(manager, []);
    const x = (url: string, minutesAgo: number) => ({
      pageId: 1,
      platform: LiveStreamPlatformEnum.X,
      videoId: url,
      channelId: 'creator',
      startedAt: new Date(Date.now() - minutesAgo * 60_000).toISOString(),
      data: { url },
    });
    const ids = [];
    for (const minutesAgo of [0, 1, 2, 3]) {
      const [result] = await push.updateSnapshot(manager, [
        x('https://x.com/i/broadcasts/one', minutesAgo),
      ]);
      ids.push(result.data.notificationSessionId);
    }
    expect(new Set(ids).size).toBe(1);
    expect(events).toHaveLength(1);
    expect(events[0].id).toBe(ids[0]);

    await push.updateSnapshot(manager, [
      x('https://x.com/i/broadcasts/two', 0),
    ]);
    expect(events).toHaveLength(2);
  });

  it('keeps deactivated pages silent but still tracks their session', async () => {
    const page = {
      id: 1,
      path: 'creator',
      isPublic: true,
      status: PageStatusEnum.DEACTIVE,
    };
    const { manager, events } = harness([page]);
    const push = service(true);
    await push.updateSnapshot(manager, []);
    const [result] = await push.updateSnapshot(manager, [stream('first')]);
    expect(events).toHaveLength(0);
    expect(result.data.notificationSessionId).toEqual(expect.any(String));
  });

  it('passes through streams whose page no longer exists', async () => {
    const { manager } = harness([]);
    const orphan = { ...stream('orphan'), pageId: 99 };
    await expect(
      service(true).updateSnapshot(manager, [orphan]),
    ).resolves.toEqual([orphan]);
  });

  it('keeps a silent baseline, preserves stream data and emits one event for a later simulcast', async () => {
    const saved = new Map<number, LivePushState>();
    const events: any[] = [];
    const states = {
      existsBy: async ({ pageId }) => saved.has(pageId),
      findOneBy: async ({ pageId }) => saved.get(pageId),
      create: (value) => Object.assign(new LivePushState(), value),
      save: async (value) => saved.set(value.pageId, value),
    };
    const page = { id: 1, path: 'creator', isPublic: true };
    const manager = {
      query: jest.fn(),
      getRepository: () => states,
      findBy: async () => [page],
      save: async (_entity, event) => events.push(event),
    };
    const service = new LivePushService(
      { get: () => 'configured' } as any,
      {} as any,
      {} as any,
      {} as any,
    );
    const first = stream('first');
    const baseline = await service.updateSnapshot(manager as any, [first]);
    const repeated = await service.updateSnapshot(manager as any, [first]);
    expect(events).toHaveLength(0);
    expect(repeated[0].data.notificationSessionId).toBe(
      baseline[0].data.notificationSessionId,
    );
    expect(repeated[0].data.embedUrl).toBe(first.data.embedUrl);

    await service.updateSnapshot(manager as any, []);
    await service.updateSnapshot(manager as any, [first]);
    expect(events).toHaveLength(0);

    const second = stream('second');
    const simulcast = await service.updateSnapshot(manager as any, [
      second,
      { ...second, platform: LiveStreamPlatformEnum.TWITCH, videoId: 'twitch' },
    ]);
    expect(events).toHaveLength(1);
    expect(events[0].message.path).toBe('creator');
    expect(simulcast[0].data.notificationSessionId).toBe(events[0].id);
    expect(simulcast[1].data.notificationSessionId).toBe(events[0].id);
    expect(events[0].id).not.toBe(baseline[0].data.notificationSessionId);

    page.isPublic = false;
    await service.updateSnapshot(manager as any, [stream('private')]);
    expect(events).toHaveLength(1);
  });

  it('leaves a failed fanout pending and retries with the same delivery identifier', async () => {
    const event = {
      id: 'event-id',
      message: { type: 'live', path: 'creator' },
      expiresAt: new Date(Date.now() + 300_000),
    };
    const pending: any = {};
    for (const method of [
      'where',
      'andWhere',
      'setLock',
      'setOnLocked',
      'take',
    ])
      pending[method] = jest.fn().mockReturnValue(pending);
    pending.getMany = jest.fn().mockResolvedValue([event]);
    const cleanup: any = {};
    for (const method of ['delete', 'where'])
      cleanup[method] = jest.fn().mockReturnValue(cleanup);
    cleanup.execute = jest.fn();
    const manager = {
      getRepository: () => ({ createQueryBuilder: () => pending }),
      update: jest.fn(),
    };
    const subscriptions = {
      find: jest
        .fn()
        .mockResolvedValue([
          { id: 'installation', endpoint: 'https://example.com/push' },
        ]),
      createQueryBuilder: () => cleanup,
    };
    const queue = {
      addBulk: jest.fn().mockRejectedValueOnce(new Error('Redis unavailable')),
    };
    const service = new LivePushService(
      { get: () => 'configured' } as any,
      subscriptions as any,
      {
        manager: { transaction: (callback) => callback(manager) },
        createQueryBuilder: () => cleanup,
      } as any,
      queue as any,
    );
    await expect(service.dispatch()).rejects.toThrow('Redis unavailable');
    expect(manager.update).not.toHaveBeenCalled();
    await service.dispatch();
    expect(manager.update).toHaveBeenCalledWith(expect.anything(), event.id, {
      dispatched: true,
    });
    expect(queue.addBulk.mock.calls[0][0][0].opts.jobId).toBe(
      'event-id-installation',
    );
    expect(queue.addBulk.mock.calls[1][0][0].opts.jobId).toBe(
      'event-id-installation',
    );
  });

  it('fans out with addBulk in pages of 250', async () => {
    const event = {
      id: 'event-id',
      message: { type: 'live', path: 'creator' },
      expiresAt: new Date(Date.now() + 300_000),
    };
    const pending: any = {};
    for (const method of [
      'where',
      'andWhere',
      'setLock',
      'setOnLocked',
      'take',
    ])
      pending[method] = jest.fn().mockReturnValue(pending);
    pending.getMany = jest.fn().mockResolvedValue([event]);
    const cleanup: any = {};
    for (const method of ['delete', 'where'])
      cleanup[method] = jest.fn().mockReturnValue(cleanup);
    cleanup.execute = jest.fn();
    const all = Array.from({ length: 600 }, (_, index) => ({
      id: `installation-${String(index).padStart(3, '0')}`,
      endpoint: 'https://example.com/push',
    }));
    const subscriptions = {
      find: jest.fn(async ({ skip, take }) => all.slice(skip, skip + take)),
      createQueryBuilder: () => cleanup,
    };
    const queue = { addBulk: jest.fn(), add: jest.fn() };
    const manager = {
      getRepository: () => ({ createQueryBuilder: () => pending }),
      update: jest.fn(),
    };
    await new LivePushService(
      { get: () => 'configured' } as any,
      subscriptions as any,
      {
        manager: { transaction: (callback) => callback(manager) },
        createQueryBuilder: () => cleanup,
      } as any,
      queue as any,
    ).dispatch();
    expect(queue.add).not.toHaveBeenCalled();
    expect(queue.addBulk.mock.calls.map(([jobs]) => jobs.length)).toEqual([
      250, 250, 100,
    ]);
    const jobIds = queue.addBulk.mock.calls.flatMap(([jobs]) =>
      jobs.map((job) => job.opts.jobId),
    );
    expect(new Set(jobIds).size).toBe(600);
    expect(queue.addBulk.mock.calls[0][0][0]).toMatchObject({
      name: 'send',
      data: { id: 'installation-000', message: event.message },
      opts: { attempts: 6 },
    });
  });
});
