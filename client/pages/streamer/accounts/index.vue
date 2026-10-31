<template>
  <div>
    <PageTitle
      :title="$t('changePassword')"
      :description="$t('updateYourLoginPassword')"
    ></PageTitle>
    <ResetPasswordForm />
    <UDivider class="my-10" />
    <LogoutAllSessions />
    <UDivider class="my-10" />
    <PageTitle title="Cohosts" description="Manage your cohosts" />
    <Cohosts />
  </div>
</template>

<style scoped></style>
