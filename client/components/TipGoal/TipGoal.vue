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

const percentage = computed(() => {
  const amount = Number(data.value?.tipGoal.amount) ?? 0;
  const tipsAmount = Number(data.value?.tipsAmount) ?? 0;
  if (!tipsAmount) return 0;
  return (amount / tipsAmount) * 100;
});
</script>

<template>
  <div>
    <span>{{ data?.tipGoal.name }}</span>
    <div class="flex flex-col gap-1">
      <div class="flex justify-between">
        <span></span>
        <span class="">{{ data?.tipGoal.amount }} XMR</span>
      </div>
      <div
        class="w-full flex justify-center bg-background-2 rounded-full overflow-hidden h-4 relative"
      >
        <div
          class="bg-primary h-full rounded-full absolute left-0 top-0 z-0"
          style="width: 10%"
        ></div>
        <div class="text-xs text-white relative">
          {{ data?.tipsAmount }} XMR ({{ percentage }}%)
        </div>
      </div>
      <div class="flex justify-between">
        <span></span>
        <span class="text-sm text-pale">X remaining</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
