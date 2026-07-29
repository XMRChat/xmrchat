<script lang="ts" setup>
import { ConfirmModal } from "#components";
import type {
  Numberic,
  ObsTipSocketEvent,
  PageSetting,
  StreamerPage,
  Tip,
  TipReply,
  TipReplySettings,
} from "~/types";
import { FiatEnum, PageSettingKey, TipDisplayMode } from "~/types/enums";

const props = withDefaults(
  defineProps<{
    slug: string;
    tipValue?: TipDisplayMode;
    fiat?: FiatEnum;
    page?: StreamerPage;
    showPrivateNameAndMessage?: boolean;
    showReply?: boolean;
    playSound?: boolean;
  }>(),
  {
    showPrivateNameAndMessage: true,
    showReply: true,
  },
);

const { axios } = useApp();
const config = useRuntimeConfig();
const { getTips: getTipsApi, updateTipPrivate: updatePrivateApi } =
  useServices();
const { dayjs } = useDate();

const modal = useModal();

const tipEvents = ref<ObsTipSocketEvent[]>([]);

const { getSoundUrl } = useTip({
  soundUrl: computed(() => data.value?.obsSound?.url),
});

const { init, disconnect, sendTipToObs, removeTipFromObs } = usePageSocket({
  handleInitialObsTipsEvent: (payloads) => {
    tipEvents.value = payloads;
  },
  handleTipEvent: (event) => {
    if (!props.playSound) return;
    const audio = new Audio(getSoundUrl(event.tip));
    audio.play();
  },
});

const { t } = useI18n();

const toast = useToast();

const { data, refresh, pending, error } = useLazyAsyncData(
  `streamer-recent-tips-${props.slug}`,
  async () => {
    // const data = await getTipsApi(props.slug);

    const [data, obsSettings, tipReplySettings] = await Promise.all([
      getTipsApi(props.slug),
      axios.get<{ settings: PageSetting[] }>(
        `/page-settings/${props.slug}/obs`,
      ),
      axios.get<{ settings: TipReplySettings }>(
        `/tip-replies/${props.slug}/settings`,
      ),
    ]);

    const obsSound = obsSettings.data.settings.find(
      ({ key }) => key === PageSettingKey.OBS_SOUND,
    )?.data;

    return {
      data,
      obsSound,
      tipReplySettings: tipReplySettings.data.settings,
    };
  },
);

// const { data: obsSettings } = useLazyAsyncData(
//   async () => {
//     const { data } = await axios.get<{ settings: PageSetting[] }>(
//       `/page-settings/${props.slug}/obs`,
//     );

//     const obsSound = data.settings.find(
//       ({ key }) => key === PageSettingKey.OBS_SOUND,
//     )?.data;

//     return {
//       obsSound,
//     };
//   },
//   { server: false },
// );

// const { data: replySettings } = useLazyAsyncData(
//   `tip-reply-settings-${props.slug}`,
//   async () => {
//     const { data } = await axios.get<{ settings: TipReplySettings }>(
//       `/tip-replies/${props.slug}/settings`,
//     );

//     return data.settings;
//   },
//   { server: false },
// );

const replyStyle = computed(() => tipReplyStyle(data.value?.tipReplySettings));

const interval = ref<NodeJS.Timeout | undefined>(undefined);

onMounted(() => {
  startTipsInterval();
  init(props.slug);
});
onUnmounted(() => disconnect());

const startTipsInterval = () => {
  stopTipsInterval();
  interval.value = setInterval(() => refresh(), 8000);
};

const stopTipsInterval = () => {
  clearInterval(interval.value);
};

onBeforeUnmount(() => stopTipsInterval());

const columns = computed(() => {
  const list = [
    {
      key: "name",
      label: t("tipName"),
    },
    {
      key: "amount",
      label: t("tipAmount"),
    },
    {
      key: "message",
      label: t("tipMessage"),
    },
    {
      key: "paidAt",
      label: t("tipDate"),
    },
    // {
    //   key: "private",
    //   label: t("tipPrivate"),
    // },
    {
      key: "action",
      label: t("action"),
    },
  ];

  // if (showReply.value) {
  //   list.push({
  //     key: "reply",
  //     label: "Reply",
  //   });
  // }
  return list;
});

const updateTipPrivate = async (id: Numberic, isPrivate: boolean) => {
  try {
    await updatePrivateApi(id, {
      private: isPrivate,
    });

    toast.add({
      title: t("tipUpdated"),
    });

    await refresh();
  } catch (error) {
    toast.add({
      title: t("error"),
      description: getErrorMessage(error),
      color: "red",
    });
  }
};

const { xmrToFiat } = useXmrPrice();
const { money } = useMoney();

const getComputedPrice = (amount?: string) => {
  const xmr = unitsToXmr(amount);
  const fiat = xmrToFiat(xmr, props.fiat);
  return props.tipValue === TipDisplayMode.XMR
    ? `${xmr} XMR`
    : money(fiat.toFixed(2), props.fiat);
};

const { getDisappearText } = useTip({
  page: computed(() => props.page),
});

const handleSendClick = async (row: Tip) => {
  try {
    await sendTipToObs(props.slug, row.id);
    tipEvents.value.push({ tip: row, message: "", autoRemove: false });
  } catch (error) {
    toast.add({
      title: t("error"),
      description: getErrorMessage(error),
      color: "red",
    });
  }
};

const handleRemoveClick = async (row: Tip) => {
  try {
    await removeTipFromObs(props.slug, row.id);
    tipEvents.value = tipEvents.value.filter(({ tip }) => tip?.id !== row.id);
  } catch (error) {
    toast.add({
      title: t("error"),
      description: getErrorMessage(error),
      color: "red",
    });
  }
};

const { markdownAndSanitize } = useMarkdown();

const makePublicAbility = computed(() => props.page?.ability?.makeTipPublic);
const getPrivateDisabled = (privateValue: boolean) =>
  privateValue && !makePublicAbility.value;

const tipReplyModal = reactive<{
  pending: boolean;
  tipReply?: TipReply;
  active: boolean;
  tip?: Tip;
}>({
  pending: false,
  tipReply: undefined,
  active: false,
  tip: undefined,
});

const showReply = computed(() => props.showReply && props.page?.isPremium);

const handleReplyClick = async (tip?: Tip) => {
  tipReplyModal.tip = tip;
  tipReplyModal.tipReply = undefined;
  tipReplyModal.active = true;

  const tipReplyId = tip?.tipReplies?.[0]?.id;

  if (!tipReplyId) return;

  const tipReply = await getTipReply(tipReplyId);
  tipReplyModal.tipReply = tipReply;
};

const getTipReply = async (id: number) => {
  try {
    tipReplyModal.pending = true;
    const { data } = await axios.get<{ tipReply: TipReply }>(
      `/tip-replies/${id}`,
    );
    return data.tipReply;
  } catch (error) {
    toast.add({
      title: t("error"),
      description: getErrorMessage(error),
      color: "red",
    });
  } finally {
    tipReplyModal.pending = false;
  }
};

const handleDeleteClick = (tipReply: TipReply) => {
  modal.open(ConfirmModal, {
    title: t("delete"),
    text: "Are you sure you want to delete this reply?",
    color: "red",
    onConfirm: () => handleDelete(tipReply),
  });
};

const handleDelete = async (tipReply: TipReply) => {
  try {
    await axios.delete(`/tip-replies/${tipReply.id}`);
    refresh();
  } catch (error) {
    toast.add({
      description: getErrorMessage(error),
      color: "red",
    });
  } finally {
  }
};
</script>

<template>
  <PendingView :error="error" :pending="pending && !data">
    <UTable
      v-if="data"
      :rows="data.data"
      :columns="columns"
      class="border border-border rounded-md"
      :ui="{
        td: { base: 'whitespace-normal text-text dark:text-text' },
      }"
    >
      <template #amount-data="{ row }">
        <div class="inline-flex items-start gap-2 flex-wrap">
          <span>
            {{ getComputedPrice(row.payment.amount) }}
          </span>
          <span
            v-if="row.pageTipTier"
            class="text-xs px-1.5 py-0.5 rounded-full ring-1 ring-border"
            :style="{
              background: row.pageTipTier.color,
              color: getForegroundColor(row.pageTipTier.color),
            }"
          >
            {{ row.pageTipTier?.name }}
          </span>
        </div>
      </template>
      <template #paidAt-data="{ row }">
        <div class="flex flex-col text-xs">
          <span class="flex items-center gap-1">
            <span>
              {{ dayjs(row.payment.paidAt).format("L") }}
            </span>
            <UTooltip
              v-if="getDisappearText(row.createdAt)"
              :popper="{ placement: 'top' }"
              :text="getDisappearText(row.createdAt)"
            >
              <UIcon name="i-heroicons-clock" class="text-pale" />
            </UTooltip>
          </span>
          <span>{{ dayjs(row.payment.paidAt).format("LTS") }}</span>
        </div>
      </template>

      <template #name-data="{ row }">
        <div v-if="row.private && !showPrivateNameAndMessage">
          <p class="text-pale">{{ t("private.title") }}</p>
        </div>
        <div v-else class="break-words max-w-[8rem]">
          {{ row.name }}
        </div>
      </template>
      <template #message-data="{ row }">
        <div v-if="row.private && !showPrivateNameAndMessage">
          <p class="text-pale">{{ t("tipPrivateMessage") }}</p>
          <div v-if="row.tipReplies?.[0]" class="flex items-start mt-2 gap-2">
            <div
              :style="replyStyle"
              class="p-1.5 rounded-md text-xs break-words max-w-[20rem] min-w-[8rem] flex-1"
            >
              <p>{{ row.tipReplies?.[0]?.message }}</p>
            </div>
          </div>
        </div>
        <template v-else>
          <div
            class="break-words max-w-[20rem] min-w-[8rem] flex-1"
            v-html="markdownAndSanitize(row?.message)"
          />
          <div
            v-if="row.tipReplies?.[0]"
            :style="replyStyle"
            class="p-1.5 rounded-md text-xs break-words max-w-[20rem] mt-2"
          >
            <p>{{ row.tipReplies?.[0]?.message }}</p>
          </div>
        </template>
      </template>
      <!-- <template #private-data="{ row }">
        <div class="private">
          <UCheckbox
            :disabled="getPrivateDisabled(row.private)"
            :modelValue="row.private"
            @change="updateTipPrivate(row.id, $event)"
          ></UCheckbox>
        </div>
      </template> -->
      <template #action-data="{ row }">
        <div class="flex">
          <div class="grid gap-2 grid-cols-[auto_1fr] items-center">
            <div>
              <span>{{ $t("tipList.obs") }}</span>
            </div>
            <div class="flex">
              <UButton
                v-if="!tipEvents.find(({ tip }) => tip?.id === row.id)"
                variant="ghost"
                @click="handleSendClick(row)"
              >
                {{ t("show") }}
              </UButton>
              <UButton
                v-else
                variant="ghost"
                color="red"
                @click="handleRemoveClick(row)"
              >
                {{ t("hide") }}
              </UButton>
            </div>

            <template v-if="showReply">
              <div class="flex">
                <span> {{ $t("tipList.reply") }} </span>
              </div>
              <div class="flex items-center gap-1">
                <UButton variant="ghost" @click="handleReplyClick(row)">
                  {{ row.tipReplies?.[0] ? $t("edit") : $t("reply") }}
                </UButton>
                <!-- <UButton
                  v-if="row.tipReplies?.[0]"
                  variant="ghost"
                  color="red"
                  square
                  icon="i-heroicons-trash"
                  @click="handleDeleteClick(row.tipReplies[0])"
                ></UButton> -->
              </div>
            </template>

            <span> {{ $t("tipList.private") }} </span>
            <div class="py-1.5 px-2.5">
              <UCheckbox
                :disabled="getPrivateDisabled(row.private)"
                :modelValue="row.private"
                @change="updateTipPrivate(row.id, $event)"
              ></UCheckbox>
            </div>
          </div>
        </div>
      </template>
      <template #reply-data="{ row }"> </template>
      <template #empty-state>
        <NoItems :text="t('noItems')" />
      </template>
    </UTable>

    <TipReplyModal
      v-model="tipReplyModal.active"
      :tip="tipReplyModal.tip"
      :tipReply="tipReplyModal.tipReply"
      :pending="tipReplyModal.pending"
      @update="refresh"
    />
  </PendingView>
</template>

<style scoped></style>
