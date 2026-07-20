<script setup lang="ts">
import type { TipGoal } from "~/types";

const props = defineProps<{
  path?: string;
}>();

const { axios } = useApp();
const { dayjs } = useDate();

const modalRef = ref(false);

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

const startLeft = computed(() => {
  const startTime = data.value?.tipGoal.startTime;
  if (!startTime) return undefined;

  const startTimeDayjs = dayjs(startTime);
  const nowDayjs = dayjs();

  if (startTimeDayjs.isBefore(nowDayjs)) return undefined;

  return `Starts ${dayjs(startTime).fromNow()}`;
});

const isEnded = computed(() => {
  const endTime = data.value?.tipGoal.endTime;
  if (!endTime) return false;
  return dayjs(endTime).isBefore(dayjs());
});

const timeLeft = computed(() => {
  const endTime = data.value?.tipGoal.endTime;
  if (!endTime) return "No end time";
  return `Ends ${dayjs(endTime).fromNow()}`;
});
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <span>{{ data?.tipGoal.name }}</span>
      <UButton
        icon="i-heroicons-information-circle"
        variant="ghost"
        size="sm"
        color="gray"
        @click="modalRef = true"
      />
    </div>
    <div class="flex flex-col gap-1">
      <div class="flex justify-between">
        <span></span>
        <span class="">{{ data?.tipGoal.amount }} XMR</span>
      </div>
      <div
        class="w-full flex justify-center items-center bg-background-2 rounded-full overflow-hidden h-4 relative"
      >
        <div
          class="bg-primary h-full rounded-full absolute left-0 top-0 z-0 max-w-full"
          :style="`width: ${percentage}%`"
        ></div>
        <div class="text-xs relative">
          {{ data?.tipsAmount }} XMR ({{ percentage }}%)
        </div>
      </div>
      <div class="flex justify-between">
        <div>
          <span v-if="startLeft" class="text-sm text-pale">{{
            startLeft
          }}</span>
        </div>
        <div>
          <span v-if="isEnded" class="text-sm text-pale">Time is ended</span>
          <span v-else class="text-sm text-pale">{{ timeLeft }}</span>
        </div>
      </div>
    </div>

    <UModal v-model="modalRef">
      <UCard>
        <template #header>
          <h2 class="text-lg font-medium">{{ data?.tipGoal.name }}</h2>
        </template>
        <div class="">
          <div>{{ data?.tipGoal.description }}</div>
        </div>

        <template #footer>
          <UButton variant="soft" @click="modalRef = false">{{
            $t("close")
          }}</UButton>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<style scoped></style>
