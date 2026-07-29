import type { LiveStream } from "~/types";
import { LiveStreamPlatformEnum } from "~/types/enums";

export const useLiveStreamPlayer = (
  liveStreams?: MaybeRef<LiveStream[] | undefined>
) => {
  const streams = computed(() => unref(liveStreams));

  const youtube = computed(() =>
    streams.value?.find(
      (stream) => stream.platform === LiveStreamPlatformEnum.YOUTUBE
    )
  );

  const twitch = computed(() =>
    streams.value?.find(
      (stream) => stream.platform === LiveStreamPlatformEnum.TWITCH
    )
  );

  const kick = computed(() =>
    streams.value?.find(
      (stream) => stream.platform === LiveStreamPlatformEnum.KICK
    )
  );

  const rumble = computed(() =>
    streams.value?.find(
      (stream) => stream.platform === LiveStreamPlatformEnum.RUMBLE
    )
  );

  const peertube = computed(() =>
    streams.value?.find(
      (stream) => stream.platform === LiveStreamPlatformEnum.PEERTUBE
    )
  );

  const livePlatforms = computed<LiveStreamPlatformEnum[]>(
    () =>
      streams.value?.map((stream) => stream.platform).filter((p) => !!p) || []
  );

  const liveStreamComputed = computed(() => {
    if (twitch.value) return twitch.value;
    if (kick.value) return kick.value;
    if (peertube.value) return peertube.value;
    if (youtube.value) return youtube.value;
    if (rumble.value) return rumble.value;
  });

  return {
    liveStream: liveStreamComputed,
    livePlatforms: livePlatforms,
  };
};
