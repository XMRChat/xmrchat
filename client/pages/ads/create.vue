<script setup lang="ts">
const appConfig = useAppConfig();

const email = computed(() => appConfig.socials?.email);
const url = computed(() => `mailto:${email.value}`);
</script>

<template>
  <div>
    <div class="inner">
      <div class="flex justify-center py-24 text-center">
        <div class="max-w-lg flex flex-col gap-4">
          <h1 class="text-3xl font-bold">
            Contact us to feature your business to multiple audiences that love
            using Monero!
          </h1>
          <div>
            <UButton size="lg" :to="url" target="_blank">Create an ad</UButton>
          </div>
        </div>
      </div>

      <section class="pb-24">
        <div class="flex justify-center">
          <div class="max-w-lg flex flex-col gap-4">
            <AdPlacementCard />
            <UButton size="lg" class="justify-center" :to="url" target="_blank">
              Send us an email
            </UButton>
          </div>
        </div>
      </section>

      <AdRules />
    </div>
  </div>
</template>
