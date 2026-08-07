<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import type {
  IntegrationConfig,
  NotificationPreference,
  Numberic,
} from "~/types";
import {
  NotificationChannelEnum,
  NotificationPreferenceType,
} from "~/types/enums";

const { axios } = useApp();
const toast = useToast();
const { numberic } = useValidations();
const authStore = useAuthStore();
const { dayjs } = useDate();
const { t } = useI18n();

type Form = {
  [key in NotificationChannelEnum]: {
    [key in NotificationPreferenceType]?: boolean;
  };
};
interface State {
  form: Form;
  pending: boolean;
  minNotificationThreshold?: Numberic;
  dailySummaryTime?: string;
}

const state = reactive<State>({
  form: {
    [NotificationChannelEnum.EMAIL]: {},
    [NotificationChannelEnum.SIMPLEX]: {},
    [NotificationChannelEnum.SIGNAL]: {},
  },
  pending: false,
  minNotificationThreshold: undefined,
  dailySummaryTime: undefined,
});

const getObjectPereferences = (
  channel: NotificationChannelEnum,
  list: NotificationPreference[],
) => {
  return list
    .filter((p) => p.channel === channel)
    .reduce(
      (acc, curr) => {
        acc[curr.type] = curr.enabled;
        return acc;
      },
      {} as Form[NotificationChannelEnum],
    );
};

const convertUTCToLocal = (utcTime?: string): string => {
  if (!utcTime) return "";

  const today = dayjs().format("YYYY-MM-DD");
  const utcDateTime = dayjs(`${today}T${utcTime}:00Z`);

  return utcDateTime.local().format("HH:mm");
};

const convertLocalToUTC = (localTime?: string): string => {
  if (!localTime) return "";

  const today = dayjs().format("YYYY-MM-DD");
  const localDateTime = dayjs(`${today}T${localTime}:00`);

  return localDateTime.utc().format("HH:mm");
};

const { error, data: integrations } = await useLazyAsyncData(
  async () => {
    const { data } = await axios.get<{
      preferences: NotificationPreference[];
      minNotificationThreshold: number;
      dailySummaryTime: string;
    }>(`/notification-preferences`);

    const { data: integrationsData } = await axios.get<{
      integrations: IntegrationConfig[];
    }>("/integrations");

    state.form.email = getObjectPereferences(
      NotificationChannelEnum.EMAIL,
      data.preferences,
    );

    state.form.simplex = getObjectPereferences(
      NotificationChannelEnum.SIMPLEX,
      data.preferences,
    );

    state.form.signal = getObjectPereferences(
      NotificationChannelEnum.SIGNAL,
      data.preferences,
    );

    state.minNotificationThreshold = data.minNotificationThreshold;
    state.dailySummaryTime = convertUTCToLocal(data.dailySummaryTime);
    return integrationsData.integrations;
  },
  { server: false },
);

const { simplex: simplexConfig, signal: signalConfig } = useIntegrations({
  integrations: computed(() => integrations.value),
});

const handleSave = async () => {
  const convertedPreferences = Object.entries(state.form)
    .map(([channel, p]) => {
      return Object.entries(p).map(([type, enabled]) => {
        return {
          channel,
          type,
          enabled,
        };
      });
    })
    .flatMap((p) => p);

  state.pending = true;
  try {
    await axios.patch("/notification-preferences", {
      preferences: convertedPreferences,
      minNotificationThreshold: state.minNotificationThreshold
        ? parseFloat(state.minNotificationThreshold as string)
        : null,
      dailySummaryTime: convertLocalToUTC(state.dailySummaryTime) || null,
    });
    toast.add({
      color: "green",
      title: t("notifsPreferencesSaved"),
    });
  } catch (error) {
    toast.add({
      color: "red",
      title: getErrorMessage(error),
    });
  } finally {
    state.pending = false;
  }
};

const v = useVuelidate<any>(
  {
    minNotificationThreshold: { numberic },
  },
  state,
);

const { getValidationAttrs } = useValidations(v);

const isPremium = computed(() => authStore.isPremiumOrAdmin);
</script>

<template>
  <div>
    <PageTitle
      :title="$t('notifications')"
      :description="$t('manageYourNotifs')"
    />

    <PremiumPageContainer>
      <ErrorView :error="error" v-if="error" />

      <GeneralForm @submit="handleSave" v-else>
        <div class="grid mb-10 grid-cols-1 md:grid-cols-2 gap-4">
          <UFormGroup
            :label="$t('minNotifsThreshold')"
            name="minNotificationThreshold"
            :error="getValidationAttrs('minNotificationThreshold').error"
            :help="$t('minNotifsThresholdHelp')"
          >
            <UInput
              v-model="state.minNotificationThreshold"
              @blur="getValidationAttrs('minNotificationThreshold').onBlur"
              :style="{ paddingStart: '54px' }"
            >
              <template #leading>
                <span
                  class="text-pale flex items-center text-center justify-center"
                >
                  XMR
                </span>
              </template>
            </UInput>
          </UFormGroup>

          <!-- <UFormGroup
          label="Daily Summary Time"
          name="dailySummaryTime"
          help="Time when daily summary notifications will be sent."
        >
          <TimeInput v-model="state.dailySummaryTime" />
        </UFormGroup> -->
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
          <NotificationPreferenceContainer
            :channel="NotificationChannelEnum.EMAIL"
            v-model="state.form.email"
            v-model:dailySummaryTime="state.dailySummaryTime"
            configVerified
          >
          </NotificationPreferenceContainer>
          <NotificationPreferenceContainer
            :channel="NotificationChannelEnum.SIMPLEX"
            v-model="state.form.simplex"
            :configVerified="simplexConfig?.verified"
          ></NotificationPreferenceContainer>
          <NotificationPreferenceContainer
            :channel="NotificationChannelEnum.SIGNAL"
            v-model="state.form.signal"
            :configVerified="signalConfig?.verified"
          >
          </NotificationPreferenceContainer>
        </div>
        <div class="flex mt-4">
          <UButton type="submit" color="primary" :loading="state.pending">
            {{ $t("saveChanges") }}
          </UButton>
        </div>
      </GeneralForm>
    </PremiumPageContainer>
  </div>
</template>

<style scoped></style>
