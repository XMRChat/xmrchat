<script setup lang="ts">
defineProps<{
  reserved?: boolean;
  bookedThrough?: string;
  price?: string;
}>();

const features = [
  "One advertiser only",
  "No impression sharing or rotation",
  "Creative size: 4:1 aspect ratio",
];
</script>

<template>
  <div class="flex flex-col gap-4 border border-border rounded-xl p-6">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-primary text-sm font-medium">4:1</p>
        <h3 class="text-xl font-bold mt-1">Tip page banner</h3>
      </div>
      <UBadge v-if="reserved" size="xs" color="red" variant="outline">
        Reserved
      </UBadge>
      <UBadge v-else size="xs" color="green" variant="outline">
        Available
      </UBadge>
    </div>

    <div
      class="aspect-[4/1] w-full rounded-lg bg-background-2 flex items-center justify-center"
    >
      <p class="text-sm text-pale">4:1 banner</p>
    </div>

    <p class="text-3xl font-bold tracking-tight">
      {{ price || "$75.00" }}
      <span class="text-base font-normal text-pale">/ week</span>
    </p>

    <p class="text-pale">
      The high-visibility banner shown on creator tip pages across XMRChat.
    </p>

    <ul class="flex flex-col gap-2">
      <li
        v-for="feature in features"
        :key="feature"
        class="flex items-center gap-2 text-sm"
      >
        <UIcon name="i-heroicons-check-16-solid" class="shrink-0" />
        <span>{{ feature }}</span>
      </li>
    </ul>

    <p v-if="reserved && bookedThrough" class="text-sm text-pale pt-2">
      Currently booked through {{ bookedThrough }}.
    </p>
    <p v-else class="text-sm text-pale pt-2">Available to book now.</p>
  </div>
</template>
