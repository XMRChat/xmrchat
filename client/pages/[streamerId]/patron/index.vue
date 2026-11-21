<script setup lang="ts">
import type { PatronContent } from "#components";
import type {
  MembershipCreateResponse,
  MembershipLevel,
  PatronFormFields,
  PatronMember,
  PatronPageMembership,
} from "~/types";
import { TipDisplayMode } from "~/types/enums";

definePageMeta({
  hideHeaderLogin: true,
});

const route = useRoute();
const { axios } = useApp();
const streamerId = computed(() => route.params.streamerId as string);
const { getStreamerPage, getMyPageMemberships } = useServices();
const { state: generalState } = useGeneralStore();
const { savePatronKey } = usePatronKeys();
const contentRef = ref<InstanceType<typeof PatronContent> | undefined>();

const patronStore = usePatronStore();

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
    const [page, { data: membershipLevels }, { data: activeMembers }] =
      await Promise.all([
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

const { data: pageMemberships, refresh: refreshPageMemberships } =
  await useLazyAsyncData(
    `streamer-${streamerId.value}-patron-memberships`,
    async () => {
      if (!patronStore.token) return [] as PatronPageMembership[];
      const { memberships } = await getMyPageMemberships(streamerId.value);
      return memberships;
    },
    { server: false },
  );

const hasActiveMembership = computed(() =>
  (pageMemberships.value || []).some((m) => m.status === "active"),
);

watch(
  () => patronStore.token,
  () => {
    refreshPageMemberships();
  },
);

if (error.value) {
  throw createError(error.value);
}

const created = ref<MembershipCreateResponse | undefined>(undefined);
const form = ref<PatronFormFields | undefined>(undefined);
const paymentModalActive = ref(false);
const loginModalActive = ref(false);

const selectedLevel = computed(() =>
  data.value?.membershipLevels.find(
    (l) => l.id === form.value?.membershipLevelId,
  ),
);

const handlePayment = async (payload: {
  created: MembershipCreateResponse;
  form: PatronFormFields;
}) => {
  // No mnemonic when the logged in patron is reused, they already have a key.
  if (payload.created.mnemonic)
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
  refreshPageMemberships();
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

        <div v-if="patronStore.token" class="pt-6">
          <PatronMemberships
            :memberships="pageMemberships || []"
            @logout="patronStore.logout"
          />
        </div>

        <p class="text-sm text-pale pt-6">
          Become a Patron of {{ pageName }} by choosing a membership level. The
          name you choose can only be used by you while your membership is
          active, others are prevented from using it when sending tips.
        </p>
        <PatronContent
          ref="contentRef"
          :streamerId="streamerId"
          :pageName="pageName"
          :membershipLevels="data.membershipLevels"
          :activeMembers="data.activeMembers"
          :existingName="pageMemberships?.[0]?.name"
          :hasActiveMembership="hasActiveMembership"
          @done="handlePayment"
          @login="loginModalActive = true"
        />

        <PatronLoginModal v-model="loginModalActive" />

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
