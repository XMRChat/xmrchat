<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { ContentLinkPlatformEnum } from "~/types/enums";

interface State {
  form: {
    name?: string;
    searchTerms?: string;
    rumbleLiveStreamUrl?: string;
    links: Record<
      ContentLinkPlatformEnum,
      { platform?: ContentLinkPlatformEnum; value?: string }
    >;
  };
  saving: boolean;
  saveError?: string;
}

const { getMyLinks: getMyLinksReq, updateLinks } = useServices();
const { url, notUrl, rumbleApiUrl, notStartingWithAt } = useValidations();
const toast = useToast();
const { getContentLink } = useConstants();
const { t } = useI18n();
const { toStreamerContentLink } = useRouteLocation();
const authStore = useAuthStore();

const { data, refresh } = useLazyAsyncData(
  async () => {
    const res = await getMyLinksReq();

    const { links, ...rest } = res;

    state.form = {
      // @ts-ignore
      links: arrayToObject(links, "platform"),
      ...rest,
    };

    return { links };
  },
  { server: false },
);

const state = reactive<State>({
  form: {
    links: {
      rumble: {},
      substack: {},
      twitch: {},
      x: {},
      website: {},
      youtube: {},
      tiktok: {},
      odysee: {},
      "podcast-rss": {},
      instagram: {},
      telegram: {},
      nostr: {},
      xmrbazaar: {},
      kick: {},
      kuno: {},
      peertube: {},
      upscrolled: {},
      bitchute: {},
      discord: {},
      patreon: {},
    },
    name: undefined,
    searchTerms: undefined,
    rumbleLiveStreamUrl: undefined,
  },
  saving: false,
  saveError: undefined,
});

const save = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;
  try {
    state.saveError = undefined;
    state.saving = true;
    await updateLinks({
      name: state.form.name,
      searchTerms: state.form.searchTerms,
      links: Object.values(state.form.links),
      rumbleLiveStreamUrl: state.form.rumbleLiveStreamUrl,
    });

    toast.add({
      title: t("changesAreSaved"),
    });
    refresh();
    authStore.getMe();
  } catch (error) {
    state.saveError = getErrorMessage(error);
  } finally {
    state.saving = false;
  }
};

const rules = computed(() => {
  const notUrlWithMessage = helpers.withMessage(t("notUrlWithMessage"), notUrl);
  const {
    WEBSITE,
    PODCAST_RSS,
    PEERTUBE,
    UPSCROLLED,
    BITCHUTE,
    DISCORD,
    PATREON,
    ...rest
  } = ContentLinkPlatformEnum;

  const notUrls: Record<string, any> = {};
  Object.values(rest).forEach((nUrl) => {
    notUrls[nUrl] = {
      value: {
        notUrlWithMessage,
        notStartingWithAt: helpers.withMessage(
          `Don't include the "@" symbol at the beginning.`,
          notStartingWithAt,
        ),
      },
    };
  });

  return {
    links: {
      [WEBSITE]: { value: { url } },
      [PODCAST_RSS]: { value: { url } },
      [PEERTUBE]: { value: { url } },
      [UPSCROLLED]: { value: { url } },
      [BITCHUTE]: { value: { url } },
      [DISCORD]: { value: { url } },
      [PATREON]: { value: { url } },
      ...notUrls,
    },
    rumbleLiveStreamUrl: { url, rumbleApiUrl },
  };
});

const v = useVuelidate<any>(
  rules,
  computed(() => state.form),
);

const { getValidationAttrs } = useValidations(v);

// gets link from data
const getLink = (platform: ContentLinkPlatformEnum) => {
  return data.value?.links?.find((l: any) => l.platform === platform);
};
</script>

<template>
  <div>
    <PageTitle
      :title="t('contentLinks')"
      :description="t('contentLinksDescription')"
    />

    <!-- <div class="grid md:grid-cols-2 gap-4">
      <UFormGroup :label="t('brandName')" :help="t('brandNameHelp')">
        <UInput v-model="state.form.name" />
      </UFormGroup>
      <UFormGroup :label="t('searchTerms')" :help="t('searchTermsHelp')">
        <UInput v-model="state.form.searchTerms" />
      </UFormGroup>
    </div> -->

    <h3 class="font-bold mt-8">{{ t("contentLinks") }}</h3>
    <p class="text-sm text-pale pt-1 mb-4">
      {{ t("contentLinksSecondDescription") }}
    </p>

    <div
      class="grid md:grid-cols-2 md:grid-flow-col gap-4"
      :style="`grid-template-rows: repeat(${Math.ceil(
        CONTENT_LINKS_LIST.length / 2,
      )}, 1fr)`"
    >
      <UFormGroup
        v-for="p in CONTENT_LINKS_LIST"
        :error="getValidationAttrs(`links.${p}.value`).error"
      >
        <template #label>
          <span class="flex items-center gap-1.5">
            <UIcon
              :name="getContentLink(p).icon"
              :class="['w-[16px] h-[16px]', getContentLink(p).colorClassName]"
            />
            <span>{{ getContentLink(p).inputLabel }}</span>
          </span>
        </template>
        <template #hint>
          <div v-if="getContentLink(p).verify">
            <UButton
              variant="link"
              :to="toStreamerContentLink(p)"
              :padded="false"
            >
              {{ getLink(p)?.verification ? "Verfied" : "Verify" }}
            </UButton>
          </div>
        </template>
        <UInput
          v-model="state.form.links[p].value"
          @blur="getValidationAttrs(`links.${p}.value`).onBlur"
        />
      </UFormGroup>
    </div>

    <UFormGroup
      :label="$t('rumbleLiveStreamApi')"
      class="mt-4"
      :error="getValidationAttrs('rumbleLiveStreamUrl').error"
    >
      <template #description>
        <I18nT keypath="rumbleLiveStreamApiHelp">
          <template #guide>
            <UButton
              :padded="false"
              variant="link"
              target="_blank"
              external
              to="https://rumblefaq.groovehq.com/help/how-to-use-rumble-s-live-stream-api"
            >
              {{ $t("thisGuide") }}
            </UButton>
          </template>
        </I18nT>
      </template>
      <PasswordInput
        defaultVisible
        autocomplete="off"
        @blur="getValidationAttrs('rumbleLiveStreamUrl').onBlur"
        v-model="state.form.rumbleLiveStreamUrl"
      />
    </UFormGroup>

    <UAlert
      v-if="state.saveError"
      class="mt-4"
      :title="t('errorSavingChanges')"
      color="red"
      variant="subtle"
      :description="state.saveError"
    ></UAlert>

    <div class="mt-4">
      <UButton :loading="state.saving" @click="save">{{
        t("saveChanges")
      }}</UButton>
    </div>
  </div>
</template>

<style scoped></style>
