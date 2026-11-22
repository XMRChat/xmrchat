<script setup lang="ts">
const patronStore = usePatronStore();
</script>

<template>
  <div class="inner pt-4 !max-w-[800px]">
    <PatronLogin v-if="!patronStore.isLoggedIn" class="pt-6" />
  </div>
</template>
