<script setup lang="ts">
import { ConfirmModal } from "#components";

const authStore = useAuthStore();
const toast = useToast();
const modal = useModal();
const loading = ref(false);

const handleLogout = async () => {
  try {
    loading.value = true;
    await authStore.logoutAll();
    toast.add({
      description: "Other sessions have been logged out.",
      color: "green",
    });
  } catch (error) {
    toast.add({
      description: getErrorMessage(error),
      color: "red",
    });
  } finally {
    loading.value = false;
  }
};

const handleClick = () => {
  modal.open(ConfirmModal, {
    title: "Logout of all sessions",
    text: "This will log you out on every other device. This session stays signed in.",
    color: "red",
    onConfirm: () => handleLogout(),
  });
};
</script>

<template>
  <div>
    <PageTitle
      title="Logout of all sessions"
      description="Logout of all devices"
    />

    <div class="flex flex-col items-center gap-2">
      <p class="text-center">
        Click the button below to log out every other session. This device stays
        signed in.
      </p>
      <div>
        <UButton color="red" :loading="loading" @click="handleClick">
          Logout
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
