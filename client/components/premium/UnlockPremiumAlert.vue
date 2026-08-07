<script setup lang="ts">
const { toStreamerRecipients } = useRouteLocation();
</script>

<template>
  <UAlert
    color="primary"
    variant="subtle"
    class="mb-4"
    :ui="{ title: 'text-lg text-center' }"
  >
    <template #title>
      Unlock Premium XMRChat features under Tip Splits
    </template>
    <template #description>
      <div class="text-center">
        To enable this feature set the percentage of XMRChat tip split to 3% or
        more in
        <UButton
          variant="link"
          :to="toStreamerRecipients()"
          :padded="false"
          class="underline"
        >
          tip splits
        </UButton>
        page.
      </div>
    </template>
  </UAlert>
</template>

<style scoped></style>
