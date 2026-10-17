<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div>
    <PageTitle
      :title="$t('changePassword')"
      :description="$t('updateYourLoginPassword')"
    ></PageTitle>
    <ResetPasswordForm />
    <UDivider class="my-10" />
    <LogoutAllSessions />
    <template v-if="authStore.isPremiumOrAdmin">
      <UDivider class="my-10" />
      <PageTitle title="Cohosts" description="Manage your cohosts" />
      <Cohosts />
    </template>
  </div>
</template>

<style scoped></style>
