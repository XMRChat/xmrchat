<script lang="ts" setup>
import type { PageSettingField, UploadedFile } from "~/types";
import { PageSettingKey, UploadSlug } from "~/types/enums";

const url = useRequestURL();
const authStore = useAuthStore();
const { state: authState } = authStore;
const { t } = useI18n();

const { copy } = useCopy();
const {
  getPageSettings: getPageSettingsApi,
  updatePageSettings: updatePageSettingsApi,
} = useServices();
const toast = useToast();

const copyLink = () => {
  if (!authState.page) return;
  copy(`${url.origin}/${authState.page?.path}/obs`);
};

const { data, pending, refresh } = useLazyAsyncData(
  async () => {
    const res = await getPageSettingsApi();
    const settings = res.settings;

    const keepMessages =
      settings.find(({ key }) => key === PageSettingKey.OBS_KEEP_MESSAGES)
        ?.value ?? false;
    const playSound =
      settings.find(({ key }) => key === PageSettingKey.OBS_PLAY_SOUND)
        ?.value ?? false;
    const autoShowTips =
      settings.find(({ key }) => key === PageSettingKey.OBS_AUTO_SHOW_TIPS)
        ?.value ?? false;
    const obsSound =
      settings.find(({ key }) => key === PageSettingKey.OBS_SOUND)?.value ??
      null;

    const uploadedSound = settings.find(
      ({ key }) => key === PageSettingKey.OBS_SOUND
    )?.data as UploadedFile;

    state.form = {
      keepMessages,
      playSound,
      autoShowTips,
      obsSound,
    };
    state.uploadedSound = uploadedSound;

    return {};
  },
  {
    server: false,
  }
);

const state: {
  saving: boolean;
  saveError: string | undefined;
  form: {
    keepMessages: boolean;
    playSound: boolean;
    autoShowTips: boolean;
    obsSound?: number;
  };
  uploadedSound?: UploadedFile;
} = reactive({
  saving: false,
  saveError: undefined,
  form: {
    keepMessages: false,
    playSound: false,
    autoShowTips: false,
    obsSound: undefined,
  },
  uploadedSound: undefined,
});

const saveSettings = async () => {
  try {
    if (!authState.page?.id) return;
    state.saveError = undefined;
    state.saving = true;
    await updatePageSettingsApi(authState.page?.id, {
      settings: [
        {
          key: PageSettingKey.OBS_KEEP_MESSAGES,
          value: false,
        },
        {
          key: PageSettingKey.OBS_AUTO_SHOW_TIPS,
          value: state.form.autoShowTips,
        },
        { key: PageSettingKey.OBS_PLAY_SOUND, value: state.form.playSound },
        {
          key: PageSettingKey.OBS_SOUND,
          value: state.form.obsSound ? Number(state.form.obsSound) : null,
        },
      ] as PageSettingField[],
    });

    toast.add({
      title: t("settingsAreUpdated"),
    });
    await refresh();
  } catch (error) {
    state.saveError = getErrorMessage(error);
  } finally {
    state.saving = false;
  }
};

const clearSound = () => {
  state.form.obsSound = undefined;
  saveSettings();
};

const handleUploadSound = (file: UploadedFile) => {
  state.form.obsSound = file.id;
  saveSettings();
};
</script>

<template>
  <div>
    <PageTitle :title="t('obs')" :description="t('obsDescription')" />
    <div class="flex flex-col items-start gap-2">
      <!-- <span class="font-bold text-lg">Get page</span> -->
      <span>
        {{ t("toUseXMRchatsOnOBS") }}
      </span>
      <UButton icon="i-heroicons-document-duplicate" @click="copyLink">
        {{ t("copyOBSLink") }}
      </UButton>
    </div>
    <UDivider class="my-6" />
    <div class="font-bold text-lg mb-4">{{ t("obsPageSettings") }}</div>

    <div v-if="pending && !data" class="flex flex-col gap-4">
      <div class="grid grid-cols-[auto_1fr] gap-x-2" v-for="x in 2">
        <div>
          <USkeleton class="h-4 w-[38px]" />
        </div>
        <span>
          <USkeleton class="h-4 max-w-[120px]" />
        </span>
        <span></span>
        <div class="mt-2">
          <USkeleton class="h-4 w-full max-w-[320px]" />
        </div>
      </div>
    </div>

    <div v-else-if="data" class="flex flex-col gap-4">
      <div class="grid grid-cols-[auto_1fr] gap-x-2">
        <div>
          <UToggle
            v-model="state.form.autoShowTips"
            @change="saveSettings"
          ></UToggle>
        </div>
        <span class="font-bold cols"> {{ t("autoShowTips") }}</span>
        <span></span>
        <span class="text-pale text-sm">
          {{ t("autoShowTipsDescription") }}
        </span>
      </div>
      <div class="grid grid-cols-[auto_1fr] gap-x-2">
        <div>
          <UToggle
            v-model="state.form.playSound"
            @change="saveSettings"
          ></UToggle>
        </div>
        <span class="font-bold cols">{{ t("playSound") }}</span>
        <span></span>
        <span class="text-pale text-sm">
          {{ t("playSoundDescription") }}
        </span>
        <template v-if="state.form.playSound">
          <span></span>
          <UAlert
            :ui="{ description: 'text-xs' }"
            color="primary"
            variant="soft"
            :description="t('playSoundDescriptionLocal')"
            class="mt-2"
          />
        </template>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
        <UFormGroup
          description="Custom sound to play on OBS and Cohost pages ( mp3, wav, ogg )."
        >
          <template #label>
            <span class="font-bold text-text text-base">Upload Sound</span>
          </template>
          <FileUploader
            :slug="UploadSlug.OBS_SOUND"
            accept="audio/*"
            @upload="handleUploadSound"
          />
          <div
            v-if="state.uploadedSound"
            class="text-pale truncate max-w-[240px]"
          >
            <span class="text-xs">
              Uploaded: {{ state.uploadedSound?.originalName || "-" }}
            </span>
          </div>
          <div class="flex justify-end mt-2">
            <UButton variant="soft" color="red" @click="clearSound">
              Clear
            </UButton>
          </div>
        </UFormGroup>
      </div>
    </div>
    <div class="mt-6">
      <UAlert
        v-if="state.saveError"
        color="red"
        :description="state.saveError"
        :title="t('errorUpdatingSettings')"
      >
      </UAlert>
    </div>
    <!-- <div class="mt-6">
      <UButton :loading="state.saving" @click="saveSettings">{{
        t("saveChanges")
      }}</UButton>
    </div> -->
  </div>
</template>

<style scoped></style>
