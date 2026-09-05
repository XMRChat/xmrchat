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
          <h1 class="text-4xl font-bold">
            Put your service in front of the Monero community.
          </h1>
          <p class="text-pale">
            Reach people who use, build with, and care about Monero through a
            focused placement that stays visible for your full advertising
            period.
          </p>
          <div>
            <UButton size="lg" :to="url" target="_blank">Create an ad</UButton>
          </div>
        </div>
      </div>

      <section class="pb-24">
        <div class="flex flex-col gap-4 mb-6">
          <div>
            <p class="text-primary text-sm font-medium">Create your campaign</p>
            <h2 class="text-3xl font-bold mt-1">Ad placement</h2>
          </div>
          <p class="text-pale max-w-sm">
            Reserve the exclusive tip page banner, add your campaign details,
            and pay securely with Monero.
          </p>
        </div>

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
