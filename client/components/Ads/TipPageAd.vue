<script setup lang="ts">
const { toCreateAd } = useRouteLocation();

const ads = [
  {
    url: "https://www.youtube.com/@historia_ciencia_o_ficcion",
    image: "/images/ads/image.png",
  },
  {
    url: "https://sageswap.io/",
    image: "/images/ads/image.jpg",
  },
];

const activeAd = computed(() => ads[0]);
</script>

<template>
  <div class="flex flex-col flex-1 items-end">
    <ULink
      :to="activeAd.url"
      target="_blank"
      class="border border-border rounded-lg min-w-[300px] w-full flex items-center justify-center gap-4 overflow-hidden"
    >
      <img :src="activeAd.image" alt="Ad" class="w-full h-full object-cover" />
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
