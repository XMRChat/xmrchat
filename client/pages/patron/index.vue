<script setup lang="ts">
const patronStore = usePatronStore();
</script>

<template>
  <div class="inner pt-4 !max-w-[800px]">
    <ClientOnly>
      <PatronLogin v-if="!patronStore.isLoggedIn" class="pt-6" />
      <PatronAccount
        v-else-if="patronStore.patron"
        class="pt-6"
        :patron="patronStore.patron"
        @logout="patronStore.logout"
      />
    </ClientOnly>
  </div>
</template>
