<script setup lang="ts">
const appConfig = useAppConfig();

const email = computed(() => appConfig.socials?.email);
const url = computed(() => `mailto:${email.value}`);
</script>

<template>
  <div>
    <div class="inner">
      <div class="flex justify-center py-8 md:py-24 text-center">
        <div class="max-w-lg flex flex-col gap-4">
          <h1 class="text-xl md:text-3xl font-bold">
            Contact us to feature your business to the audience of every content
            creator on XMRChat!
          </h1>
        </div>
      </div>

      <section class="pb-24">
        <div class="flex justify-center">
          <div class="max-w-lg flex flex-col gap-4">
            <AdPlacementCard reserved />
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
