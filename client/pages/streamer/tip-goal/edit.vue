<script setup lang="ts"></script>

<template>
  <div>
    <PageTitle
      :title="$t('editTipGoal')"
      :description="$t('editTipGoalDetails')"
    />
    <TipGoalModifyForm editable />
  </div>
</template>

<style scoped></style>
