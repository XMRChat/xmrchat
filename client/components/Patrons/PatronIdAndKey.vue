<script setup lang="ts">
defineProps<{
  mnemonic?: string;
}>();

const emit = defineEmits<{
  saved: [];
}>();
</script>

<template>
  <div class="grid gap-2 mb-4">
    <UAlert color="primary" variant="subtle">
      <template #title> Save your Patron recovery key </template>
      <template #description>
        Please save this recovery key. You will need it to renew your membership
        or manage your Patron account. XMRChat will not store your recovery key.
      </template>
    </UAlert>

    <UFormGroup label="Recovery key">
      <CopyInput :text="mnemonic" :showIcon="false" buttonVariant="soft" />
    </UFormGroup>
    <div class="flex justify-center">
      <UButton @click="emit('saved')" size="lg">
        I saved the recovery key
      </UButton>
    </div>
  </div>
</template>

<style scoped></style>
