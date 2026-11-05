import { THROTTLER_TRACKER } from '@nestjs/throttler/dist/throttler.constants';
import { LivePushController } from './live-push.controller';
import { pushClientTracker } from './push-client-ip';

describe('push throttle tracker', () => {
  const req = (remoteAddress: string, forwarded?: string | string[]) => ({
    ip: remoteAddress,
    socket: { remoteAddress },
    headers: forwarded ? { 'x-forwarded-for': forwarded } : {},
  });

  it('separates phones behind Traefik by the address Traefik appended', () => {
    expect(pushClientTracker(req('::ffff:172.18.0.5', '203.0.113.7'))).toBe(
      '203.0.113.7',
    );
    expect(pushClientTracker(req('172.18.0.5', '198.51.100.2'))).toBe(
      '198.51.100.2',
    );
  });

  it('ignores spoofed entries before the one Traefik appended', () => {
    expect(pushClientTracker(req('172.18.0.5', '1.2.3.4, 203.0.113.7'))).toBe(
      '203.0.113.7',
    );
    expect(
      pushClientTracker(req('172.18.0.5', ['1.2.3.4', '203.0.113.9'])),
    ).toBe('203.0.113.9');
  });

  it('does not trust forwarded headers on direct public connections', () => {
    expect(pushClientTracker(req('203.0.113.7', '1.2.3.4'))).toBe(
      '203.0.113.7',
    );
  });

  it('falls back to the socket address without a usable header', () => {
    expect(pushClientTracker(req('172.18.0.5'))).toBe('172.18.0.5');
    expect(pushClientTracker(req('172.18.0.5', 'not-an-ip'))).toBe(
      '172.18.0.5',
    );
  });

  it('is used only by the push controller throttle', () => {
    expect(
      Reflect.getMetadata(THROTTLER_TRACKER + 'default', LivePushController),
    ).toBe(pushClientTracker);
  });
});
