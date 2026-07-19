<script setup lang="ts">
import type { TipGoal } from "~/types";

const props = defineProps<{
  path?: string;
}>();

const { axios } = useApp();

const { data } = useLazyAsyncData(
  `tip-goal-${props.path}`,
  async () => {
    const { data } = await axios.get<{ tipsAmount: number; tipGoal: TipGoal }>(
      `/tip-goals/tips/${props.path}`,
    );

    return data;
  },
  { server: false },
);
</script>

<template>
  <div class="">
    <div class="flex justify-between">
      <span></span>
      <span class="">- XMR</span>
    </div>
    <div
      class="w-full flex justify-center bg-background-2 rounded-full overflow-hidden h-4 relative"
    >
      <div
        class="bg-primary h-full rounded-full absolute left-0 top-0 z-0"
        style="width: 70%"
      ></div>
      <div class="text-xs text-white relative">0.001 XMR (2%)</div>
    </div>
  </div>
</template>

<style scoped></style>
