<script setup lang="ts">
const { toCreateAd } = useRouteLocation();
</script>

<template>
  <div class="flex flex-col flex-1 items-end">
    <ULink
      to="https://sageswap.io/"
      target="_blank"
      class="aspect-[240/60] border border-border rounded-lg min-w-[300px] w-full flex items-center justify-center gap-4 overflow-hidden"
    >
      <!-- <p class="text-lg font-medium">Advertise with XMRChat</p> -->
      <!-- <img src="/images/xmrchat-logo.png" alt="XMRChat Logo" class="w-[80px]" /> -->
      <img
        src="/images/ads/image.jpg"
        alt="Ad"
        class="w-full h-full object-cover"
      />
    </ULink>
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
