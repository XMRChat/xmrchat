<script lang="ts" setup>
import type { LiveStream, StreamerPage } from "~/types";

const route = useRoute();
const { toPage } = useRouteLocation();

const { $axios } = useNuxtApp();
const { t } = useI18n();
const toast = useToast();

const pendingLiveStreams = ref(false);
const updateLiveStreams = async () => {
  try {
    pendingLiveStreams.value = true;
    const { data } = await $axios.post<{ liveStreams: LiveStream[] }>(
      "/admin/update-live-streams"
    );
    const count = data.liveStreams.length;
    toast.add({
      title: `${count} Live streams found.`,
    });
  } catch (error) {
    toast.add({
      title: "Error updating live streams",
      description: getErrorMessage(error),
    });
  } finally {
    pendingLiveStreams.value = false;
  }
};

const state = reactive<{ search?: string }>({
  search: undefined,
});

const { page, offset, limit } = useFilter({
  initialPage: parseInt(route.query.page as string) || 1,
  getAll: () => refresh(),
  queryToData: () => {
    state.search = (route.query.search as string) || undefined;
  },
});

function onSearch() {
  navigateTo({
    query: {
      ...route.query,
      search: state.search || undefined,
      page: 1,
    },
  });
}

function resetSearch() {
  state.search = undefined;
  onSearch();
}

const { data, error, pending, refresh } = useLazyAsyncData(
  async () => {
    const { data } = await $axios.get<{ pages: StreamerPage[]; total: number }>(
      "/admin/pages",
      {
        params: {
          limit,
          offset: offset.value,
          search: route.query.search,
        },
      }
    );
    return data;
  },
  {
    server: false,
  }
);

const columns = [
  {
    key: "path",
    label: "Path",
  },
  {
    key: "user",
    label: "User",
  },
  {
    key: "tips",
    label: "Total paid amount",
  },
  {
    key: "count",
    label: "Paid tips count",
  },
  {
    key: "action",
    label: "",
  },
];
</script>

<template>
  <PageTitle title="Pages"> </PageTitle>

  <div class="mb-4 flex items-center justify-between gap-4">
    <UForm :state="state" class="flex gap-2" @submit="onSearch">
      <UFormGroup name="search">
        <UInput
          v-model="state.search"
          placeholder="Search"
          autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="!!state.search"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="resetSearch"
            />
          </template>
        </UInput>
      </UFormGroup>
      <UButton type="submit">Search</UButton>
    </UForm>
    <UButton @click="updateLiveStreams" :loading="pendingLiveStreams">
      Update live streams
    </UButton>
  </div>
  <PendingView :error="error" :pending="pending && !data">
    <UTable
      v-if="data"
      :rows="data.pages"
      :columns="columns"
      class="border border-border rounded-md"
      :ui="{
        td: { base: 'whitespace-normal text-text dark:text-text' },
      }"
    >
      <template #path-data="{ row }">
        <div class="flex flex-col">
          <span> {{ row.path }} </span>
          <span v-if="!row.isPublic" class="text-xs text-pale">Private</span>
        </div>
      </template>
      <template #user-data="{ row }">
        <div class="flex flex-col">
          <span>{{ row.user?.email }}</span>
          <span class="text-xs text-pale">{{
            new Date(row.user?.createdAt).toLocaleString()
          }}</span>
        </div>
      </template>
      <template #tips-data="{ row }">
        <div class="flex flex-col">
          <span>{{ row.totalTips }} XMR</span>
        </div>
      </template>
      <template #count-data="{ row }">
        <div class="flex flex-col">
          <span>{{ row.tipsCount }} Tips</span>
        </div>
      </template>
      <template #action-data="{ row }">
        <UButton
          trailingIcon="i-heroicons-arrow-long-right"
          variant="ghost"
          :to="toPage(row.path)"
        >
          View
        </UButton>
      </template>
      <template #empty-state>
        <NoItems :text="t('noItems')" />
      </template>
    </UTable>

    <UPagination
      v-if="data?.total"
      v-model="page"
      :total="data.total"
      :pageCount="limit"
      class="mt-12 justify-center"
    />
  </PendingView>
</template>

<style scoped></style>
