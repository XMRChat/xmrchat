<script setup lang="ts">
import SuperDmNotConfigured from "~/components/SuperDm/SuperDmNotConfigured.vue";
import type { SuperDm } from "~/types";

const { axios } = useApp();
const route = useRoute();
const { toStreamerSuperDmSettings } = useRouteLocation();

const { data, error, pending } = useLazyAsyncData(
  "super-dms",
  async () => {
    const { data } = await axios.get<{
      superDms: SuperDm[];
      settingsConfigured: boolean;
      notificationsActive: boolean;
    }>("/super-dms");

    return data;
  },
  { server: false },
);

const hideSuperDmList = computed<boolean | undefined>(
  () => route.meta.hideSuperDmList as boolean,
);
const hideSuperDmLayout = computed<boolean | undefined>(
  () => route.meta.hideSuperDmLayout as boolean,
);
</script>

<template>
  <div>
    <PageTitle title="SuperDMs" description="Manage your SuperDMs"></PageTitle>

    <PremiumPageContainer>
      <template v-if="!hideSuperDmLayout">
        <SuperDmNotConfigured
          v-if="
            (!data?.settingsConfigured || !data?.notificationsActive) &&
            !pending
          "
          :settingsConfigured="data?.settingsConfigured"
          :notificationsActive="data?.notificationsActive"
          class="mb-6"
        />

        <div class="flex justify-end mb-6">
          <UButton :to="toStreamerSuperDmSettings()" variant="soft">
            SuperDMs Settings
          </UButton>
        </div>
      </template>

      <NuxtPage v-if="hideSuperDmLayout" />

      <div v-else :class="['grid grid-cols-1 md:grid-cols-[250px_1fr]']">
        <div
          :class="[
            'md:border-e md:border-border md:pe-2',
            { 'hidden md:block': hideSuperDmList },
          ]"
        >
          <div class="flex flex-col gap-1">
            <template v-if="pending && !data">
              <SuperDmItemSkeleton v-for="x in 4" />
            </template>
            <template v-else-if="!data?.superDms.length">
              <NoItems text="No SuperDMs yet." />
            </template>
            <template v-else>
              <SuperDmItem v-for="item in data?.superDms" :superDm="item" />
            </template>
          </div>
        </div>

        <div class="md:ps-2">
          <NuxtPage :superDmsCount="data?.superDms.length" :pending="pending" />
        </div>
      </div>
    </PremiumPageContainer>
  </div>
</template>
