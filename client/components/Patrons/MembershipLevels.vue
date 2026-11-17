<script setup lang="ts">
const { t } = useI18n();
const { toCreateStreamerMembershipLevel, toEditStreamerMembershipLevel } =
  useRouteLocation();

const membershipLevels = [
  {
    id: 1,
    name: "Supporter",
    description: "Supporting member",
    price: "100000000000",
    duration: 30,
  },
];

const columns = [
  {
    key: "name",
    label: t("name"),
  },
  {
    key: "description",
    label: t("description"),
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "duration",
    label: "Duration",
  },
  {
    key: "actions",
  },
];
</script>

<template>
  <div>
    <div class="flex items-center justify-between flex-wrap gap-4">
      <h2 class="text-lg font-medium mb-4">Membership Levels</h2>
      <div class="flex justify-end">
        <UButton :to="toCreateStreamerMembershipLevel()">
          Create Membership Level
        </UButton>
      </div>
    </div>
    <UTable
      :rows="membershipLevels"
      :columns="columns"
      class="border border-border rounded-md"
      :ui="{
        td: { base: 'whitespace-normal text-text dark:text-text' },
      }"
    >
      <template #price-data="{ row }">
        <span>{{ unitsToXmr(row.price) }} XMR</span>
      </template>
      <template #duration-data="{ row }">
        <span>{{ row.duration }} days</span>
      </template>
      <template #actions-data="{ row }">
        <div class="flex gap-2 justify-end">
          <UButton
            variant="ghost"
            color="primary"
            :to="toEditStreamerMembershipLevel(row.id)"
          >
            {{ $t("edit") }}
          </UButton>
          <UButton variant="ghost" color="red">
            {{ $t("delete") }}
          </UButton>
        </div>
      </template>
      <template #empty-state>
        <NoItems />
      </template>
    </UTable>
  </div>
</template>
