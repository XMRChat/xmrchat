<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import type { Numberic, PageSetting } from "~/types";
import { PageSettingKey } from "~/types/enums";

interface State {
  form: {
    minSuperDmAmount?: Numberic;
    superDmActive?: boolean;
  };
  loadingSave: boolean;
}

const { required, numberic } = useValidations();
const { axios } = useApp();
const toast = useToast();

const state = reactive<State>({
  form: {
    minSuperDmAmount: undefined,
    superDmActive: false,
  },
  loadingSave: false,
});

useLazyAsyncData(
  async () => {
    const { data } = await axios.get<{ settings: PageSetting[] }>(
      `/super-dms/settings`,
    );
    const active = data.settings.find(
      (s) => s.key === PageSettingKey.SUPER_DM_ACTIVE,
    )?.value;
    const minAmount = data.settings.find(
      (s) => s.key === PageSettingKey.SUPER_DM_MIN_AMOUNT,
    )?.value;

    state.form.superDmActive = active;
    state.form.minSuperDmAmount = minAmount;
  },
  { server: false },
);

const handleSubmit = async () => {
  const valid = await v.value.$validate();

  if (!valid) return;

  try {
    state.loadingSave = true;
    await axios.put("/super-dms/settings", state.form);
    toast.add({ description: "SuperDM settings updated" });
  } catch (error) {
    toast.add({ description: getErrorMessage(error) });
  } finally {
    state.loadingSave = false;
  }
};

const v = useVuelidate<State["form"]>(
  computed(() => ({
    minSuperDmAmount: { required, numberic },
  })),
  computed(() => state.form),
);

const { getValidationAttrs } = useValidations(v);
</script>

<template>
  <div>
    <GeneralForm>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UFormGroup
          label="SuperDM activation"
          name="superDmActive"
          description="Activate or deactivate SuperDMs."
        >
          <UToggle v-model="state.form.superDmActive" size="lg" />
        </UFormGroup>
        <UFormGroup
          :label="$t('minSuperDMAmount')"
          name="minSuperDmAmount"
          :error="getValidationAttrs('minSuperDmAmount').error"
          :help="$t('minSuperDMAmountHelp')"
        >
          <UInput
            v-model="state.form.minSuperDmAmount"
            @blur="getValidationAttrs('minSuperDmAmount').onBlur"
          >
          </UInput>
        </UFormGroup>
      </div>
      <div class="flex pt-6">
        <UButton :loading="state.loadingSave" @click="handleSubmit">
          {{ $t("save") }}
        </UButton>
      </div>
    </GeneralForm>
  </div>
</template>

<style scoped></style>
