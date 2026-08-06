<script setup lang="ts">
import type { TipSourceEnum } from "~/types/enums";

const props = defineProps<{
  source?: TipSourceEnum;
}>();

const { getTipSource } = useConstants();

const item = computed(() =>
  props.source ? getTipSource(props.source) : undefined,
);
const text = computed(() =>
  item.value ? `Tip from ${item.value.name}` : undefined,
);
</script>

<template>
  <UTooltip :text="text" :popper="{ placement: 'top' }">
    <img v-if="item?.icon" :src="item.icon" class="w-4 h-4" />
  </UTooltip>
</template>

<style scoped></style>
