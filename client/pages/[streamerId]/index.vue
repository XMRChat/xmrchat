<script lang="ts" setup>
import type { TipContent } from "#components";
import type { TipCreationResponse, TipReplySettings } from "~/types";
import { TipDisplayMode } from "~/types/enums";

definePageMeta({
  hideHeaderLogin: true,
});

const route = useRoute();
const { axios } = useApp();
const streamerId = computed(() => route.params.streamerId as string);
const { getStreamerPage } = useServices();
const { state: generalState } = useGeneralStore();
const contentRef = ref<InstanceType<typeof TipContent> | undefined>();

const { data, pending, refresh, error } = await useLazyAsyncData(
  `streamer-${streamerId.value}`,
  async () => {
    const pageR = getStreamerPage(streamerId.value);
    const superDmStateR = axios.get<{ active: boolean; configured: boolean }>(
      `/super-dms/${streamerId.value}/settings/state`,
    );

    const tipReplySettingsR = axios.get<{ settings: TipReplySettings }>(
      `/tip-replies/${streamerId.value}/settings`,
    );

    const [page, { data: superDmState }, { data: tipReplySettings }] =
      await Promise.all([pageR, superDmStateR, tipReplySettingsR]);
    return {
      page,
      superDmState,
      tipReplySettings,
    };
  },
  {
    transform: (v) => {
      generalState.tipDisplayValue =
        v.page.tipDisplayMode || TipDisplayMode.FIAT;
      return v;
    },
  },
);

if (error.value) {
  throw createError(error.value);
}

const createdTip = ref<TipCreationResponse | undefined>(undefined);
const paymentModalActive = ref(false);

const handlePayment = (data: TipCreationResponse) => {
  paymentModalActive.value = true;
  createdTip.value = data;
};

const cancelPayment = () => {
  paymentModalActive.value = false;
  createdTip.value = undefined;
};

const handlePaid = () => {
  paymentModalActive.value = false;
  createdTip.value = undefined;
  contentRef.value?.reset();
};

const { t } = useI18n();
defineOgImage(false);
useStreamerIdSeoMeta(computed(() => data.value?.page));
</script>

<template>
  <div class="inner pt-4">
    <PendingView :pending="pending" :error="error">
      <template v-if="data">
        <StreamerHeader
          class="pt-2"
          :bannerUrl="data.page.coverImage?.url"
          :liveStreams="data.page.liveStreams"
          :logoUrl="data.page.logo?.url"
          :name="data.page.name"
          :links="data.page.links"
          :superDmActive="data.superDmState.active"
          :streamerId="streamerId"
          :bio="data.page.bio"
          :tipGoal="data.page.tipGoal"
        />
        <TipContent
          ref="contentRef"
          :streamerId="streamerId"
          :streamerPage="data.page"
          :superDmActive="data.superDmState.active"
          :tipReplySettings="data.tipReplySettings.settings"
          @done="handlePayment"
        />
        <TipPaymentModal
          :createdTip="createdTip"
          :slug="streamerId"
          v-model:active="paymentModalActive"
          @cancel="cancelPayment"
          @paid="handlePaid"
        />
      </template>
    </PendingView>
  </div>
</template>

<style scoped lang="scss"></style>
