<script setup lang="ts">
import type { LiveStream } from "~/types";

const props = defineProps<{
  liveStream?: LiveStream;
}>();

const channel = computed(
  () => props.liveStream?.channelName || props.liveStream?.videoId,
);

const iframeUrl = computed(() => {
  if (!channel.value) return;
  return `https://player.kick.com/${channel.value}`;
});
</script>

<template>
  <iframe
    v-if="iframeUrl"
    :src="iframeUrl"
    allowfullscreen
    class="w-full aspect-[16/9] rounded-md"
  ></iframe>
</template>
