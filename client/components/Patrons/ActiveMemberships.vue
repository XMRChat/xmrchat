<script setup lang="ts">
import type { StreamerMembership } from "~/types";

const { t } = useI18n();
const { axios } = useApp();

const { data, pending } = useLazyAsyncData(
  async () => {
    const { data } = await axios.get<{ memberships: StreamerMembership[] }>(
      `/patrons/memberships/active`,
    );
    return data.memberships;
  },
  {
    server: false,
  },
);

const columns = [
  {
    key: "name",
    label: t("name"),
  },
  {
    key: "membershipLevel",
    label: "Membership Level",
  },
  {
    key: "durationStart",
    label: "Start",
  },
  {
    key: "durationEnd",
    label: "End",
  },
];
</script>

<template>
  <div>
    <h2 class="text-lg font-medium mb-4">Active Memberships</h2>
    <UProgress
      v-if="pending"
      animation="carousel"
      class="max-w-[280px] m-auto mb-4"
    />
    <UTable
      :rows="data || []"
      :columns="columns"
      class="border border-border rounded-md"
      :ui="{
        td: { base: 'whitespace-normal text-text dark:text-text' },
      }"
    >
      <template #membershipLevel-data="{ row }">
        <span>{{ row.membershipLevel?.name }}</span>
      </template>
      <template #durationStart-data="{ row }">
        <span>{{ new Date(row.durationStart).toLocaleString() }}</span>
      </template>
      <template #durationEnd-data="{ row }">
        <span>{{ new Date(row.durationEnd).toLocaleString() }}</span>
      </template>
      <template #empty-state>
        <NoItems />
      </template>
    </UTable>
  </div>
</template>
