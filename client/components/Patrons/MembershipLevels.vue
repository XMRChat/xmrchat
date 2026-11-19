<script setup lang="ts">
import type { MembershipLevel } from "~/types";

const { t } = useI18n();
const { toCreateStreamerMembershipLevel, toEditStreamerMembershipLevel } =
  useRouteLocation();
const { axios } = useApp();

const { data, pending } = useLazyAsyncData(
  async () => {
    const { data } = await axios.get<{ membershipLevels: MembershipLevel[] }>(
      `/patrons/membership-levels`
    );
    return data.membershipLevels;
  },
  {
    server: false,
  }
);

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
      <template #price-data="{ row }">
        <span>{{ row.price }} XMR</span>
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
