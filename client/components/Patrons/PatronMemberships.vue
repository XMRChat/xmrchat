<script setup lang="ts">
import type { Patron, PatronMembershipDetail } from "~/types";

defineProps<{
  patron?: Patron;
}>();

const emit = defineEmits<{
  logout: [];
}>();

const isActive = (m: PatronMembershipDetail) =>
  m.status === "active" && new Date(m.durationEnd) > new Date();
</script>

<template>
  <div class="border border-border rounded-md p-4 grid gap-4">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <p class="text-sm text-pale">Logged in as Patron</p>
        <h2 class="text-lg font-medium">Your memberships</h2>
      </div>
      <UButton variant="soft" color="gray" @click="emit('logout')">
        Log out
      </UButton>
    </div>

    <NoItems v-if="!patron?.memberships.length" />

    <div
      v-for="m in patron?.memberships"
      :key="m.id"
      class="flex items-center justify-between flex-wrap gap-2 text-sm"
    >
      <div class="flex flex-col">
        <span class="font-medium">{{ m.page.name || m.page.path }}</span>
        <span class="text-pale">
          {{ m.name }} · {{ m.membershipLevel?.name }}
        </span>
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
