<script lang="ts" setup>
import type { TipReplySettings } from "~/types";

const emit = defineEmits<{
  update: [];
}>();

const modalOpen = ref(false);

const { axios } = useApp();
const toast = useToast();

interface State {
  form: TipReplySettings;
  loading: boolean;
  loadingSave: boolean;
}

const state = reactive<State>({
  form: {
    backgroundColor: undefined,
    textColor: undefined,
  },
  loading: false,
  loadingSave: false,
});

const loadSettings = async () => {
  try {
    state.loading = true;
    const { data } = await axios.get<{ settings: TipReplySettings }>(
      "/tip-replies/settings",
    );
    state.form.backgroundColor = data.settings.backgroundColor;
    state.form.textColor = data.settings.textColor;
  } catch (error) {
    toast.add({ description: getErrorMessage(error), color: "red" });
  } finally {
    state.loading = false;
  }
};

const handleSubmit = async () => {
  try {
    state.loadingSave = true;
    await axios.put("/tip-replies/settings", state.form);
    emit("update");
    toast.add({ description: "Reply settings updated", color: "green" });
    modalOpen.value = false;
  } catch (error) {
    toast.add({ description: getErrorMessage(error), color: "red" });
  } finally {
    state.loadingSave = false;
  }
};

watch(modalOpen, (open) => {
  if (open) loadSettings();
});
</script>

<template>
  <div>
    <UButton variant="ghost" @click="modalOpen = true">{{
      $t("replyColors")
    }}</UButton>

    <UModal v-model="modalOpen">
      <UCard>
        <template #header>
          <h2 class="text-lg font-medium">
            {{ $t("replyColors") }}
          </h2>
        </template>

        <div class="grid gap-4">
          <div class="flex gap-2">
            <UFormGroup
              :label="$t('backgroundColor')"
              name="backgroundColor"
              class="flex-1"
            >
              <UInput v-model="state.form.backgroundColor" type="color" />
            </UFormGroup>
            <UFormGroup
              :label="$t('textColor')"
              name="textColor"
              class="flex-1"
            >
              <UInput v-model="state.form.textColor" type="color" />
            </UFormGroup>
          </div>
          <div
            class="mt-1 rounded-md p-2"
            :style="{
              backgroundColor:
                state.form.backgroundColor || tipReplyStyle().backgroundColor,
              color: state.form.textColor || tipReplyStyle().color,
            }"
          >
            {{ $t("repliedMessagePreview") }}
          </div>
        </div>

        <template #footer>
          <div class="flex gap-2 justify-end">
            <UButton variant="ghost" @click="modalOpen = false">
              {{ $t("cancel") }}
            </UButton>
            <UButton
              :loading="state.loadingSave"
              :disabled="state.loading"
              @click="handleSubmit"
            >
              {{ $t("save") }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<style scoped></style>
