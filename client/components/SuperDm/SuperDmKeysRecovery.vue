<script setup lang="ts">
import useVuelidate from "@vuelidate/core";

const props = defineProps<{
  superDmId?: string;
  pagePath?: string;
  superDmPublicKeyArmored?: string;
}>();

const emit = defineEmits<{
  recovered: [];
}>();

const state = reactive({
  recoveryKey: "",
});

const { recoverKeys, saveViewerKeys, validateSamePrivateKeys } = useSuperDm();

const { required } = useValidations();
const toast = useToast();

const handleRecover = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;

  try {
    const keys = recoverKeys(state.recoveryKey);
    if (!props.superDmId || !props.pagePath || !props.superDmPublicKeyArmored) {
      throw createError("SuperDM id and page path are required");
    }
    const samePrivateKeys = await validateSamePrivateKeys(
      keys.publicKeyArmored,
      props.superDmPublicKeyArmored,
    );

    if (!samePrivateKeys) throw createError("Invalid recovery code");

    await saveViewerKeys({
      superDmId: props.superDmId,
      pagePath: props.pagePath,
      generatedKeys: keys,
    });

    emit("recovered");
  } catch (error) {
    toast.add({ description: getErrorMessage(error), color: "red" });
  }
};

const v = useVuelidate<any>(
  {
    recoveryKey: { required },
  },
  state,
);

const { getValidationAttrs } = useValidations(v);
</script>

<template>
  <div class="max-w-[600px] mx-auto grid gap-4">
    <p class="">
      {{ $t("superDMKeysRecoveryTitle") }}
    </p>
    <p class="">
      <span class="font-medium">{{ $t("superDMId") }}</span>
      <span class="">{{ superDmId }}</span>
    </p>
    <GeneralForm>
      <UFormGroup
        :label="$t('mnemonicPhrase')"
        :error="getValidationAttrs('recoveryKey').error"
      >
        <UInput
          v-model="state.recoveryKey"
          :placeholder="$t('enterYourMnemonicPhrase')"
          @blur="getValidationAttrs('recoveryKey').onBlur"
        />
      </UFormGroup>
      <div class="flex justify-center mt-4">
        <UButton @click="handleRecover">{{ $t("recover") }}</UButton>
      </div>
    </GeneralForm>
  </div>
</template>

<style scoped></style>
