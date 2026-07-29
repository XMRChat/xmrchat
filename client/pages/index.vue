<script lang="ts" setup>
import type { LiveStream } from "~/types";

useHead({});

const { axios } = useApp();
const { data, status, error } = useLazyAsyncData(
  "live-streams",
  async () => {
    const liveStreamsData = await axios.get<{ liveStreams: LiveStream[] }>(
      "/live-streams",
    );
    const totalTipsData = await axios.get<{
      tipsCount: number;
      totalAmount: number;
      pagesCount: number;
    }>("/tips/total");

    const [liveStreams, totalTips] = await Promise.all([
      liveStreamsData,
      totalTipsData,
    ]);

    return {
      liveStreams: liveStreams.data.liveStreams,
      totalTips: totalTips.data,
    };
  },
  { server: false },
);
</script>

<template>
  <HomeTotalTips
    :totalTips="data?.totalTips"
    :pending="status === 'pending' || status === 'idle'"
  />
  <div class="inner">
    <HomeHero />
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mt-8">
      <HomeFAQ :class="data?.liveStreams?.length ? `` : `col-span-full`" />
      <LiveStreams
        v-if="data?.liveStreams?.length"
        :liveStreams="data?.liveStreams"
        :pending="status === 'pending' || status === 'idle'"
        class="row-start-1 lg:row-start-auto"
      />
    </div>
  </div>
</template>

<style scoped></style>
