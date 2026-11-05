import { LivePushState } from './live-push-state.entity';
import { LiveStreamPlatformEnum } from 'src/shared/constants';
import { broadcastKey, isNewSession, streamIdentities } from './live-session';

describe('live broadcast identity', () => {
  const now = new Date('2026-10-15T12:00:00Z');
  const state = Object.assign(new LivePushState(), {
    identities: { twitch: 'stream-1|' },
    lastSeenAt: now,
  });

  it('does not notify again after repeated scans or a temporary platform failure', () => {
    expect(
      isNewSession(
        state,
        { twitch: 'stream-1|' },
        new Date(now.getTime() + 3600000),
      ),
    ).toBe(false);
  });

  it('recognizes a new broadcast on an existing platform', () => {
    expect(isNewSession(state, { twitch: 'stream-2|' }, now)).toBe(true);
  });

  it('consolidates simultaneous platforms and a brief platform switch', () => {
    expect(
      isNewSession(state, { twitch: 'stream-1|', youtube: 'video-1|' }, now),
    ).toBe(false);
    expect(isNewSession(state, { youtube: 'video-1|' }, now)).toBe(false);
  });

  it('recognizes a later broadcast on a new platform', () => {
    expect(
      isNewSession(
        state,
        { youtube: 'video-2|' },
        new Date(now.getTime() + 3600000),
      ),
    ).toBe(true);
  });

  const scan = (stream: any, at: Date, previous?: LivePushState) => {
    const identities = streamIdentities([stream]);
    const fresh = isNewSession(previous, identities, at);
    const next = Object.assign(new LivePushState(), {
      identities: fresh
        ? identities
        : { ...previous.identities, ...identities },
      lastSeenAt: at,
    });
    return { fresh, state: next };
  };

  it('keeps one X session across scans even though startedAt is the scan time', () => {
    let state: LivePushState | undefined;
    const results = [];
    for (let minute = 0; minute < 4; minute++) {
      const at = new Date(now.getTime() + minute * 5 * 60_000);
      const result = scan(
        {
          platform: LiveStreamPlatformEnum.X,
          videoId: 'https://x.com/i/broadcasts/1',
          channelId: 'creator',
          startedAt: at.toISOString(),
        },
        at,
        state,
      );
      results.push(result.fresh);
      state = result.state;
    }
    expect(results).toEqual([true, false, false, false]);
    expect(
      scan(
        {
          platform: LiveStreamPlatformEnum.X,
          videoId: 'https://x.com/i/broadcasts/2',
          startedAt: now.toISOString(),
        },
        now,
        state,
      ).fresh,
    ).toBe(true);
  });

  it('recognizes a new Kick broadcast on the same channel slug', () => {
    const kick = (startedAt: string) => ({
      platform: LiveStreamPlatformEnum.KICK,
      videoId: 'creator',
      channelName: 'creator',
      startedAt,
    });
    const first = scan(kick('2026-10-15 11:00:00'), now);
    const repeat = scan(kick('2026-10-15 11:00:00'), now, first.state);
    expect(repeat.fresh).toBe(false);
    expect(scan(kick('2026-10-15 13:00:00'), now, repeat.state).fresh).toBe(
      true,
    );
  });

  it('treats a provider gap shorter than 15 minutes as the same broadcast', () => {
    expect(
      isNewSession(
        state,
        { youtube: 'video-9' },
        new Date(now.getTime() + 14 * 60_000),
      ),
    ).toBe(false);
    expect(
      isNewSession(
        state,
        { youtube: 'video-9' },
        new Date(now.getTime() + 16 * 60_000),
      ),
    ).toBe(true);
  });

  it.each([
    [LiveStreamPlatformEnum.YOUTUBE, 'yt-video'],
    [LiveStreamPlatformEnum.TWITCH, 'twitch-stream'],
    [LiveStreamPlatformEnum.RUMBLE, 'rumble-id'],
    [LiveStreamPlatformEnum.PEERTUBE, 'short-uuid'],
  ])('uses the %s video id as the broadcast key', (platform, videoId) => {
    expect(
      broadcastKey({
        platform,
        videoId,
        startedAt: new Date().toISOString(),
      }),
    ).toBe(videoId);
  });
});
