<script lang="ts" setup>
import { FiatEnum, PageStatusEnum, type TipDisplayMode } from "~/types/enums";

useHead({
  title: "Profile",
});

const { getMyPage } = useServices();
const { t } = useI18n();

const { data, pending, refresh, error } = await useLazyAsyncData(
  "streamer-profile",
  () => getMyPage()
);

const tipValue = ref<TipDisplayMode | undefined>(
  data.value?.page?.tipDisplayMode
);
const { getFiat } = useConstants();
</script>

<template>
  <div>
    <PendingView :pending="pending">
      <div v-if="!pending">
        <div v-if="data?.page">
          <!-- <StreamerHeader
            :logoUrl="data.page.logo.url"
            :bannerUrl="data.page.coverImage.url"
            :showTitle="false"
            class="mb-10"
          /> -->

          <UAlert
            v-if="data.page.status === PageStatusEnum.DEACTIVE"
            color="red"
            variant="soft"
            :description="t('pageDeactivatedAlert')"
            class="my-4"
          />

          <div class="flex justify-end mb-2 gap-2 items-center">
            <TipReplySettingsModal @update="refresh" />
            <UTooltip
              :text="
                $t('tipDisplayValueTooltip', {
                  fiat: getFiat(data.page.fiat || FiatEnum.USD).name,
                })
              "
              :popper="{ placement: 'top' }"
            >
              <TipValueToggle
                class="font-normal"
                v-model="tipValue"
                :fiat="data.page.fiat"
              />
            </UTooltip>
          </div>

          <StreamerTipsList
            :slug="data.page.path"
            :tipValue="tipValue"
            :fiat="data.page.fiat"
            :page="data.page"
          />
        </div>
        <NoPageYet v-else />
      </div>
    </PendingView>
  </div>
</template>

<style scoped lang="scss"></style>
