import type { StreamerPage } from "~/types";

export const useAppSeoMeta = () => {
  const { t } = useI18n();

  const description = t("head.description");

  const title = t("head.title");
  useServerSeoMeta({
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
  });
};

export const useStreamerIdSeoMeta = (
  page: Ref<StreamerPage | undefined | null>
) => {
  const { t } = useI18n();

  const {
    public: { imageBaseUrl },
  } = useRuntimeConfig();
  const imageUrl = computed(() => {
    const image = page.value?.logo?.thumbnail || page.value?.logo?.url;
    return image ? `${imageBaseUrl}${image}` : undefined;
  });

  useSeoMeta({
    title: () => t("head.tip", { path: page.value?.path || "" }),
  });

  useServerSeoMeta({
    description: t("head.XMRChatTip", { path: page.value?.path }),

    ogTitle: t("head.XMRChatTip", { path: page.value?.path }),
    ogDescription: t("head.XMRChatTip", { path: page.value?.path }),
    ogImage: imageUrl,

    twitterTitle: t("head.XMRChatTip", { path: page.value?.path }),
    twitterDescription: null,
    twitterImage: imageUrl,
    twitterCard: "summary",
  });
};
