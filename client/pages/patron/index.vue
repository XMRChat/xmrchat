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
      <template #fallback>
        <div class="pt-6 grid gap-3">
          <USkeleton class="h-8 w-56 mx-auto" />
          <USkeleton class="h-4 w-80 mx-auto" />
          <USkeleton class="h-40 w-full mt-4" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
