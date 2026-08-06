<script setup lang="ts">
import type { TipSourceEnum } from "~/types/enums";

const props = defineProps<{
  source?: TipSourceEnum;
}>();

const { getTipSource } = useConstants();

const info = computed(() =>
  props.source ? getTipSource(props.source) : undefined,
);
const text = computed(() =>
  info ? `Tip from ${info.value?.name}` : undefined,
);
</script>

<template>
  <UTooltip :text="text" :popper="{ placement: 'top' }">
    <img v-if="info?.icon" :src="info.icon" class="w-4 h-4" />
  </UTooltip>
</template>

<style scoped></style>
