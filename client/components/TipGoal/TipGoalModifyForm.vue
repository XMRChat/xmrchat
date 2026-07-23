<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import type { TipGoal } from "~/types";

interface State {
  form: {
    name?: string;
    amount?: string;
    startTime?: string;
    endTime?: string;
    description?: string;
    isActive: boolean;
  };
  tipGoal: TipGoal | undefined;
  loading: boolean;
  loadingData: boolean;
}

const props = defineProps<{
  editable?: boolean;
}>();

const emit = defineEmits<{
  update: [];
}>();

const { required, maxLength, numberic } = useValidations();
const { toStreamerTipGoal, toCreateStreamerTipGoal } = useRouteLocation();
const { axios } = useApp();
const toast = useToast();
const { dayjs } = useDate();
const { t } = useI18n();
const DEFAULT_FORMAT = "YYYY-MM-DDTHH:mm";

const state: State = reactive({
  form: {
    name: undefined,
    amount: undefined,
    startTime: undefined,
    endTime: undefined,
    description: undefined,
    isActive: true,
  },
  tipGoal: undefined,
  loading: false,
  loadingData: false,
});

const toDatetimeLocal = (value?: string) => {
  if (!value) return undefined;
  const date = dayjs(value);
  if (!date.isValid()) return undefined;
  return date.format("YYYY-MM-DDTHH:mm");
};

const toIsoString = (value?: string) => {
  if (!value) return undefined;
  const date = dayjs(value);
  if (!date.isValid()) return undefined;
  return date.toISOString();
};

useLazyAsyncData(
  async () => {
    if (!props.editable) return;

    state.loadingData = true;
    try {
      const { data } = await axios.get<{ tipGoal: TipGoal | null }>(
        `/tip-goals`,
      );
      if (!data.tipGoal) {
        await navigateTo(toCreateStreamerTipGoal());
        return;
      }

      state.form.name = data.tipGoal.name;
      state.form.amount = data.tipGoal.amount;
      state.form.startTime = toDatetimeLocal(data.tipGoal.startTime);
      state.form.endTime = toDatetimeLocal(data.tipGoal.endTime);
      state.form.description = data.tipGoal.description;
      state.form.isActive = data.tipGoal.isActive;
      state.tipGoal = data.tipGoal;
    } finally {
      state.loadingData = false;
    }
  },
  { server: false },
);

const handleSubmit = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;

  state.loading = true;
  try {
    const payload = {
      name: state.form.name,
      amount: String(state.form.amount),
      startTime: toIsoString(state.form.startTime),
      endTime: toIsoString(state.form.endTime),
      description: state.form.description || undefined,
      isActive: state.form.isActive,
    };

    if (props.editable) {
      await axios.put(`/tip-goals`, payload);
    } else {
      await axios.post(`/tip-goals`, payload);
    }

    toast.add({
      description: props.editable ? "Tip goal updated" : "Tip goal created",
      color: "green",
    });
    // await navigateTo(toStreamerTipGoal());
    emit("update");
  } catch (error) {
    toast.add({
      description: getErrorMessage(error),
      color: "red",
    });
  } finally {
    state.loading = false;
  }
};

const v = useVuelidate<any>(
  computed(() => ({
    name: { required, maxLength: maxLength(80) },
    amount: { required, numberic },
    startTime: { required },
    endTime: {
      afterDate: helpers.withMessage(
        "End should be after start.",
        (value: any) =>
          value ? dayjs(value).isAfter(state.form.startTime) : true,
      ),
    },
    description: { maxLength: maxLength(255) },
  })),
  computed(() => state.form),
);

const { getValidationAttrs } = useValidations(v);
</script>

<template>
  <div>
    <GeneralForm @submit="handleSubmit">
      <div class="flex gap-4 flex-col w-full max-w-[600px] m-auto">
        <UFormGroup label="Name" :error="getValidationAttrs('name').error">
          <UInput
            v-model="state.form.name"
            @blur="getValidationAttrs('name').onBlur"
          />
        </UFormGroup>

        <UFormGroup
          label="Amount ( XMR )"
          :error="getValidationAttrs('amount').error"
        >
          <UInput
            v-model="state.form.amount"
            @blur="getValidationAttrs('amount').onBlur"
          />
        </UFormGroup>

        <UFormGroup
          label="Start"
          :error="getValidationAttrs('startTime').error"
        >
          <UInput
            v-model="state.form.startTime"
            type="datetime-local"
            @blur="getValidationAttrs('startTime').onBlur"
          />
        </UFormGroup>

        <UFormGroup label="End" :error="getValidationAttrs('endTime').error">
          <template #hint>
            <span class="text-xs">{{ $t("optional") }}</span>
          </template>
          <UInput
            v-model="state.form.endTime"
            type="datetime-local"
            @blur="getValidationAttrs('endTime').onBlur"
          />
        </UFormGroup>

        <UFormGroup
          label="Description"
          :error="getValidationAttrs('description').error"
        >
          <template #hint>
            <span class="text-xs">{{ $t("optional") }}</span>
          </template>
          <UTextarea
            v-model="state.form.description"
            @blur="getValidationAttrs('description').onBlur"
          />
        </UFormGroup>

        <UFormGroup>
          <UCheckbox v-model="state.form.isActive" label="Is Active">
            <template #help>
              Deactived tip goal will not be displayed on your tip page.
            </template>
          </UCheckbox>
        </UFormGroup>

        <div class="mt-4">
          <UButton type="submit" :loading="state.loading">
            {{ $t("save") }}
          </UButton>
        </div>
      </div>
    </GeneralForm>
  </div>
</template>

<style scoped></style>
