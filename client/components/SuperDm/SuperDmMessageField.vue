<script setup lang="ts">
import useVuelidate from "@vuelidate/core";

const props = defineProps<{
  endedAt?: string;
}>();

const emit = defineEmits<{
  send: [];
}>();

const { required } = useValidations();
const { dayjs } = useDate();
const model = defineModel<string | undefined>();

const handleSend = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;

  emit("send");
};

const v = useVuelidate(
  {
    message: { required },
  },
  computed(() => ({ message: model.value })),
);

const { getValidationAttrs } = useValidations(v);
</script>

<template>
  <div class="flex gap-2 p-4 border-t border-border items-start">
    <div v-if="endedAt" class="flex flex-col items-center text-center flex-1">
      <p class="font-medium">{{ $t("superDMIsEnded") }}</p>
      <p class="text-pale text-xs">
        {{ $t("superDMIsEndedAt", { date: dayjs(endedAt).format("L LT") }) }}
      </p>
    </div>
    <template v-else>
      <UInput
        v-model="model"
        :placeholder="$t('sendAMessage')"
        class="flex-grow"
        size="lg"
        @blur="getValidationAttrs('message').onBlur"
      />
      <UButton
        size="lg"
        icon="heroicons:paper-airplane-20-solid"
        square
        @click="handleSend"
      >
      </UButton>
    </template>
  </div>
</template>

<style scoped></style>
