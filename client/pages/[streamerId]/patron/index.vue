<script setup lang="ts">
import type { PatronContent } from "#components";
import type {
  MembershipCreateResponse,
  MembershipLevel,
  PatronFormFields,
  PatronMember,
} from "~/types";
import { TipDisplayMode } from "~/types/enums";

definePageMeta({
  hideHeaderLogin: true,
});

const route = useRoute();
const { axios } = useApp();
const streamerId = computed(() => route.params.streamerId as string);
const { getStreamerPage } = useServices();
const { state: generalState } = useGeneralStore();
const { savePatronKey } = usePatronKeys();
const contentRef = ref<InstanceType<typeof PatronContent> | undefined>();

const { data, pending, error } = await useLazyAsyncData(
  `streamer-${streamerId.value}-patron`,
  async () => {
    const pageRequest = getStreamerPage(streamerId.value);
    const membershipLevelsRequest = axios.get<{
      membershipLevels: MembershipLevel[];
    }>(`/patrons/${streamerId.value}/membership-levels`);
    const activeMembersRequest = axios.get<{ members: PatronMember[] }>(
      `/patrons/${streamerId.value}/active-members`,
    );
    const [
      page,
      { data: membershipLevels },
      { data: activeMembers },
    ] = await Promise.all([
      pageRequest,
      membershipLevelsRequest,
      activeMembersRequest,
    ]);
    return {
      page,
      membershipLevels: membershipLevels.membershipLevels,
      activeMembers: activeMembers.members,
    };
  },
  {
    transform: (v) => {
      generalState.tipDisplayValue =
        v.page.tipDisplayMode || TipDisplayMode.FIAT;
      return v;
    },
  },
);

if (error.value) {
  throw createError(error.value);
}

const created = ref<MembershipCreateResponse | undefined>(undefined);
const form = ref<PatronFormFields | undefined>(undefined);
const paymentModalActive = ref(false);

const selectedLevel = computed(() =>
  data.value?.membershipLevels.find(
    (l) => l.id === form.value?.membershipLevelId,
  ),
);

const handlePayment = async (payload: {
  created: MembershipCreateResponse;
  form: PatronFormFields;
}) => {
  await savePatronKey({
    pagePath: streamerId.value,
    membershipId: payload.created.membership.id,
    mnemonic: payload.created.mnemonic,
  });

  paymentModalActive.value = true;
  created.value = payload.created;
  form.value = payload.form;
};

const cancelPayment = () => {
  paymentModalActive.value = false;
  created.value = undefined;
  form.value = undefined;
};

const handlePaid = () => {
  paymentModalActive.value = false;
  created.value = undefined;
  form.value = undefined;
  contentRef.value?.reset();
};

defineOgImage(false);
useStreamerIdSeoMeta(computed(() => data.value?.page));

const pageName = computed(() => data.value?.page.name || data.value?.page.path);
</script>

<template>
  <div class="inner pt-4 !max-w-[800px]">
    <PendingView :pending="pending" :error="error">
      <template v-if="data">
        <div class="flex items-center gap-2 pt-6">
          <GeneralImage
            :url="data.page.logo.url"
            variant="logo"
            class="logo w-20 h-20"
          />
          <span class="text-lg lg:text-2xl font-bold">{{ pageName }}</span>
        </div>

        <p class="text-sm text-pale pt-6">
          Become a Patron of {{ pageName }} by choosing a membership level.
          The name you choose can only be used by you while your membership is
          active, others are prevented from using it when sending tips.
        </p>
        <PatronContent
          ref="contentRef"
          :streamerId="streamerId"
          :pageName="pageName"
          :membershipLevels="data.membershipLevels"
          :activeMembers="data.activeMembers"
          @done="handlePayment"
        />

        <PatronPaymentModal
          :data="created"
          :name="form?.name"
          :levelName="selectedLevel?.name"
          :levelDuration="selectedLevel?.duration"
          :slug="streamerId"
          v-model:active="paymentModalActive"
          @cancel="cancelPayment"
          @paid="handlePaid"
        />
      </template>
    </PendingView>
  </div>
</template>
