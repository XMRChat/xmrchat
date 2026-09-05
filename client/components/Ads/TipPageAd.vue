<script setup lang="ts">
const { toCreateAd } = useRouteLocation();
</script>

<template>
  <div class="flex flex-col flex-1 items-end">
    <div
      class="aspect-[320/50] bg-background-2 border border-border rounded-lg min-w-[300px] w-full flex items-center justify-center relative overflow-hidden"
    >
      <p class="relative z-10">Your ad here</p>
    </div>
    <UButton
      size="xs"
      class="text-pale"
      variant="link"
      :padded="false"
      :to="toCreateAd()"
    >
      Your ad here
    </UButton>
  </div>
</template>

<style scoped></style>
