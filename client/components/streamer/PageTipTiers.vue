<script setup lang="ts">
import type { PageTipTier } from "~/types";
import { TipDisplayMode, type FiatEnum } from "~/types/enums";

const props = defineProps<{
  tiers?: PageTipTier[];
  fiat?: FiatEnum;
}>();

const emit = defineEmits<{
  select: [string];
}>();

const { xmrToFiat } = useXmrPrice();
const { state: generalState } = useGeneralStore();
const { money } = useMoney();

const isXmrDisplay = computed(
  () => generalState.tipDisplayValue === TipDisplayMode.XMR,
);

const getFiatAmount = (amount?: number) => {
  const fiat = xmrToFiat(amount, props.fiat);
  return money(fiat.toFixed(2), props.fiat);
};

const getComputedAmount = (amount?: number) => {
  if (isXmrDisplay.value) return `${amount} XMR`;
  const fiat = xmrToFiat(amount, props.fiat);
  return money(fiat.toFixed(2), props.fiat);
};

const modalRef = ref(false);

const handleItemClick = (item: PageTipTier) => {
  let value: string | undefined;
  if (isXmrDisplay.value) value = String(item.minAmount);
  else value = xmrToFiat(item.minAmount, props.fiat).toFixed(2);

  if (!value) return;
  emit("select", value);
};
</script>

<template>
  <div class="flex flex-wrap gap-1 mt-1">
    <div v-for="item in tiers" class="flex items-center">
      <button
        type="button"
        class="text-xs px-2 py-1 ring-1 ring-border rounded-full flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity"
        :style="{
          background: item.color,
          color: getForegroundColor(item.color),
        }"
        @click="handleItemClick(item)"
      >
        <span> {{ getComputedAmount(item.minAmount) }} </span>
      </button>
    </div>

    <UButton
      icon="i-heroicons-question-mark-circle"
      size="xs"
      variant="ghost"
      color="gray"
      class="rounded-full"
      @click="modalRef = true"
    />
  </div>
  <UModal v-model="modalRef">
    <UCard>
      <template #header>
        <h2 class="text-lg font-medium">{{ $t("tipTiers") }}</h2>
      </template>
      <div class="grid gap-4">
        <div v-for="item in tiers" class="flex items-center gap-2">
          <div
            class="w-1.5 h-full rounded-full"
            :style="{ background: item.color }"
          ></div>
          <div class="flex flex-col gap-1">
            <div class="text-lg font-medium">{{ item.name }}</div>
            <div>
              <span class="text-pale text-sm">{{ $t("minAmount") }} </span>
              <span>{{ item.minAmount }} XMR </span>
              <span>( {{ getFiatAmount(item.minAmount) }} )</span>
            </div>
            <div>
              <span class="text-pale text-sm">{{ $t("messageLength") }} </span>
              <span>{{
                item.messageLength ? `${item.messageLength} characters` : "-"
              }}</span>
            </div>
            <div v-if="item.description">{{ item.description }}</div>
          </div>
        </div>
      </div>

      <template #footer>
        <UButton variant="soft" @click="modalRef = false">{{
          $t("close")
        }}</UButton>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped></style>
