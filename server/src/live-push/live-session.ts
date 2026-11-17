import { CreateLiveStreamDto } from 'src/live-streams/dtos/create-live-stream.dto';
import { LiveStreamPlatformEnum } from 'src/shared/constants';
import { LivePushState } from './live-push-state.entity';

/**
 * A value that stays the same for one broadcast and changes for the next one.
 * Providers differ: X reports the scan time as startedAt, and Kick uses the
 * channel slug as videoId.
 */
export function broadcastKey(stream: CreateLiveStreamDto): string {
  const channel = stream.channelId || stream.channelName || '';
  switch (stream.platform) {
    case LiveStreamPlatformEnum.KICK:
      return `${stream.videoId || channel}|${stream.startedAt || ''}`;
    case LiveStreamPlatformEnum.X:
      return stream.videoId || stream.data?.url || channel;
    default:
      return stream.videoId || `${channel}|${stream.startedAt || ''}`;
  }
}

export function streamIdentities(
  streams: CreateLiveStreamDto[],
): Record<string, string> {
  return Object.fromEntries(
    streams.map((stream) => [stream.platform, broadcastKey(stream)]),
  );
}

export function isNewSession(
  state: LivePushState | undefined,
  identities: Record<string, string>,
  now: Date,
) {
  if (!state) return true;
  const shared = Object.keys(identities).filter(
    (platform) => state.identities[platform] !== undefined,
  );
  if (
    shared.some(
      (platform) => state.identities[platform] === identities[platform],
    )
  )
    return false;
  if (shared.length) return true;
  return now.getTime() - state.lastSeenAt.getTime() > 15 * 60_000;
}
