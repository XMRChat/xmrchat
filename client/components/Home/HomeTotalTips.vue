<script setup lang="ts">
const props = defineProps<{
  totalTips?: {
    tipsCount: number;
    totalAmount: number;
    pagesCount: number;
  };
  pending?: boolean;
}>();

const { xmrToFiat } = useXmrPrice();
const { money } = useMoney();
const totalAmountFiat = computed(() => {
  const fiat = xmrToFiat(props.totalTips?.totalAmount).toFixed(2);
  return fiat;
});
</script>

<template>
  <div class="bg-primary text-white py-1 px-1.5">
    <div class="inner flex items-center justify-center">
      <div class="text-sm">
        Fans have sent
        <USkeleton v-if="pending" class="skeleton-inline w-8" />
        <span v-else class="font-bold">{{ totalTips?.tipsCount }}</span>
        superchats totaling
        <USkeleton v-if="pending" class="skeleton-inline w-16" />
        <span v-else class="font-bold">{{
          totalTips?.totalAmount?.toFixed(4)
        }}</span>
        Monero
        <USkeleton v-if="pending" class="skeleton-inline w-12" />
        <span v-else class="font-bold"> (${{ totalAmountFiat }}) </span>
        to
        <USkeleton v-if="pending" class="skeleton-inline w-8" />
        <span v-else class="font-bold">{{ totalTips?.pagesCount }}</span>
        content creators with XMRChat!
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-inline {
  display: inline-block;
  height: 14px;
  vertical-align: -2px;
}
</style>
