<script setup lang="ts">
import type { PatronMember } from "~/types";

defineProps<{
  members: PatronMember[];
}>();
</script>

<template>
  <div>
    <h2 class="text-lg font-medium mb-4">Active Members</h2>
    <div v-if="members.length" class="flex flex-wrap gap-2">
      <UBadge v-for="member in members" variant="subtle" size="lg">
        {{ member.name }}
      </UBadge>
    </div>
    <NoItems v-else />
  </div>
</template>
