<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";

const { required, minLength, maxLength, sameAs } = useValidations();
const { updatePassword } = useServices();
const authStore = useAuthStore();
const toast = useToast();
const { t } = useI18n();

const state = reactive({
  oldPassword: "",
  password: "",
  repeatPassword: "",
});

const loadingSubmit = ref(false);
const error = ref<string | undefined>(undefined);

const handleSubmit = async () => {
  const valid = await v.value.$validate();

  if (!valid) return;

  try {
    loadingSubmit.value = true;
    const res = await updatePassword({
      currentPassword: state.oldPassword,
      password: state.password,
    });

    if (res.access_token) {
      authStore.state.token = res.access_token;
    }

    toast.add({ description: "Password is updated." });

    v.value.$reset();
    state.oldPassword = "";
    state.password = "";
    state.repeatPassword = "";
  } catch (e) {
    error.value = getErrorMessage(e);
  } finally {
    loadingSubmit.value = false;
  }
};

const v = useVuelidate(
  computed(() => ({
    oldPassword: { required },
    password: { required, minLength: minLength(6), maxLength: maxLength(72) },
    repeatPassword: { sameAs: sameAs(state.password, t("password")) },
  })),
  state
);

const { getValidationAttrs } = useValidations(v);
</script>

<template>
  <div>
    <GeneralForm @submit="handleSubmit">
      <div class="flex flex-col gap-2 w-full max-w-[400px] m-auto">
        <UFormGroup
          :label="t('currentPassword')"
          :error="getValidationAttrs('oldPassword').error"
        >
          <PasswordInput
            v-model="state.oldPassword"
            @blur="getValidationAttrs('oldPassword').onBlur"
          />
        </UFormGroup>
        <UFormGroup
          :label="t('newPassword')"
          :error="getValidationAttrs('password').error"
        >
          <PasswordInput
            v-model="state.password"
            @blur="getValidationAttrs('password').onBlur"
          />
        </UFormGroup>

        <UFormGroup
          :label="t('repeatNewPassword')"
          :error="getValidationAttrs('repeatPassword').error"
        >
          <PasswordInput
            v-model="state.repeatPassword"
            @blur="getValidationAttrs('repeatPassword').onBlur"
          />
        </UFormGroup>

        <UAlert color="red" v-if="error" :description="error"></UAlert>

        <UButton type="submit" class="mt-2" block :loading="loadingSubmit">
          {{ t("changePassword") }}
        </UButton>

        <UAlert
          :ui="{ description: 'text-xs' }"
          color="primary"
          variant="soft"
          :description="t('contactSupportForEmailChange')"
          class="mt-2"
        />
      </div>
    </GeneralForm>
  </div>
</template>

<style scoped></style>
