<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { ConfirmModal } from "#components";
import type { PatronMessage } from "~/types";
import { PatronMessageStatus } from "~/types/enums";

interface State {
  form: {
    body?: string;
    sendDatetime?: string;
  };
  loading: boolean;
  deletingId: number | null;
}

const { required, maxLength } = useValidations();
const { axios } = useApp();
const { dayjs } = useDate();
const toast = useToast();
const modal = useModal();

const state: State = reactive({
  form: {
    body: undefined,
    sendDatetime: undefined,
  },
  loading: false,
  deletingId: null,
});

const {
  data: messages,
  pending,
  refresh,
} = useLazyAsyncData(
  "streamer-patron-messages",
  async () => {
    const { data } = await axios.get<{ messages: PatronMessage[] }>(
      `/patrons/messages`,
    );
    return data.messages;
  },
  { server: false },
);

const toIsoString = (value?: string) => {
  if (!value) return undefined;
  const date = dayjs(value);
  if (!date.isValid()) return undefined;
  return date.toISOString();
};

const v = useVuelidate<any>(
  {
    body: { required, maxLength: maxLength(500) },
  },
  computed(() => state.form),
);

const { getValidationAttrs } = useValidations(v);

const handleSubmit = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;

  state.loading = true;
  try {
    await axios.post(`/patrons/messages`, {
      body: state.form.body,
      sendDatetime: toIsoString(state.form.sendDatetime),
    });
    toast.add({
      description: "Message created.",
      color: "green",
    });
    state.form.body = undefined;
    state.form.sendDatetime = undefined;
    v.value.$reset();
    await refresh();
  } catch (error) {
    toast.add({
      description: getErrorMessage(error),
      color: "red",
    });
  } finally {
    state.loading = false;
  }
};

const handleDeleteClick = (message: PatronMessage) => {
  modal.open(ConfirmModal, {
    title: "Delete message",
    text: "Are you sure you want to delete this message?",
    color: "red",
    onConfirm: () => handleDelete(message.id),
  });
};

const handleDelete = async (id: number) => {
  state.deletingId = id;
  try {
    await axios.delete(`/patrons/messages/${id}`);
    toast.add({
      description: "Message deleted.",
      color: "green",
    });
    await refresh();
  } catch (error) {
    toast.add({
      description: getErrorMessage(error),
      color: "red",
    });
  } finally {
    state.deletingId = null;
  }
};

const levelsLabel = (message: PatronMessage) => {
  if (!message.membershipLevels?.length) return "All levels";
  return message.membershipLevels.map((level) => level.name).join(", ");
};

const statusLabel = (status: PatronMessageStatus) => {
  if (status === PatronMessageStatus.SENT) return "Sent";
  return "Scheduled";
};

const columns = [
  { key: "body", label: "Message" },
  { key: "sendDatetime", label: "Send at" },
  { key: "status", label: "Status" },
  { key: "membershipLevels", label: "Levels" },
  { key: "actions" },
];
</script>

<template>
  <div>
    <h2 class="text-lg font-medium mb-2">Messages</h2>
    <p class="text-sm text-pale mb-4">
      Patrons that signed up with SimpleX, Signal, or email will receive your
      message.
    </p>

    <GeneralForm @submit="handleSubmit">
      <div class="flex flex-col gap-4 max-w-[600px]">
        <UFormGroup
          label="Message"
          :error="getValidationAttrs('body').error"
          :hint="`${state.form.body?.length || 0}/500`"
        >
          <UTextarea
            v-model="state.form.body"
            :maxlength="500"
            :rows="4"
            @blur="getValidationAttrs('body').onBlur"
          />
        </UFormGroup>

        <UFormGroup label="Send at">
          <template #hint>
            <span class="text-xs">Leave empty to send now</span>
          </template>
          <UInput v-model="state.form.sendDatetime" type="datetime-local" />
        </UFormGroup>

        <div>
          <UButton type="submit" :loading="state.loading">Send</UButton>
        </div>
      </div>
    </GeneralForm>

    <h3 class="text-base font-medium mt-10 mb-4">Previous messages</h3>
    <UProgress
      v-if="pending"
      animation="carousel"
      class="max-w-[280px] m-auto mb-4"
    />
    <UTable
      :rows="messages || []"
      :columns="columns"
      class="border border-border rounded-md"
      :ui="{
        td: { base: 'whitespace-normal text-text dark:text-text' },
      }"
    >
      <template #sendDatetime-data="{ row }">
        <span>{{ new Date(row.sendDatetime).toLocaleString() }}</span>
      </template>
      <template #status-data="{ row }">
        <span>{{ statusLabel(row.status) }}</span>
      </template>
      <template #membershipLevels-data="{ row }">
        <span>{{ levelsLabel(row) }}</span>
      </template>
      <template #actions-data="{ row }">
        <div class="flex justify-end">
          <UButton
            variant="ghost"
            color="red"
            :loading="state.deletingId === row.id"
            @click="handleDeleteClick(row)"
          >
            {{ $t("delete") }}
          </UButton>
        </div>
      </template>
      <template #empty-state>
        <NoItems />
      </template>
    </UTable>
  </div>
</template>
