<script setup lang="ts">
const props = defineProps<{
  settingsConfigured?: boolean;
  notificationsActive?: boolean;
}>();

const { toStreamerSuperDmSettings, toStreamerNotificationPreferences } =
  useRouteLocation();
</script>

<template>
  <div class="flex flex-col items-center mt-6">
    <h3 class="text-lg font-medium text-center inline-flex items-center gap-2">
      <UIcon name="i-heroicons-exclamation-triangle" size="22px" />
      <span>{{ $t("superDMNotConfiguredTitle") }}</span>
    </h3>
    <p class="text-pale text-center pt-2">
      {{ $t("superDMNotConfiguredDes") }}
    </p>
    <div class="mt-4 flex gap-2 flex-wrap">
      <UButton v-if="!settingsConfigured" :to="toStreamerSuperDmSettings()">
        {{ $t("configureSuperDMs") }}
      </UButton>
      <UButton
        v-if="!notificationsActive"
        :to="toStreamerNotificationPreferences()"
      >
        {{ $t("configureNotifications") }}
      </UButton>
    </div>
  </div>
</template>

<style scoped></style>
