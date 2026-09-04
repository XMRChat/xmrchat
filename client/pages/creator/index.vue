<script lang="ts" setup>
const { getCreators } = useServices();

const route = useRoute();
const { t } = useI18n();
defineOgImage({
  component: "XMRChat",
  props: {
    headline: t("searchCreators.title"),
  },
});

const { page, offset, limit } = useFilter({
  initialPage: parseInt(route.query.page as string) || 1,
  getAll: () => refresh(),
});

const { status, refresh, error, data } = useLazyAsyncData("creators", () =>
  getCreators({
    limit,
    offset: offset.value,
    search: route.query.search,
  }),
);
</script>

<template>
  <div>
    <div class="inner">
      <div class="heading pt-12">
        <h1 class="font-bold text-3xl text-center">
          {{ t("searchCreators.title") }}
        </h1>
        <p class="text-pale pt-4">
          {{ t("searchCreators.description") }}
        </p>
        <CreatorSearch />
      </div>

      <div v-if="status === 'pending' || status === 'idle'" class="links mt-12">
        <template v-for="n in 8">
          <div class="streamer-link">
            <USkeleton
              class="h-[90px] w-[90px]"
              :ui="{ rounded: 'rounded-full' }"
            />
            <USkeleton class="h-[22px] w-full mt-5" />
          </div>
        </template>
      </div>
      <div v-else-if="data" class="links pt-12">
        <template v-for="item in data?.pages">
          <NuxtLink
            class="streamer-link hover:bg-background-2/30 transition-colors"
            :to="item?.path"
          >
            <div class="flex items-center gap-4">
              <GeneralImage
                variant="logo"
                :url="item?.logo?.thumbnail || item?.logo?.url"
                class="w-[90px] h-[90px]"
              />
              <p v-if="item.bio" class="pt-1 text-xs text-pale line-clamp-4">
                {{ item.bio }}
              </p>
            </div>
            <div class="flex items-center gap-1 pt-3">
              <div class="font-medium">{{ item.name || item.path }}</div>
              <VerifiedBadge :links="item.links" size="18" />
            </div>
            <LiveStreamIcons
              v-if="item.liveStreams?.length"
              class="pt-1"
              :liveStreams="item.liveStreams"
            />
            <div v-else class="pt-1 text-sm text-pale">{{ item.path }}</div>
          </NuxtLink>
        </template>
      </div>
      <UPagination
        v-if="data?.total"
        v-model="page"
        :total="data.total"
        :pageCount="limit"
        class="mt-12 justify-center"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.inner {
  .heading {
    p {
      @apply text-center font-medium;
    }
    @apply flex flex-col justify-center;
  }
}
.links {
  @apply grid gap-4;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  .streamer-link {
    @apply flex items-center flex-col justify-center border border-border rounded-lg p-6;
  }
}
</style>
