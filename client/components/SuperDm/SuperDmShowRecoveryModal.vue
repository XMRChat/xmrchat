<script setup lang="ts">
import type { SavedViewerSuperDmKeys } from "~/types";

const props = defineProps<{
  pagePath?: string;
  superDmId?: string;
}>();
const model = defineModel<boolean>();

const { getViewerSavedKey } = useSuperDm();

const savedKey = ref<SavedViewerSuperDmKeys | undefined>(undefined);

const getSavedkeys = async () => {
  if (!props.pagePath || !props.superDmId) return;
  const keys = await getViewerSavedKey({
    pagePath: props.pagePath,
    superDmId: props.superDmId,
  });
  savedKey.value = keys;
};

const handleHide = () => {
  model.value = false;
};

watch(model, () => {
  if (model.value) {
    getSavedkeys();
  }
});
</script>

<template>
  <UModal v-model="model">
    <UCard>
      <template #header>
        <h2 class="text-lg font-medium">
          {{ $t("superDMRecoveryCodesTitle") }}
        </h2>
      </template>
      <div class="grid gap-2">
        <p>
          {{ $t("superDMRecoveryCodesDes") }}
        </p>

        <UFormGroup label="SuperDM id">
          <CopyInput :text="superDmId" :showIcon="false" buttonVariant="soft" />
        </UFormGroup>

        <UFormGroup label="Recovery code">
          <CopyInput
            :text="savedKey?.mnemonic"
            :showIcon="false"
            buttonVariant="soft"
          />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex gap-2 justify-end">
          <UButton variant="ghost" @click="handleHide">{{
            $t("close")
          }}</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped></style>
