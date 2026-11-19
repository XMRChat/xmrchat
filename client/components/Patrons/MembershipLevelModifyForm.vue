<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import type { MembershipLevel } from "~/types";

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
const { axios } = useApp();
const route = useRoute();
const id = computed(() => route.params.id as string);
const toast = useToast();

const state: State = reactive({
  form: {
    name: undefined,
    description: undefined,
    price: undefined,
    duration: undefined,
  },
  loading: false,
});

useLazyAsyncData(
  async () => {
    if (!id.value) return;
    const { data } = await axios.get<{ membershipLevel: MembershipLevel }>(
      `/patrons/membership-levels/${id.value}`
    );
    state.form.name = data.membershipLevel.name;
    state.form.description = data.membershipLevel.description;
    state.form.price = data.membershipLevel.price;
    state.form.duration = data.membershipLevel.duration;
  },
  { server: false }
);

const handleSubmit = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;

  state.loading = true;
  try {
    const request = id.value
      ? axios.put(`/patrons/membership-levels/${id.value}`, state.form)
      : axios.post(`/patrons/membership-levels`, state.form);

    await request;
    toast.add({
      description: id.value
        ? "Membership level updated."
        : "Membership level created.",
    });
    await navigateTo(toStreamerPatrons());
  } catch (error) {
    toast.add({
      description: getErrorMessage(error),
    });
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
