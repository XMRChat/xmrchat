<script setup lang="ts">
import type { DropdownItem } from "#ui/types";
const {
  toIndex,
  toContact,
  toLogin,
  toStreamerDisplay,
  toStreamerEdit,
  toStreamer,
} = useRouteLocation();

const authStore = useAuthStore();
const { logout, state } = authStore;
const route = useRoute();
const { copy } = useCopy();
const { t } = useI18n();

const config = useRuntimeConfig();

const dropdownItems = computed<DropdownItem[][]>(() => {
  const url = useRequestURL();

  const res: DropdownItem[][] = [
    [
      {
        label: authStore.userEmail || "",
        slot: "account",
        disabled: true,
      },
    ],
    [],
  ];

  if (state.page) {
    res[1].push(
      ...[
        {
          label: "My Tip Page",
          icon: "i-heroicons-banknotes",
          to: toStreamer(state.page.path),
        },
        {
          label: "Edit Tip Page",
          icon: "i-heroicons-pencil-square",
          click: () => navigateTo(toStreamerEdit()?.path),
        },
        {
          label: "Copy OBS Link",
          icon: "i-heroicons-document-duplicate",
          click: () => {
            copy(`${url.origin}/${state.page?.path}/obs`);
          },
          slot: "obs",
        },
      ],
    );
  }

  res[1].push(
    ...[
      {
        label: "My Display Page",
        icon: "i-heroicons-computer-desktop",
        click: () => navigateTo(toStreamerDisplay()?.path),
      },
      {
        label: "Logout",
        icon: "i-heroicons-arrow-left-end-on-rectangle-solid",
        click: () => {
          logout();
        },
      },
    ],
  );

  return res;
});
</script>

<template>
  <nav class="navbar py-2 border-b border-border">
    <div class="inner flex justify-between items-center">
      <div class="flex items-center">
        <NuxtLink class="w-[40px]" :to="toIndex()">
          <img src="/images/xmrchat-logo.png" />
          <span class="sr-only">Home Page</span>
        </NuxtLink>
        <ul>
          <li class="flex">
            <UButton variant="ghost" color="white" :to="toContact()">
              <span class="truncate max-w-[100px] sm:max-w-[100%]">
                {{ t("contactUs") }}
              </span>
            </UButton>
          </li>
        </ul>
      </div>
      <div class="flex items-center gap-1">
        <template v-if="!route.meta.hideHeaderLogin">
          <!-- <UDropdown
            v-if="authStore.isLoggedIn"
            :items="dropdownItems"
            :ui="{
              width: 'w-auto',
              item: {
                disabled: 'cursor-text select-text',
              },
            }"
          >
            <template #account="{ item }">
              <div>
                {{ item.label }}
              </div>
            </template>
            <template #obs="{ item }">
              <UIcon
                :name="item.icon"
                class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500"
              />
              <div>{{ item.label }}</div>
              <UBadge size="xs" variant="subtle">Beta</UBadge>
            </template>
            <UButton
              color="primary"
              label="Account"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdown> -->
          <UButton :to="toStreamer('xmrchat')" variant="soft">
            <UIcon name="i-tabler-heart" size="20" />
            <span class="hidden md:inline-flex"> {{ $t("donate") }} </span>
          </UButton>
          <UButton
            v-if="authStore.isLoggedIn"
            icon="i-heroicons-user"
            :to="toStreamerDisplay()"
          >
            <span class="hidden md:inline-flex">
              {{ t("account") }}
            </span>
          </UButton>
          <UButton v-else :to="toLogin()">
            <UIcon
              name="i-heroicons-arrow-right-end-on-rectangle-solid"
              size="20"
              class="md:hidden"
            />
            <span
              class="truncate max-w-[100px] sm:max-w-[100%] hidden md:inline-flex"
            >
              {{ t("creatorLogin") }}
            </span>
          </UButton>
        </template>

        <LanguageSelect v-if="config.public.showLocaleSelect" />

        <!-- <UButton
          square
          icon="i-heroicons-magnifying-glass"
          color="gray"
          :to="toCreators()"
        >
          <span class="sr-only">{{ t("searchCreators.title") }}</span>
        </UButton> -->
        <ColorMode />
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss"></style>
