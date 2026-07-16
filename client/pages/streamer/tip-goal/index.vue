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

    <div v-if="pending">Pending...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="data">
      <TipGoalModifyForm editable @update="refresh" />
    </div>
    <div v-else>
      <TipGoalModifyForm @update="refresh" />
    </div>
  </div>
</template>

<style scoped></style>
