<script setup lang="ts">
import type { TipGoal } from "~/types";

const { axios } = useApp();

const { data, pending, error, refresh } = useLazyAsyncData(
  async () => {
    const { data } = await axios.get<{ tipGoal: TipGoal[] }>(`/tip-goals`);
    return data.tipGoal;
  },
  {
    server: false,
  },
);
</script>

<template>
  <div>
    <PageTitle title="Tip Goal" description="Manage your tip goal" />

    <PremiumPageContainer>
      <div
        v-if="pending"
        class="flex flex-col gap-4 w-full max-w-[600px] m-auto"
      >
        <USkeleton class="h-4 w-16" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-4 w-24" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-4 w-12" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-4 w-10" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-4 w-20" />
        <USkeleton class="h-20 w-full" />
        <USkeleton class="h-10 w-24 mt-4" />
      </div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else-if="data">
        <TipGoalModifyForm editable @update="refresh" />
      </div>
      <div v-else>
        <TipGoalModifyForm @update="refresh" />
      </div>
    </PremiumPageContainer>
  </div>
</template>

<style scoped></style>
