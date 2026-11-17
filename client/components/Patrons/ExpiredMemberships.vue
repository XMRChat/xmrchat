<script setup lang="ts">
const { t } = useI18n();

const memberships = [
  {
    id: 1,
    name: "Test",
    plan: "Level 1",
    durationStart: "2026-08-01T00:00:00.000Z",
    durationEnd: "2026-08-31T00:00:00.000Z",
  },
];

const columns = [
  {
    key: "name",
    label: t("name"),
  },
  {
    key: "plan",
    label: "Plan",
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
    <h2 class="text-lg font-medium mb-4">Expired Memberships</h2>
    <UTable
      :rows="memberships"
      :columns="columns"
      class="border border-border rounded-md"
      :ui="{
        td: { base: 'whitespace-normal text-text dark:text-text' },
      }"
    >
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
