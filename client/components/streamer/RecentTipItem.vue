<script setup lang="ts">
import type { Tip, TipReplySettings } from "~/types";

const props = defineProps<{
  item: Tip;
  disappearText?: string;
  computedPrice?: string;
  message?: string;
  replySettings?: TipReplySettings;
  name?: string;
}>();

const { getPageTierColor } = useConstants();
const { dayjs } = useDate();

const tier = computed(() => props.item.pageTipTier);
const tierColor = computed(() => tier.value?.color);

const itemStyle = computed(() => {
  if (!tierColor.value) return undefined;
  return {
    color: getForegroundColor(tierColor.value),
  };
});

const headingStyle = computed(() => {
  if (!tierColor.value) return undefined;
  return {
    backgroundColor: getPageTierColor(tierColor.value)?.headerColor,
    padding: "8px",
  };
});

const messageStyle = computed(() => {
  if (!tierColor.value) return undefined;
  return {
    backgroundColor: tierColor.value,
    padding: "8px",
  };
});

const amountClass = computed(() => {
  return tierColor.value ? "" : "text-primary";
});

const REPLY_PREVIEW_LENGTH = 180;

const reply = computed(() => props.item.tipReplies?.[0]);
const isReplyExpanded = ref(false);

const replyPreview = computed(() => {
  const message = reply.value?.message ?? "";
  const isLong = message.length > REPLY_PREVIEW_LENGTH;
  const showFull = !isLong || isReplyExpanded.value;

  return {
    text: showFull ? message : message.slice(0, REPLY_PREVIEW_LENGTH),
    showEllipsis: isLong && !isReplyExpanded.value,
    showToggle: isLong,
    toggleLabel: isReplyExpanded.value ? "show less" : "show more",
  };
});

const toggleReply = () => {
  isReplyExpanded.value = !isReplyExpanded.value;
};

const replyStyle = computed(() => tipReplyStyle(props.replySettings));

watch(
  () => reply.value?.message,
  () => {
    isReplyExpanded.value = false;
  },
);
</script>

<template>
  <div class="px-3">
    <div
      :class="['rounded-md overflow-hidden', { 'has-tier-color': tierColor }]"
      :style="[itemStyle, 'overflow-wrap: break-word']"
    >
      <div :style="headingStyle">
        <div class="flex justify-between items-center">
          <p
            class="pb-1 text-base font-medium"
            :class="{ 'opacity-80': item.private }"
          >
            {{ item.private ? $t("private.title") : item.name }}
          </p>
          <p class="pb-1 text-xs">
            {{ dayjs(item.createdAt).format("L") }}
          </p>
          <UTooltip
            v-if="disappearText"
            :popper="{ placement: 'top' }"
            :text="disappearText"
          >
            <UIcon name="i-heroicons-clock" class="opacity-80" />
          </UTooltip>
        </div>
        <span :class="['flex pb-1 font-medium ', amountClass]">
          {{ computedPrice }}
        </span>
      </div>

      <div :style="messageStyle" v-if="message || item.private">
        <p v-if="item.private" class="opacity-80">
          {{ $t("tipPrivateMessage") }}
        </p>
        <div v-else v-html="message" />
      </div>
    </div>
    <div v-if="reply">
      <div class="mt-1 p-1.5 rounded-md" :style="replyStyle">
        <span>{{ name }} replied:</span>
        <p class="mt-0.5">
          {{ replyPreview.text
          }}<template v-if="replyPreview.showEllipsis">...</template>
          <UButton
            v-if="replyPreview.showToggle"
            type="button"
            class="ms-1 text-inherit underline hover:opacity-80 hover:text-inherit"
            size="xs"
            variant="link"
            :padded="false"
            @click="toggleReply"
          >
            {{ replyPreview.toggleLabel }}
          </UButton>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.has-tier-color {
  a {
    color: inherit !important;
    text-decoration-color: inherit !important;
  }
}
</style>
