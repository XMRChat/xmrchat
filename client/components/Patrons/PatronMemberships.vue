<script setup lang="ts">
import type { PatronPageMembership } from "~/types";

defineProps<{
  memberships: PatronPageMembership[];
}>();

const emit = defineEmits<{
  logout: [];
}>();

const isActive = (m: PatronPageMembership) => m.status === "active";
</script>

<template>
  <div class="border border-border rounded-md p-4 grid gap-4">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <p class="text-sm text-pale">Logged in as Patron</p>
        <h2 class="text-lg font-medium">Your membership on this page</h2>
      </div>
      <UButton variant="soft" color="gray" @click="emit('logout')">
        Log out
      </UButton>
    </div>

    <NoItems v-if="!memberships.length" />

    <div
      v-for="m in memberships"
      :key="m.id"
      class="flex items-center justify-between flex-wrap gap-2 text-sm"
    >
      <div class="flex flex-col">
        <span class="font-medium">{{ m.memberName }}</span>
        <span class="text-pale">{{ m.name }}</span>
      </div>
      <div class="flex flex-col items-end gap-1">
        <UBadge :color="isActive(m) ? 'primary' : 'gray'" variant="subtle">
          {{ isActive(m) ? "Active" : "Inactive" }}
        </UBadge>
        <span class="text-pale">
          {{ isActive(m) ? "Expires" : "Ended" }}
          {{ new Date(m.durationEnd).toLocaleString() }}
        </span>
      </div>
    </div>
  </div>
</template>
