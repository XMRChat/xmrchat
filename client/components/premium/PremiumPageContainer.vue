<script setup lang="ts">
const authStore = useAuthStore();
const isPremiumOrAdmin = computed(() => authStore.isPremiumOrAdmin);
const notPremium = computed(() => isPremiumOrAdmin.value);
</script>

<template>
  <div>
    <UnlockPremiumAlert v-if="notPremium" class="mb-4" />

    <div class="relative">
      <!-- <div class="absolute inset-0 z-10 bg-gray-400/40 rounded-md" /> -->
      <div
        :class="{
          'pointer-events-none select-none opacity-40': notPremium,
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
