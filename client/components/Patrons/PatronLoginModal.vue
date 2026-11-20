<script setup lang="ts">
import useVuelidate from "@vuelidate/core";

const model = defineModel<boolean>();

const { required } = useValidations();
const { login } = usePatronStore();
const toast = useToast();

const state = reactive({
  phrase: "",
  loading: false,
});

const v = useVuelidate<any>(
  {
    phrase: { required },
  },
  state,
);

const { getValidationAttrs } = useValidations(v);

const handleHide = () => {
  model.value = false;
};

const handleLogin = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;

  try {
    state.loading = true;
    await login({ mnemonic: state.phrase });
    handleHide();
  } catch (error) {
    toast.add({ description: getErrorMessage(error), color: "red" });
  } finally {
    state.loading = false;
  }
};

watch(model, () => {
  if (!model.value) {
    state.phrase = "";
    v.value.$reset();
  }
});
</script>

<template>
  <UModal v-model="model">
    <UCard>
      <template #header>
        <h2 class="text-lg font-medium">Patron login</h2>
      </template>
      <div class="grid gap-2">
        <p>Log in with the recovery phrase you saved when you became a Patron.</p>

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
      </div>
      <template #footer>
        <div class="flex gap-2 justify-end">
          <UButton variant="ghost" @click="handleHide">{{
            $t("cancel")
          }}</UButton>
          <UButton @click="handleLogin" :loading="state.loading">
            {{ $t("login") }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped></style>
