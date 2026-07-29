<script lang="ts" setup>
import { ConfirmModal } from "#components";
import useVuelidate from "@vuelidate/core";
import type { Tip, TipReply } from "~/types";

const props = defineProps<{
  tip?: Tip;
  tipReply?: TipReply;
  pending?: boolean;
}>();

const emit = defineEmits<{
  update: [];
}>();

const model = defineModel<boolean>();

const state = reactive<{
  message?: string;
  loading: boolean;
  loadingDelete: boolean;
  deleteModal: boolean;
}>({
  message: undefined,
  loading: false,
  loadingDelete: false,
  deleteModal: false,
});

const { axios } = useApp();
const toast = useToast();
const { required, maxLength } = useValidations();

const handleSubmit = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;

  state.loading = true;
  const tipReplyId = props.tipReply?.id;
  try {
    tipReplyId
      ? await axios.put(`/tip-replies/${tipReplyId}`, {
          message: state.message,
        })
      : await axios.post(`/tip-replies/${props.tip?.id}`, {
          message: state.message,
        });

    toast.add({
      description: "Reply sent successfully",
      color: "green",
    });
    emit("update");
    model.value = false;
  } catch (error) {
    toast.add({
      description: getErrorMessage(error),
      color: "red",
    });
  } finally {
    state.loading = false;
  }
};

const handleDeleteClick = () => {
  state.deleteModal = true;
};

const handleDelete = async () => {
  state.deleteModal = false;
  state.loadingDelete = true;
  try {
    const tipReplyId = props.tipReply?.id;
    console.log(props.tipReply);

    await axios.delete(`/tip-replies/${tipReplyId}`);
    emit("update");
  } catch (error) {
    toast.add({
      description: getErrorMessage(error),
      color: "red",
    });
  } finally {
    model.value = false;
    state.loadingDelete = false;
  }
};

const reset = () => {
  v.value.$reset();
  state.message = undefined;
};

const TIP_REPLY_MAX_LENGTH = 1000;

const v = useVuelidate<any>(
  {
    message: { required, maxLength: maxLength(TIP_REPLY_MAX_LENGTH) },
  },
  computed(() => state),
);

const { getValidationAttrs } = useValidations(v);

const messageLength = computed(() => state.message?.length || 0);

watch(model, (v) => {
  if (v) reset();
});
watch(
  () => props.tipReply,
  (v) => {
    if (v) state.message = v.message;
  },
);
</script>

<template>
  <UModal v-model="model" :ui="{ container: 'items-center' }">
    <UCard>
      <template #header>
        <h2 class="text-lg font-medium">{{ $t("reply") }}</h2>
      </template>

      <div class="text-sm">
        <span class="text-pale">{{ $t("tipList.replyToTip") }}</span>
        <span>{{ tip?.name }}</span>
      </div>

      <div class="text-sm mt-2">
        <span class="text-pale">{{ $t("tipList.message") }} </span>
        <span>{{ tip?.message }}</span>
      </div>

      <UFormGroup
        class="mt-4"
        name="message"
        label="Reply message"
        :error="getValidationAttrs('message').error"
        :hint="`${messageLength} / ${TIP_REPLY_MAX_LENGTH}`"
      >
        <UTextarea
          v-model="state.message"
          autoresize
          @blur="getValidationAttrs('message').onBlur"
        />
      </UFormGroup>

      <template #footer>
        <div class="flex justify-between">
          <div>
            <UButton
              v-if="tipReply?.id"
              variant="ghost"
              color="red"
              :loading="state.loadingDelete"
              @click="handleDeleteClick"
            >
              {{ $t("delete") }}
            </UButton>
          </div>
          <div class="flex gap-2">
            <UButton variant="ghost" @click="model = false">
              {{ $t("cancel") }}
            </UButton>
            <UButton :loading="state.loading" @click="handleSubmit">
              {{ $t("save") }}
            </UButton>
          </div>
        </div>
      </template>
    </UCard>

    <ConfirmModal
      v-model="state.deleteModal"
      :title="$t('delete')"
      text="Are you sure you want to delete this reply?"
      color="red"
      @confirm="handleDelete()"
      @close="state.deleteModal = false"
    />
  </UModal>
</template>

<style scoped></style>
