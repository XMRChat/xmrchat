<script setup lang="ts">
import useVuelidate from "@vuelidate/core";

interface State {
  form: {
    name?: string;
    description?: string;
    price?: number;
    duration?: number;
  };
  loading: boolean;
}

const { required, maxLength, numberic, integer } = useValidations();
const { toStreamerPatrons } = useRouteLocation();

const state: State = reactive({
  form: {
    name: undefined,
    description: undefined,
    price: undefined,
    duration: undefined,
  },
  loading: false,
});

const handleSubmit = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;

  state.loading = true;
  try {
    await navigateTo(toStreamerPatrons());
  } finally {
    state.loading = false;
  }
};

const v = useVuelidate<any>(
  {
    name: { required, maxLength: maxLength(20) },
    description: { maxLength: maxLength(255) },
    price: { numberic, required },
    duration: { integer, required },
  },
  computed(() => state.form),
);

const { getValidationAttrs } = useValidations(v);
</script>

<template>
  <GeneralForm @submit="handleSubmit">
    <div class="flex gap-4 flex-col w-full max-w-[600px] m-auto">
      <UFormGroup :label="$t('name')" :error="getValidationAttrs('name').error">
        <UInput
          v-model="state.form.name"
          @blur="getValidationAttrs('name').onBlur"
        />
      </UFormGroup>
      <UFormGroup
        :label="$t('amountXMR')"
        :error="getValidationAttrs('price').error"
      >
        <UInput
          v-model="state.form.price"
          @blur="getValidationAttrs('price').onBlur"
        />
      </UFormGroup>
      <UFormGroup
        label="Duration (days)"
        :error="getValidationAttrs('duration').error"
      >
        <UInput
          v-model="state.form.duration"
          @blur="getValidationAttrs('duration').onBlur"
        />
      </UFormGroup>
      <UFormGroup
        :label="$t('description')"
        :error="getValidationAttrs('description').error"
      >
        <UTextarea
          v-model="state.form.description"
          @blur="getValidationAttrs('description').onBlur"
        />
      </UFormGroup>
      <div class="mt-4">
        <UButton type="submit" :loading="state.loading">{{
          $t("save")
        }}</UButton>
      </div>
    </div>
  </GeneralForm>
</template>
