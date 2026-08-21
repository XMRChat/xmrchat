<script lang="ts" setup>
import type { SuperDmContentData, TipEventData } from "~/types";
import { SwapStatusEnum } from "~/types/enums";

const props = defineProps<{
  data?: SuperDmContentData;
  slug?: string;
}>();

const emit = defineEmits<{
  cancel: [];
  paid: [];
}>();

const active = defineModel<boolean>("active");
const paymentError = ref(false);
const partialPaymentAmount = ref<string | undefined>(undefined);

const created = computed(() => props.data?.created);

const toast = useToast();
const { t } = useI18n();

const { init, disconnect, reconnect, connectionStatus } =
  usePaymentSocket<TipEventData>({
    onSuperDmPaymentEvent: (data) => {
      if (!data.paidAt) {
        partialPaymentAmount.value = data.paidAmount;
        return;
      }

      partialPaymentAmount.value = undefined;
      toast.add({
        title: "SuperDM received successfully!",
      });
      disconnect();
      emit("paid");
    },

    onSwapStatusChangeEvent: (swap) => {
      console.log(swap);
      if (created.value?.swap) {
        created.value.swap.status = swap.status;
        created.value.swap.statusMessage = swap.statusMessage;
      }
    },
  });

const handleRetry = () => {
  reconnect();
};

const cancelPayment = () => {
  disconnect();
  showKeys.value = true;
  partialPaymentAmount.value = undefined;
  emit("cancel");
};

const initSocket = () => {
  paymentError.value = false;
  init({
    path: "super-dms",
    query: { superDmId: created.value?.superDm?.id },
  });
};

watch(active, (currentActive) => {
  if (currentActive) {
    initSocket();
  } else {
    disconnect();
  }
});

onBeforeUnmount(() => disconnect());

const basePaymentData = computed(() => ({
  amount: created.value?.amount,
  paymentAddress: created.value?.paymentAddress,
  recipients: created.value?.recipients,
  url: created.value?.url,
  expiresAt: created.value?.superDm.expiresAt,
  swap: created.value?.swap,
}));

const renderCancelText = computed(() => {
  if (!created.value?.swap) return undefined;
  const status = created.value?.swap?.status!;
  if (status !== SwapStatusEnum.WAITING) return "Close";
  return "Cancel";
});

const showKeys = ref(true);

provide("paymentModalProvideKey", {
  minMinAmountKey: "superDmWalletMinimum",
});
</script>

<template>
  <UModal v-model="active" preventClose>
    <BasePaymentCard
      title="Start SuperDM"
      @cancel="cancelPayment"
      :cancelText="renderCancelText"
    >
      <div class="flex mb-2" v-if="!showKeys">
        <UButton variant="link" :padded="false" @click="showKeys = true">
          <DirectionalArrow direction="backward" />
          {{ $t("showKeys") }}
        </UButton>
      </div>

      <SuperDmIdAndKey
        v-if="showKeys"
        :superDmId="created?.superDm.id"
        :recoveryKey="data?.keys?.mnemonic"
        @saved="showKeys = false"
      />

      <template v-else>
        <SwapBasePaymentContent
          v-if="created?.swap"
          @retry="handleRetry"
          :data="basePaymentData"
          :connectionStatus="connectionStatus"
        >
        </SwapBasePaymentContent>
        <BasePaymentContent
          v-else
          :data="basePaymentData"
          :connectionStatus="connectionStatus"
          :slug="slug"
          :partialPaymentAmount="partialPaymentAmount"
          @retry="handleRetry"
        >
        </BasePaymentContent>
      </template>
    </BasePaymentCard>
  </UModal>
</template>

<style scoped></style>
