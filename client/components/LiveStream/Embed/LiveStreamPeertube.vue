<script setup lang="ts">
import type { LiveStream } from "~/types";

const props = defineProps<{
  liveStream?: LiveStream;
}>();

const iframeUrl = computed(() => props.liveStream?.embedUrl);
</script>

<template>
  <iframe
    v-if="iframeUrl"
    :src="iframeUrl"
    allowfullscreen
    class="w-full aspect-[16/9] rounded-md"
  ></iframe>
</template>
