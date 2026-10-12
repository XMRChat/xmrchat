<script lang="ts" setup>
// @ts-ignore
import debounce from "lodash.debounce";
import useVuelidate from "@vuelidate/core";
import type {
  CreateFormFields,
  SlugReservationResponse,
  StreamerPage,
  UploadedFile,
} from "~/types";
import type { FiatEnum } from "~/types/enums";

const { toStreamerDisplay, toGuides } = useRouteLocation();
const { t } = useI18n();

interface State {
  form: CreateFormFields;
  loadingSlug: boolean;
  slugAvailable: boolean;
  loading: boolean;
  page?: StreamerPage;
  errorMessage?: string;

  stagedLogoUrl?: string;
  stagedBannerUrl?: string;
}

const emit = defineEmits<{
  done: [
    {
      data: SlugReservationResponse;
      slug?: string;
      fiat?: FiatEnum;
    },
  ];
}>();

const props = defineProps<{
  editable: boolean;
}>();

const toast = useToast();
const {
  required,
  minLength,
  maxLength,
  streamerSlug,
  streamerSlugInternal,
  numberic,
  minValue,
  moneroPrimaryAddress,
} = useValidations();

const { minXMRPayAmount } = useAppConfig();
const { network } = useMoneroNetwork();

const {
  checkSlug: checkSlugApi,
  reserveSlug,
  getMyPage,
  updateStreamer,
} = useServices();

const state = reactive<State>({
  form: {
    logo: undefined,
    coverImage: undefined,
    primaryAddress: undefined,
    secretViewKey: undefined,
    path: undefined,
    tiers: [],
    twitchChannel: undefined,
    isPublic: true,
    tipDisplayMode: undefined,
    fiat: undefined,
    bio: undefined,
  },
  slugAvailable: false,
  loadingSlug: false,
  loading: false,
  errorMessage: undefined,

  stagedBannerUrl: undefined,
  stagedLogoUrl: undefined,
});

const renderSlugStatus = computed(() => {
  if (v.value.path.$invalid || props.editable) return undefined;
  if (state.loadingSlug)
    return {
      text: t("loading"),
      className: "",
    };
  if (state.slugAvailable)
    return {
      text: t("available"),
      className: "text-green-500",
    };
  return {
    text: t("unavailable"),
    className: "text-red-500",
  };
});

const isSlugValid = computed(() => state.slugAvailable && !state.loadingSlug);

const renderResultURL = computed(() => {
  const showUrl = !v.value.path.$invalid;
  if (showUrl)
    return t("pageWillBeAvailableAt", {
      url: `xmrchat.com/${state.form.path}`,
    });
  return undefined;
});

const chechSlugDebounced = debounce(async (value: string | undefined) => {
  if (v.value.path.$invalid || props.editable) return;
  state.loadingSlug = true;
  try {
    const res = await checkSlugApi({
      slug: value,
    });
    state.slugAvailable = res.available;
  } catch (error) {
    console.log("error");
  } finally {
    state.loadingSlug = false;
  }
}, 500);

const showExpirationWarning = computed(() => {
  if (!state.form.expirationMinutes) return false;
  if (!state.page?.expirationMinutes) return true;

  return state.form.expirationMinutes < state.page.expirationMinutes;
});

watch(
  () => state.form.path,
  (v) => chechSlugDebounced(v),
);

const handleSubmit = async () => {
  v.value.$touch();
  const valid = await v.value.$validate();
  if (!valid) return;

  state.errorMessage = undefined;
  try {
    state.loading = true;

    if (!props.editable) {
      if (!isSlugValid.value) return;
      const res = await reserveSlug(state.form);
      emit("done", {
        data: res,
        slug: state.form.path,
        fiat: state.form.fiat,
      });
    } else {
      if (!state.form.path) return;
      const res = await updateStreamer(state.form.path, {
        logo: state.form.logo,
        coverImage: state.form.coverImage,
        primaryAddress: state.form.primaryAddress,
        secretViewKey: state.form.secretViewKey,
        tiers: state.form.tiers,
        twitchChannel: state.form.twitchChannel?.toLowerCase(),
        isPublic: state.form.isPublic,
        tipDisplayMode: state.form.tipDisplayMode,
        messageTipDisplayMode: state.form.messageTipDisplayMode,
        fiat: state.form.fiat,
        minTipAmount: state.form.minTipAmount?.toString() || null,
        expirationMinutes: state.form.expirationMinutes || null,
        bio: state.form.bio || null,
        name: state.form.name || null,
        searchTerms: state.form.searchTerms || null,
      });
      toast.add({ title: t("pageUpdated") });
      navigateTo(toStreamerDisplay()?.path);
    }
  } catch (error) {
    state.errorMessage = getErrorMessage(error);
  } finally {
    state.loading = false;
  }
};

// Vuelidatte Validation Parameteres
const v = useVuelidate<State["form"]>(
  {
    logo: { required },
    coverImage: { required },
    primaryAddress: {
      required,
      minLength: minLength(95),
      maxLength: maxLength(95),
      moneroPrimary: moneroPrimaryAddress,
    },
    secretViewKey: {
      required,
      minLength: minLength(64),
      maxLength: maxLength(64),
    },
    path: {
      required,
      streamerSlug,
      streamerSlugInternal,
      minLength: minLength(3),
      maxLength: maxLength(16),
    },
    minTipAmount: { numberic, minValue: minValue(minXMRPayAmount) },
    bio: { maxLength: maxLength(150) },
  },
  toRef(state, "form"),
);

const getPage = async () => {
  if (!props.editable) return;

  const response = await getMyPage();
  const page = response.page;
  if (!page) return;
  state.page = page;

  state.form = {
    logo: page.logo.id,
    coverImage: page.coverImage.id,
    primaryAddress: page.primaryAddress,
    secretViewKey: page.secretViewKey,
    path: page.path,
    twitchChannel: page.twitchChannel?.toLowerCase(),
    isPublic: page.isPublic,
    minTipAmount: page.minTipAmount,
    tipDisplayMode: page.tipDisplayMode,
    messageTipDisplayMode: page.messageTipDisplayMode,
    fiat: page.fiat,
    expirationMinutes: page.expirationMinutes,
    tiers: page.tiers || [],
    bio: page.bio,
    name: page.name,
    searchTerms: page.searchTerms,
  };

  state.stagedLogoUrl = page.logo.url;
  state.stagedBannerUrl = page.coverImage.url;
};

onMounted(async () => {
  getPage();
});

const { getValidationAttrs } = useValidations(v);
const handleLogoUpload = (file: UploadedFile) => {
  state.stagedLogoUrl = file.url;
  state.form.logo = file.id;
};
const handleBannerUpload = (file: UploadedFile) => {
  state.stagedBannerUrl = file.url;
  state.form.coverImage = file.id;
};
</script>

<template>
  <div>
    <UForm
      :state="state.form"
      class="create-modify-form"
      @submit="handleSubmit"
    >
      <div class="both">
        <UFormGroup
          size="lg"
          :label="t('logo')"
          :description="t('logoRatio')"
          name="logo"
          :error="getValidationAttrs('logo').error"
        >
          <div class="flex flex-col gap-2">
            <div class="flex justify-center">
              <GeneralImage
                v-if="state.stagedLogoUrl"
                :url="state.stagedLogoUrl"
                variant="logo"
                class="w-[200px] h-[200px]"
              />
            </div>
            <ImageUploader
              @upload="handleLogoUpload"
              @blur="getValidationAttrs('logo').onBlur"
            />
          </div>
        </UFormGroup>

        <UFormGroup
          size="lg"
          :label="t('bannerImage')"
          :description="t('bannerImageBestRatio')"
          name="cover_image"
          :error="getValidationAttrs('coverImage').error"
        >
          <div class="flex flex-col gap-2">
            <div class="flex justify-center">
              <GeneralImage
                v-if="state.stagedBannerUrl"
                :url="state.stagedBannerUrl"
                variant="banner"
                class="w-full h-[200px]"
              />
            </div>
            <ImageUploader
              @upload="handleBannerUpload"
              @blur="getValidationAttrs('coverImage').onBlur"
            />
          </div>
        </UFormGroup>
      </div>

      <div class="single">
        <UFormGroup
          size="lg"
          :label="t('yourId')"
          name="slug"
          :error="getValidationAttrs('path').error"
          :description="renderResultURL"
        >
          <UInput
            :disabled="editable"
            :placeholder="t('pageSlug')"
            v-model="state.form.path"
            @blur="getValidationAttrs('path').onBlur"
          />
        </UFormGroup>
        <span
          v-if="renderSlugStatus"
          :class="['text-sm flex pt-2', renderSlugStatus.className]"
        >
          {{ renderSlugStatus.text }}
        </span>
      </div>

      <div class="both">
        <UFormGroup
          size="lg"
          :label="t('moneroPrmReciveAddress')"
          name="payment_address"
          :error="getValidationAttrs('primaryAddress').error"
          :help="
            t('prmMoneroReciveAdressBegin', {
              characters: network.validationCharacters.join(', '),
            })
          "
        >
          <UInput
            type="text"
            v-model="state.form.primaryAddress"
            @blur="getValidationAttrs('primaryAddress').onBlur"
          />
        </UFormGroup>

        <UFormGroup
          size="lg"
          :label="t('moneroSecretViewKey')"
          name="view_key"
          :error="getValidationAttrs('secretViewKey').error"
        >
          <UInput
            v-model="state.form.secretViewKey"
            @blur="getValidationAttrs('secretViewKey').onBlur"
          />
          <template #help>
            <I18nT keypath="weNeedSecretViewKey" scope="global">
              <template #whereToFind>
                <UButton
                  variant="link"
                  color="blue"
                  target="_blank"
                  class="p-0"
                  :to="toGuides()"
                >
                  {{ t("whereToFindViewKey") }}
                </UButton>
              </template>
            </I18nT>
          </template>
        </UFormGroup>
      </div>

      <div class="both">
        <UFormGroup
          size="lg"
          :label="t('twitchChannelName')"
          name="twitch_channel"
          :hint="t('optional')"
          :help="t('nameOfYourTwitchChannel')"
        >
          <UInput v-model="state.form.twitchChannel" />
        </UFormGroup>
        <UFormGroup
          v-if="editable"
          size="lg"
          :label="t('minTipAmount')"
          :hint="`Default: ${minXMRPayAmount} XMR`"
          help=""
          :error="getValidationAttrs('minTipAmount').error"
        >
          <UInput
            v-model="state.form.minTipAmount"
            @blur="getValidationAttrs('minTipAmount').onBlur"
          />
        </UFormGroup>
      </div>

      <div v-if="editable" class="both">
        <UFormGroup
          size="lg"
          :label="$t('tipPageAmountFormat')"
          :help="$t('determinesDefaultValue')"
        >
          <TipValueToggle
            v-model="state.form.tipDisplayMode"
            class="mt-2"
            :fiat="state.form.fiat"
          />
        </UFormGroup>
        <UFormGroup
          size="lg"
          :label="$t('messageAmountFormat')"
          :help="$t('determinesAmountInObsAndTwitch')"
        >
          <TipValueToggle
            v-model="state.form.messageTipDisplayMode"
            class="mt-2"
            :fiat="state.form.fiat"
          />
        </UFormGroup>
      </div>

      <div class="both" v-if="editable">
        <UFormGroup
          size="lg"
          :label="$t('fiatUnit')"
          :help="$t('fiatUnitHelp')"
        >
          <FiatSelect v-model="state.form.fiat" />
        </UFormGroup>
        <div class="grid gap-2">
          <UFormGroup
            size="lg"
            :label="t('tipExpiration')"
            :help="t('tipExpirationHelp')"
          >
            <TipExpirationSelect v-model="state.form.expirationMinutes" />
          </UFormGroup>
          <UAlert
            v-if="showExpirationWarning"
            color="orange"
            :description="$t('tipExpirationWarning')"
            variant="soft"
          ></UAlert>
        </div>
      </div>

      <div class="single" v-if="editable">
        <UFormGroup
          label="Bio"
          :help="$t('bioHelp')"
          :error="getValidationAttrs('bio').error"
        >
          <template #hint>
            <span class="text-xs">
              {{ state.form.bio?.length || 0 }} / 150
            </span>
          </template>
          <UTextarea
            v-model="state.form.bio"
            @blur="getValidationAttrs('bio').onBlur"
          />
        </UFormGroup>
      </div>

      <div class="both">
        <UFormGroup :label="t('brandName')" :help="t('brandNameHelp')">
          <UInput v-model="state.form.name" />
        </UFormGroup>
        <UFormGroup :label="t('searchTerms')" :help="t('searchTermsHelp')">
          <UInput v-model="state.form.searchTerms" />
        </UFormGroup>
      </div>

      <!-- <div class="single" v-if="editable">
        <UFormGroup :label="t('tipAmountSuggestions')">
          <StreamerTipSuggestions
            v-model="state.form.tiers"
            :minFiatAmount="minFiatAmount"
            :fiat="state.form.fiat"
          />
        </UFormGroup>
      </div> -->

      <!-- <div class="mt-8">
        <UCheckbox
          color="primary"
          label="Check if adult content"
          v-model="state.form.adult"
        />
      </div> -->
      <UCheckbox
        color="primary"
        :label="t('publicPage')"
        v-model="state.form.isPublic"
      />

      <div class="single">
        <UAlert
          color="red"
          :description="state.errorMessage"
          :title="t('errorCreatingUpdatingPage')"
          v-if="state.errorMessage"
        >
        </UAlert>
      </div>

      <UButton
        size="lg"
        :loading="state.loading"
        type="submit"
        class="flex items-center gap-2 w-fit"
      >
        {{ $t("continue") }}
        <DirectionalArrow />
      </UButton>
    </UForm>
  </div>
</template>

<style scoped lang="scss">
.create-modify-form {
  @apply flex gap-6 flex-col max-w-[860px];
  .both {
    .buttons {
      @apply inline-flex gap-2;
    }

    .banner {
      @apply flex justify-center mb-8;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    }
  }
}
</style>
