<script lang="ts" setup>
import type { LiveStream } from "~/types";
import { LiveStreamPlatformEnum } from "~/types/enums";

const props = defineProps<{
  liveStream?: LiveStream;
}>();

const { getLiveStreamPlatform } = useConstants();
const { toStreamer } = useRouteLocation();
const liveStreamPlatform = computed(() =>
  getLiveStreamPlatform(props.liveStream?.platform)
);
</script>

<template>
  <div
    class="relative h-[180px] flex flex-col justify-end rounded-lg overflow-hidden p-2 ring-gray-400 ring-1"
  >
    <img
      v-if="liveStream?.imageUrl"
      :src="liveStream?.imageUrl"
      alt=""
      class="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-50"
    />
    <div
      v-else
      class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-background"
    >
      <UIcon
        v-if="liveStreamPlatform"
        :name="liveStreamPlatform.icon"
        :class="liveStreamPlatform.colorClassName"
        size="80"
      />
    </div>
    <NuxtLink
      :to="toStreamer(liveStream?.page?.path || '')"
      class="relative z-10 bg-background-2/90 p-2 rounded-lg hover:bg-background-2/100 transition-colors ring-1 ring-border"
    >
      <!-- header -->
      <span class="flex items-center gap-2">
        <GeneralImage
          :url="liveStream?.page?.logo?.thumbnail || liveStream?.page?.logo?.url"
          variant="logo"
          class="w-[32px] h-[32px]"
        />
        <span class="grid flex-1">
          <span class="text-sm font-medium">{{
            liveStream?.page?.name || liveStream?.page?.path
          }}</span>
          <span class="text-xs">
            {{ getLiveStreamPlatform(liveStream?.platform)?.name }}
          </span>
        </span>
        <UIcon name="i-heroicons-arrow-top-right-on-square" />
      </span>
      <!-- description -->
      <p class="text-xs pt-2 truncate w-full">
        {{ liveStream?.description || liveStream?.title }}
      </p>
    </NuxtLink>
  </div>
</template>
