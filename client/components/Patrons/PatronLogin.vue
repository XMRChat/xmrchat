<script setup lang="ts">
import useVuelidate from "@vuelidate/core";

const { required } = useValidations();
const { login } = usePatronStore();
const toast = useToast();

const state = reactive({
  phrase: "",
  loading: false,
});

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
</script>

<template>
  <div class="grid gap-4">
    <PageTitle
      title="Patron login"
      description="Log in with the recovery phrase you saved when you became a Patron."
    />
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
</template>
