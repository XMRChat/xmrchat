<script setup lang="ts">
import { ConfirmModal } from "#components";
import type { PageTipTier } from "~/types";

const { toCreateStreamerPageTier, toEditStreamerPageTier } = useRouteLocation();
const { axios } = useApp();
const modal = useModal();
const toast = useToast();
const { t } = useI18n();

const { data, pending, error, refresh } = useLazyAsyncData(
  async () => {
    const { data } = await axios.get<{ pageTipTiers: PageTipTier[] }>(
      `/page-tip-tiers`,
    );
    return data.pageTipTiers;
  },
  {
    server: false,
  },
);

const columns = computed(() => [
  {
    key: "name",
    label: t("name"),
  },
  {
    key: "minAmount",
    label: t("minXMR"),
  },
  {
    key: "color",
    label: t("color"),
  },
  {
    key: "sound",
    label: t("sound"),
  },
  {
    key: "actions",
  },
]);

const handleDeleteClick = async (id: number) => {
  modal.open(ConfirmModal, {
    color: "red",
    text: t("wantToDeleteTier"),
    title: t("deleteTier"),
    onConfirm: () => handleDelete(id),
  });
};

const handleDelete = async (id: number) => {
  try {
    await axios.delete(`/page-tip-tiers/${id}`);
    toast.add({
      description: t("tierDeleted"),
      color: "green",
    });
    await refresh();
  } catch (error) {
    toast.add({
      description: getErrorMessage(error),
      color: "red",
    });
  }
};
</script>

<template>
  <div>
    <PageTitle
      :title="$t('tipTiers')"
      :description="$t('manageYourTipTiers')"
    />

    <PremiumPageContainer>
      <div class="flex justify-end mb-4">
        <UButton :to="toCreateStreamerPageTier()">{{
          $t("createTier")
        }}</UButton>
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
        <template #minAmount-data="{ row }">
          <span>{{ row.minAmount ? `${row.minAmount} XMR` : "-" }}</span>
        </template>
        <template #color-data="{ row }">
          <div
            v-if="row.color"
            class="w-6 h-6 rounded-full ring-2 ring-border"
            :style="{ backgroundColor: row.color }"
          ></div>
          <div v-else>-</div>
        </template>
        <template #sound-data="{ row }">
          <div class="max-w-[120px] truncate text-sm">
            <span v-if="row.sound">
              {{ row.sound.originalName }}
            </span>
            <span v-else>-</span>
          </div>
        </template>
        <template #actions-data="{ row }">
          <div class="flex gap-2 justify-end">
            <UButton
              variant="ghost"
              color="primary"
              :to="toEditStreamerPageTier(row.id)"
            >
              {{ $t("edit") }}
            </UButton>
            <UButton
              variant="ghost"
              color="red"
              @click="handleDeleteClick(row.id)"
            >
              {{ $t("delete") }}
            </UButton>
          </div>
        </template>
        <template #empty-state>
          <NoItems />
        </template>
      </UTable>
    </PremiumPageContainer>
  </div>
</template>

<style scoped></style>
