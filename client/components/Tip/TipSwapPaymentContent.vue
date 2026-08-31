<script lang="ts" setup>
import type { TipCreationResponse } from "~/types";
import { SwapStatusEnum } from "~/types/enums";
import VueCountdown from "@chenfengyuan/vue-countdown";

const props = defineProps<{
  createdTip?: TipCreationResponse;
  connectionStatus?: string;
}>();

const emit = defineEmits<{
  cancel: [];
  retry: [];
}>();

const { expired, remaining, initialize } = usePaymentExpiration();
const { t } = useI18n();

const renderStatusClassName = computed(() => {
  return `text-${
    SWAP_STATUSES[props.createdTip?.swap?.status as SwapStatusEnum]?.color
  }-500`;
});

const showCountdown = computed(
  () => props.createdTip?.swap?.status === SwapStatusEnum.WAITING,
);

const renderStatusMessage = computed(() => {
  const status = props.createdTip?.swap?.status;

  if (status === SwapStatusEnum.WAITING) return t("swapStatusMessage.waiting");
  if (status === SwapStatusEnum.CONFIRMING)
    return t("swapStatusMessage.confirming");
  if (status === SwapStatusEnum.SENDING) return t("swapStatusMessage.sending");
  if (status === SwapStatusEnum.FAILED) return t("swapStatusMessage.failed");

  return undefined;
});

const showLoading = computed(() =>
  [
    SwapStatusEnum.WAITING,
    SwapStatusEnum.CONFIRMING,
    SwapStatusEnum.SENDING,
  ].includes(props.createdTip?.swap?.status!),
);

const showAddress = computed(() => {
  const status = props.createdTip?.swap?.status!;

  return [
    SwapStatusEnum.WAITING,
    SwapStatusEnum.CONFIRMING,
    SwapStatusEnum.SENDING,
    SwapStatusEnum.FAILED,
  ].includes(status);
});

const showFailedMessage = computed(() => {
  return props.createdTip?.swap?.status === SwapStatusEnum.FAILED;
});

const renderMessage = computed(() => {
  const status = props.createdTip?.swap?.status!;

  if (status === SwapStatusEnum.WAITING) return "DEFAULT";
  if (
    [
      SwapStatusEnum.CONFIRMING,
      SwapStatusEnum.SENDING,
      SwapStatusEnum.FINISHED,
    ].includes(status)
  )
    return t("paymentReceived");

  return undefined;
});

const renderCancelText = computed(() => {
  const status = props.createdTip?.swap?.status!;
  if (status !== SwapStatusEnum.WAITING) return t("close");
  return t("cancel");
});

const showETA = computed(() => {
  const status = props.createdTip?.swap?.status!;
  return [SwapStatusEnum.WAITING, SwapStatusEnum.CONFIRMING].includes(status);
});

// Using watch cause we are not sure if when component mounts the props are passed to it.
watch(
  () => props.createdTip?.tip.expiresAt,
  (v) => {
    if (v) initialize(v);
  },
  { immediate: true },
);
</script>

<template>
  <TipPaymentViewContainer
    :title="$t('sendTip')"
    @cancel="emit('cancel')"
    :cancelText="renderCancelText"
    :expiresAt="props.createdTip?.tip.expiresAt"
  >
    <div class="w-full flex flex-col gap-2">
      <UAlert
        color="red"
        variant="subtle"
        v-if="showFailedMessage"
        class="mt-2"
      >
        <template #description>
          <p class="text-base">
            {{ $t("tipSwapFailed") }}
          </p>
        </template>
      </UAlert>

      <p class="text-red-500 text-center" v-else-if="expired">
        {{ $t("paymentExpired") }}
      </p>

      <template v-else>
        <template v-if="showAddress">
          <UAlert color="emerald" variant="subtle" v-if="renderMessage">
            <template #description>
              <p class="text-base" v-if="renderMessage === 'DEFAULT'">
                <I18nT keypath="swapPaymentSend" scope="global">
                  <template #exactly>
                    <span class="font-bold">{{ $t("exactly") }}</span>
                  </template>
                  <template #amount>
                    <span class="font-bold"
                      >{{ createdTip?.swap?.inputAmount }}
                      {{ createdTip?.swap?.coin?.name }}</span
                    >
                  </template>
                </I18nT>
              </p>
              <p class="text-base" v-else>
                {{ renderMessage }}
              </p>
            </template>
          </UAlert>

          <PaymentQRCode
            :address="createdTip?.swap?.swapAddress"
            :amount="props.createdTip?.swap?.inputAmount"
            :ticker="props.createdTip?.swap?.coin.ticker!"
          />

          <UDivider label="OR" class="mb-3" />

          <PaymentAddressDisplay
            :address="createdTip?.swap?.swapAddress"
            class="mb-4"
          />
        </template>

        <PaymentError
          v-if="connectionStatus === 'DISCONNECTED'"
          @retry="emit('retry')"
        />
        <PaymentLoading
          v-else-if="renderStatusMessage"
          :text="renderStatusMessage"
          :showLoading="showLoading"
        />

        <VueCountdown
          v-if="remaining && showCountdown"
          :time="remaining"
          @end="expired = true"
        >
          <template #default="{ minutes, seconds }">
            <p class="text-center">
              {{ minutes.toString().padStart(2, "0") }}:{{
                seconds.toString().padStart(2, "0")
              }}
            </p>
          </template>
        </VueCountdown>
      </template>

      <div class="p-2 rounded-lg border border-border mt-2">
        <div v-if="createdTip?.swap" class="text-center text-sm">
          <span>{{ $t("swapStatus") }}</span>
          <span :class="[renderStatusClassName]">{{
            SWAP_STATUSES[createdTip.swap.status as SwapStatusEnum]?.label
          }}</span>
        </div>

        <p
          class="text-pale text-xs text-center mt-1"
          v-if="showETA && createdTip?.swap?.eta"
        >
          {{ $t("swapETA", { eta: createdTip?.swap?.eta }) }}
        </p>
        <div class="text-pale text-xs text-center mt-1">
          <I18nT keypath="trackSwap" scope="global">
            <template #trocador>
              <ULink
                target="_blank"
                class="text-primary"
                :to="`https://trocador.app/en/checkout/${createdTip?.swap?.swapId}`"
              >
                Trocador
              </ULink>
            </template>
          </I18nT>
        </div>
      </div>
    </div>
  </TipPaymentViewContainer>
</template>

<style scoped></style>
