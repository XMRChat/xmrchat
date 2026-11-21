<script setup lang="ts">
import type { PatronMember } from "~/types";

defineProps<{
  members: PatronMember[];
}>();
</script>

<template>
  <div>
    <h2 class="text-lg font-medium mb-4">Active Members</h2>
    <div v-if="members.length" class="grid gap-1">
      <div v-for="(member, index) in members" :key="member.name">
        {{ index + 1 }}. {{ member.name }}
      </div>
    </div>
    <NoItems v-else />
  </div>
</template>
