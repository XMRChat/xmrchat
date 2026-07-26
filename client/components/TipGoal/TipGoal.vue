<script setup lang="ts">
import type { TipGoal } from "~/types";

const props = defineProps<{
  path?: string;
  tipGoal?: TipGoal;
}>();

const { axios } = useApp();
const { dayjs } = useDate();

const modalRef = ref(false);

const { data, refresh } = useLazyAsyncData(
  `tip-goal-${props.path}`,
  async () => {
    const { data } = await axios.get<{ tipsAmount: number }>(
      `/tip-goals/tips/${props.path}`,
    );

    return data;
  },
  { server: false },
);

const interval = ref<NodeJS.Timeout | undefined>(undefined);

onMounted(() => {
  startTipsInterval();
});

const startTipsInterval = () => {
  stopTipsInterval();
  interval.value = setInterval(() => refresh(), 8000);
};

const stopTipsInterval = () => {
  clearInterval(interval.value);
};

onBeforeUnmount(() => stopTipsInterval());

const percentage = computed(() => {
  const amount = Number(props.tipGoal?.amount) ?? 0;
  const tipsAmount = Number(data.value?.tipsAmount) ?? 0;
  if (!amount) return 0;
  return (tipsAmount / amount) * 100;
});

const startLeft = computed(() => {
  const startTime = props.tipGoal?.startTime;
  if (!startTime) return undefined;

  const startTimeDayjs = dayjs(startTime);
  const nowDayjs = dayjs();

  if (startTimeDayjs.isBefore(nowDayjs)) return undefined;

  return `Starts ${dayjs(startTime).fromNow()}`;
});

const isEnded = computed(() => {
  const endTime = props.tipGoal?.endTime;
  if (!endTime) return false;
  return dayjs(endTime).isBefore(dayjs());
});

const timeLeft = computed(() => {
  const endTime = props.tipGoal?.endTime;
  if (!endTime) return "No end time";
  return `Ends ${dayjs(endTime).fromNow()}`;
});

const isCompleted = computed(() => {
  return percentage.value >= 100;
});
</script>

<template>
  <div>
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center gap-2">
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <span class="truncate">{{ tipGoal?.name }}</span>
          <UButton
            v-if="tipGoal?.description"
            icon="i-heroicons-information-circle"
            variant="ghost"
            size="sm"
            color="gray"
            @click="modalRef = true"
          />
        </div>
        <span class="whitespace-nowrap">{{ tipGoal?.amount }} XMR</span>
      </div>
      <div
        :class="[
          'w-full flex justify-center items-center bg-background-2 rounded-full overflow-hidden h-4 relative',
          { 'tip-goal-progress--completed': isCompleted },
        ]"
      >
        <div
          class="bg-primary h-full rounded-full absolute left-0 top-0 z-0 max-w-full"
          :style="`width: ${Math.min(percentage, 100)}%`"
        ></div>
        <div class="text-xs relative z-40">
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
          <h2 class="text-lg font-medium">{{ tipGoal?.name }}</h2>
        </template>
        <div class="">
          <div>{{ tipGoal?.description }}</div>
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

<style scoped>
.tip-goal-progress--completed {
  animation: tip-goal-shadow-pulse 1.8s infinite;
}

@keyframes tip-goal-shadow-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgb(var(--color-primary-500) / 0.4);
  }
  70% {
    box-shadow: 0 0 12px 4px rgb(var(--color-primary-500) / 0.25);
  }
}
</style>
