<script setup lang="ts">
import type { SavedViewerSuperDmKeys } from "~/types";

const props = defineProps<{
  pagePath?: string;
  superDmId?: string;
}>();

const modelRef = ref(false);
</script>

<template>
  <UButton variant="ghost" size="xs" @click="modelRef = true">{{
    $t("showRecoveryCode")
  }}</UButton>
  <SuperDmShowRecoveryModal
    :pagePath="pagePath"
    :superDmId="superDmId"
    v-model="modelRef"
  />
</template>

<style scoped></style>
