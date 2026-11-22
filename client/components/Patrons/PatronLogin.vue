<script setup lang="ts">
import { ConfirmModal } from "#components";
import useVuelidate from "@vuelidate/core";

const { required } = useValidations();
const { login } = usePatronStore();
const { getPatronSavedKeys, removePatronSavedKey } = usePatronKeys();
const toast = useToast();
const modal = useModal();

const state = reactive({
  phrase: "",
  loading: false,
  removingMnemonic: undefined as string | undefined,
});

const { data: savedKeys, pending } = useLazyAsyncData(
  "patron-saved-keys",
  () => getPatronSavedKeys(),
  { server: false },
);

const v = useVuelidate(
  {
    phrase: { required },
  },
  state,
);

const { getValidationAttrs } = useValidations(v);

const handleLogin = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;

  try {
    state.loading = true;
    await login({ mnemonic: state.phrase });
    state.phrase = "";
    v.value.$reset();
  } catch (error) {
    toast.add({ description: getErrorMessage(error), color: "red" });
  } finally {
    state.loading = false;
  }
};

const handleRemoveKey = async (mnemonic: string) => {
  try {
    state.removingMnemonic = mnemonic;
    await removePatronSavedKey({ mnemonic });
    savedKeys.value = (savedKeys.value || []).filter(
      (k) => k.mnemonic !== mnemonic,
    );
  } catch (error) {
    toast.add({ description: getErrorMessage(error), color: "red" });
  } finally {
    state.removingMnemonic = undefined;
  }
};

const removeKey = (mnemonic: string) => {
  modal.open(ConfirmModal, {
    title: "Remove recovery key",
    text: "This removes the recovery key from this browser only. Make sure you have it saved elsewhere if you still need it.",
    color: "red",
    onConfirm: () => handleRemoveKey(mnemonic),
  });
};
</script>

<template>
  <div class="grid gap-4">
    <PageTitle
      title="Patron login"
      description="Log in with the recovery phrase you saved when you became a Patron."
    />

    <div class="grid gap-3">
      <div>
        <h2 class="text-lg font-medium">Saved recovery keys</h2>
        <p class="text-sm text-pale">
          List of recovery keys saved on this browser.
        </p>
      </div>

      <div v-if="pending" class="grid gap-2">
        <USkeleton class="h-4 w-16" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-10 w-full" />
      </div>

      <template v-else-if="savedKeys?.length">
        <div
          v-for="(key, index) in savedKeys"
          :key="key.mnemonic"
          class="grid gap-1"
        >
          <div class="flex items-end gap-2">
            <UFormGroup :label="`Key ${index + 1}`" class="flex-grow">
              <CopyInput
                :text="key.mnemonic"
                :showIcon="false"
                buttonVariant="soft"
              />
            </UFormGroup>
            <UButton
              color="red"
              variant="soft"
              icon="i-heroicons-trash"
              :loading="state.removingMnemonic === key.mnemonic"
              @click="removeKey(key.mnemonic)"
            />
          </div>
        </div>
      </template>

      <NoItems v-else text="No saved keys on this browser." />
    </div>

    <div class="pt-4 grid gap-3">
      <UFormGroup
        label="Recovery phrase"
        :error="getValidationAttrs('phrase').error"
      >
        <UTextarea
          v-model="state.phrase"
          :rows="3"
          autocomplete="off"
          autocapitalize="none"
          spellcheck="false"
          placeholder="word1 word2 word3 ..."
          @blur="getValidationAttrs('phrase').onBlur"
        />
      </UFormGroup>
      <div>
        <UButton @click="handleLogin" :loading="state.loading">
          {{ $t("login") }}
        </UButton>
      </div>
    </div>
  </div>
</template>
