<script setup lang="ts">
const props = defineProps<{
  superDmId?: string;
  recoveryKey?: string;
}>();

const emit = defineEmits<{
  saved: [];
}>();
</script>

<template>
  <div class="grid gap-2 mb-4">
    <UAlert color="primary" variant="subtle">
      <template #title> {{ $t("saveSuperDMIdAndKeyTitle") }} </template>
      <template #description>
        {{ $t("saveSuperDMIdAndKeyDes") }}
      </template>
    </UAlert>

    <UFormGroup label="SuperDM id">
      <CopyInput :text="superDmId" :showIcon="false" buttonVariant="soft" />
    </UFormGroup>
    <UFormGroup label="Recovery key">
      <CopyInput :text="recoveryKey" :showIcon="false" buttonVariant="soft" />
    </UFormGroup>
    <div class="flex justify-center">
      <UButton @click="emit('saved')" size="lg">
        {{ $t("savedIdAndRecoveryCode") }}
      </UButton>
    </div>
  </div>
</template>

<style scoped></style>
