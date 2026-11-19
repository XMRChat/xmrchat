<script lang="ts" setup>
import type {
  BasePaymentData,
  MembershipLevel,
  PatronFormFields,
} from "~/types";

const props = defineProps<{
  form?: PatronFormFields;
  level?: MembershipLevel;
  slug?: string;
}>();

const emit = defineEmits<{
  cancel: [];
  paid: [];
}>();

const active = defineModel<boolean>("active");
const { dayjs } = useDate();

// TODO: Static mock payment data, replace with the API response when it is available.
const basePaymentData = computed<BasePaymentData>(() => ({
  amount: String(props.level?.price ?? ""),
  paymentAddress: "MOCK_PATRON_PAYMENT_ADDRESS",
  recipients: [],
  url: undefined,
  expiresAt: dayjs().add(20, "minute").toISOString(),
  swap: undefined,
}));

provide("paymentModalProvideKey", {
  minMinAmountKey: "patronWalletAmount",
});
</script>

<template>
  <UModal v-model="active" preventClose>
    <BasePaymentCard title="Become a Patron" @cancel="emit('cancel')">
      <div class="mb-4 text-sm">
        <p>
          <span class="text-pale">Membership:</span>
          {{ level?.name }} ({{ level?.duration }} days)
        </p>
        <p>
          <span class="text-pale">Name:</span>
          {{ form?.name }}
        </p>
      </div>
      <BasePaymentContent :data="basePaymentData" :slug="slug" />
    </BasePaymentCard>
  </UModal>
</template>

<style scoped></style>
