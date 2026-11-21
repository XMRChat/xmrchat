<script lang="ts" setup>
import type {
  BasePaymentData,
  MembershipCreateResponse,
  TipEventData,
} from "~/types";

const props = defineProps<{
  data?: MembershipCreateResponse;
  slug?: string;
  name?: string;
  levelName?: string;
  levelDuration?: number;
}>();

const emit = defineEmits<{
  cancel: [];
  paid: [];
}>();

const active = defineModel<boolean>("active");
const partialPaymentAmount = ref<string | undefined>(undefined);
// The recovery key is only shown for a new patron. A logged in patron is
// reused and already has their key.
const hasKey = computed(() => !!props.data?.mnemonic);
const showKeys = ref(hasKey.value);

const toast = useToast();

const { init, disconnect, reconnect, connectionStatus } =
  usePaymentSocket<TipEventData>({
    onPatronMembershipPaymentEvent: (data) => {
      if (!data.paidAt) {
        partialPaymentAmount.value = data.paidAmount;
        return;
      }

      partialPaymentAmount.value = undefined;
      toast.add({
        title: "Membership received successfully!",
      });
      disconnect();
      emit("paid");
    },
  });

const handleRetry = () => {
  reconnect();
};

const cancelPayment = () => {
  disconnect();
  showKeys.value = hasKey.value;
  partialPaymentAmount.value = undefined;
  emit("cancel");
};

const initSocket = () => {
  init({
    path: "patrons",
    query: { membershipId: props.data?.membership?.id },
  });
};

watch(active, (currentActive) => {
  if (currentActive) {
    showKeys.value = hasKey.value;
    initSocket();
  } else {
    disconnect();
  }
});

onBeforeUnmount(() => disconnect());

const basePaymentData = computed<BasePaymentData>(() => ({
  amount: props.data?.amount,
  paymentAddress: props.data?.paymentAddress,
  recipients: props.data?.recipients,
  url: props.data?.url,
  expiresAt: props.data?.expiresAt,
}));

provide("paymentModalProvideKey", {
  minMinAmountKey: "patronWalletAmount",
});
</script>

<template>
  <UModal v-model="active" preventClose>
    <BasePaymentCard title="Become a Patron" @cancel="cancelPayment">
      <div class="flex mb-2" v-if="!showKeys && hasKey">
        <UButton variant="link" :padded="false" @click="showKeys = true">
          <DirectionalArrow direction="backward" />
          Show recovery key
        </UButton>
      </div>

      <PatronIdAndKey
        v-if="showKeys"
        :mnemonic="data?.mnemonic"
        @saved="showKeys = false"
      />

      <template v-else>
        <div class="mb-4 text-sm">
          <p>
            <span class="text-pale">Membership:</span>
            {{ levelName }} ({{ levelDuration }} days)
          </p>
          <p>
            <span class="text-pale">Name:</span>
            {{ name }}
          </p>
        </div>
        <BasePaymentContent
          :data="basePaymentData"
          :connectionStatus="connectionStatus"
          :slug="slug"
          :partialPaymentAmount="partialPaymentAmount"
          @retry="handleRetry"
        />
      </template>
    </BasePaymentCard>
  </UModal>
</template>

<style scoped></style>
