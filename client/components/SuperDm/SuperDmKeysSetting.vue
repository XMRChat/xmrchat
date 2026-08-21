<script setup lang="ts">
import { UAlert, UFormGroup } from "#components";
import useVuelidate from "@vuelidate/core";
import type { PageSetting } from "~/types";
import { PageSettingKey } from "~/types/enums";
import * as openpgp from "openpgp";

const {
  getStreamerSavedKey: getSavedKey,
  generateAndSaveStreamerKeys: generateAndSaveKeys,
  recoverKeys,
  validateSamePrivateKeys,
  saveStreamerKeys: saveKeys,
} = useSuperDm();
const { axios } = useApp();
const toast = useToast();
const { required } = useValidations();

interface State {
  recoveryCode?: string;
  generateModal: boolean;
  generatedResult: any;

  loadingGenerate: boolean;
  loadingRecover: boolean;
}

const state = reactive<State>({
  recoveryCode: undefined,

  generateModal: false,
  generatedResult: undefined,

  loadingGenerate: false,
  loadingRecover: false,
});

const {
  data: savedKeys,
  pending,
  error,
  refresh,
} = useLazyAsyncData(
  async () => {
    const keys = await getSavedKey();
    return keys;
  },
  { server: false },
);

const getPublicKeySettings = async () => {
  const { data } = await axios.get<{ settings: PageSetting[] }>(
    `/super-dms/settings`,
  );
  return data.settings.find((s) => s.key === PageSettingKey.SUPER_DM_PUBLIC_KEY)
    ?.value;
};

const handleGenerateClick = () => {
  state.generateModal = true;
};

const handleGenerate = async () => {
  state.generateModal = false;
  state.loadingGenerate = true;
  try {
    const keys = await generateAndSaveKeys();

    await axios.put(`/super-dms/settings/public-key`, {
      publicKey: keys.publicKeyArmored,
    });

    state.generatedResult = keys;
  } catch (error) {
    toast.add({ description: getErrorMessage(error) });
  } finally {
    state.loadingGenerate = false;
  }
};

const handleSaveRecoveryCode = async () => {
  await refresh();
  state.generatedResult = undefined;
};

const handleRecoverClick = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;
  try {
    state.loadingRecover = true;

    const publicKeySetting = await getPublicKeySettings();
    if (!publicKeySetting) {
      toast.add({
        description: "Public key not found. Try generating new keys.",
        color: "red",
      });
      return;
    }

    const keys = recoverKeys(state.recoveryCode || "");

    const samePrivateKeys = await validateSamePrivateKeys(
      keys.publicKeyArmored,
      publicKeySetting,
    );
    if (!samePrivateKeys) throw createError("Invalid recovery code");

    await saveKeys(keys);

    await refresh();
  } catch (error) {
    toast.add({ description: getErrorMessage(error), color: "red" });
  } finally {
    state.loadingRecover = false;
  }
};

const v = useVuelidate<State>(
  computed(() => ({
    recoveryCode: { required },
  })),
  computed(() => state),
);

const { getValidationAttrs } = useValidations(v);
</script>

<template>
  <div>
    <h3 class="text-lg font-medium mb-2">{{ $t("encryptionKeys") }}</h3>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">{{ getErrorMessage(error) }}</div>

    <template v-else>
      <div v-if="savedKeys" class="flex flex-col gap-2">
        <h3 class="font-medium">{{ $t("backupRecoveryCode") }}</h3>
        <p>
          {{ $t("backupRecoveryCodeDes") }}
        </p>
        <UInput :modelValue="savedKeys?.mnemonic" readonly />
      </div>
      <div v-else-if="!state.generatedResult">
        <UFormGroup
          :label="$t('recoveryCode')"
          :error="getValidationAttrs('recoveryCode').error"
        >
          <template #description>
            <p>
              {{ $t("recoveryCodeDes") }}
            </p>
          </template>
          <UInput
            v-model="state.recoveryCode"
            @blur="getValidationAttrs('recoveryCode').onBlur"
          />
        </UFormGroup>
        <div class="flex gap-2 pt-2">
          <UButton
            variant="soft"
            :loading="state.loadingRecover"
            @click="handleRecoverClick"
          >
            {{ $t("recover") }}
          </UButton>
          <UButton
            variant="ghost"
            @click="handleGenerateClick"
            :loading="state.loadingGenerate"
          >
            {{ $t("generateNew") }}
          </UButton>
        </div>
      </div>
      <div v-else class="grid gap-2">
        <p>
          {{ $t("pleaseSaveYourRecoveryCode") }}
        </p>
        <UInput
          :modelValue="state.generatedResult?.mnemonic"
          readonly
          size="lg"
        />
        <div>
          <UButton @click="handleSaveRecoveryCode">
            {{ $t("ISavedRecoveryCode") }}
          </UButton>
        </div>
      </div>
    </template>

    <UModal v-model="state.generateModal">
      <UCard>
        <template #header>
          <h2 class="text-lg font-medium">{{ $t("generateNewKeys") }}</h2>
        </template>

        <UAlert color="primary" variant="subtle">
          <template #description>
            If you generate new keys you will not be able to decrypt your
            previous messages. New messages will be encrypted with the new keys.
          </template>
        </UAlert>
        <div class="grid gap-2 mt-6">
          <p>
            <!-- {{ $t("generateNewKeysDes") }} -->
            If you forgot your recovery code or it is your first time using
            SuperDM, you can generate new encryption keys.
          </p>
          <p>{{ $t("clickGenerateKeys") }}</p>
          <p class="pt-4 text-sm text-pale">
            {{ $t("beReadyToSaveRecoveryCode") }}
          </p>
        </div>
        <template #footer>
          <div class="flex gap-2 justify-end">
            <UButton
              variant="ghost"
              color="red"
              @click="state.generateModal = false"
            >
              {{ $t("cancel") }}
            </UButton>
            <UButton @click="handleGenerate">{{ $t("generateKeys") }}</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<style scoped></style>
