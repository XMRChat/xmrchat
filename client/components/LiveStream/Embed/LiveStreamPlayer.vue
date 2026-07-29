<script setup lang="ts">
import type { LiveStream } from "~/types";
import { LiveStreamPlatformEnum } from "~/types/enums";

const props = defineProps<{
  liveStream?: LiveStream;
}>();

const type = computed(() => props.liveStream?.platform);
</script>

<template>
  <LiveStreamYoutube
    v-if="type === LiveStreamPlatformEnum.YOUTUBE"
    :liveStream="liveStream"
  />
  <LiveStreamTwitch
    v-if="type === LiveStreamPlatformEnum.TWITCH"
    :liveStream="liveStream"
  />
  <LiveStreamRumble
    v-if="type === LiveStreamPlatformEnum.RUMBLE"
    :liveStream="liveStream"
  />
  <LiveStreamPeertube
    v-if="type === LiveStreamPlatformEnum.PEERTUBE"
    :liveStream="liveStream"
  />
</template>
