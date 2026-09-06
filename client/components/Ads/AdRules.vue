<script setup lang="ts">
const rules = [
  {
    number: "01",
    title: "No scams or deceptive promotion",
    description:
      "Your service, identity, destination, and advertising claims must be legitimate and accurate. Phishing, impersonation, and misleading offers are not accepted. A campaign found breaking these rules after launch may be removed without a refund.",
  },
  {
    number: "02",
    title: "No illegal services",
    description:
      "Ads cannot promote unlawful products, services, content, or activity. We may ask for more information when the offering is unclear.",
  },
  {
    number: "03",
    title: "Every campaign is reviewed",
    description:
      "An admin checks the service and creative before anything goes live on tip pages. A campaign rejected during this review receives a full refund.",
  },
];
</script>

<template>
  <section class="pb-24">
    <div class="mb-8">
      <p class="text-primary text-sm font-medium">Before you submit</p>
      <h2 class="text-3xl font-bold mt-1">Advertising rules</h2>
    </div>

    <ul class="flex flex-col gap-6">
      <li
        v-for="(rule, index) in rules"
        :key="rule.number"
        class="flex gap-4 sm:gap-6 pt-6"
        :class="{ 'border-t border-border': index > 0 }"
      >
        <span class="text-primary font-medium shrink-0 w-8">{{
          rule.number
        }}</span>
        <div>
          <h3 class="font-bold text-lg">{{ rule.title }}</h3>
          <p class="mt-2">{{ rule.description }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
