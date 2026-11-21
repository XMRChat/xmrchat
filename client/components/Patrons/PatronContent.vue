<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import type {
  MembershipCreateResponse,
  MembershipLevel,
  PatronFormFields,
  PatronMember,
} from "~/types";

const props = defineProps<{
  streamerId: string;
  pageName?: string;
  membershipLevels: MembershipLevel[];
  activeMembers: PatronMember[];
  // Prefill name when the patron already has a membership on this page.
  existingName?: string;
  hasActiveMembership?: boolean;
}>();

const emit = defineEmits<{
  done: [{ created: MembershipCreateResponse; form: PatronFormFields }];
  login: [];
}>();

const { axios } = useApp();
const patronStore = usePatronStore();
const { required, minLength, maxLength, alphanumericSpaces } = useValidations();

interface State {
  form: PatronFormFields;
  loading: boolean;
  errorMessage?: string;
}

const state = reactive<State>({
  form: {
    membershipLevelId: undefined,
    name: undefined,
    email: undefined,
    signal: undefined,
    simplex: undefined,
  },
  loading: false,
  errorMessage: undefined,
});

const v = useVuelidate<State["form"]>(
  {
    membershipLevelId: { required },
    name: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(40),
      alphanumericSpaces,
    },
    email: { maxLength: maxLength(255) },
    signal: { maxLength: maxLength(255) },
    simplex: { maxLength: maxLength(255) },
  },
  toRef(state, "form"),
);

const { getValidationAttrs } = useValidations(v);

watch(
  () => props.existingName,
  (name) => {
    if (name && !state.form.name) state.form.name = name;
  },
  { immediate: true },
);

const handleSubmit = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;
  state.errorMessage = undefined;

  try {
    state.loading = true;
    // Contact fields are only for a new patron. Logged in patrons keep theirs.
    const { data } = await axios.post<MembershipCreateResponse>(
      `/patrons/${props.streamerId}/memberships`,
      {
        membershipLevelId: state.form.membershipLevelId,
        name: state.form.name,
        ...(patronStore.isLoggedIn
          ? {}
          : {
              email: state.form.email || undefined,
              signal: state.form.signal || undefined,
              simplex: state.form.simplex || undefined,
            }),
      },
    );
    emit("done", { created: data, form: { ...state.form } });
  } catch (error) {
    state.errorMessage = getErrorMessage(error);
  } finally {
    state.loading = false;
  }
};

defineExpose({
  reset: () => {
    v.value.$reset();
    state.form = {
      membershipLevelId: undefined,
      name: undefined,
      email: undefined,
      signal: undefined,
      simplex: undefined,
    };
  },
});
</script>

<template>
  <div class="pt-2 md:pt-5 grid gap-10">
    <div>
      <h2 class="text-lg font-medium mb-4">Membership Levels</h2>
      <div class="grid gap-3">
        <div
          v-for="level in membershipLevels"
          :key="level.id"
          :class="[
            'border rounded-md p-4 cursor-pointer flex items-center justify-between flex-wrap gap-2',
            state.form.membershipLevelId === level.id
              ? 'border-primary'
              : 'border-border',
          ]"
          @click="state.form.membershipLevelId = level.id"
        >
          <div class="flex flex-col">
            <span class="font-medium">{{ level.name }}</span>
            <span v-if="level.description" class="text-sm text-pale">
              {{ level.description }}
            </span>
          </div>
          <div class="flex flex-col items-end">
            <span class="font-medium">{{ level.price }} XMR</span>
            <span class="text-sm text-pale">{{ level.duration }} days</span>
          </div>
        </div>
        <NoItems v-if="!membershipLevels.length" />
      </div>
      <p
        v-if="getValidationAttrs('membershipLevelId').error"
        class="text-sm text-red-500 mt-2"
      >
        {{ getValidationAttrs("membershipLevelId").error }}
      </p>
    </div>

    <GeneralForm @submit="handleSubmit">
      <div class="grid gap-6">
        <UFormGroup
          size="lg"
          :label="$t('name')"
          :error="getValidationAttrs('name').error"
          name="name"
          help="Only letters, numbers and spaces. This name will only be usable by you while your membership is active."
        >
          <UInput
            v-model="state.form.name"
            @blur="getValidationAttrs('name').onBlur"
          />
        </UFormGroup>

        <template v-if="!patronStore.isLoggedIn">
          <p>
            Receive messages from {{ pageName }}, welcome message and renewal
            reminder 24 hours before expiration.
          </p>

          <UFormGroup
            size="lg"
            label="Email  (Optional)"
            :error="getValidationAttrs('email').error"
            name="email"
          >
            <UInput
              v-model="state.form.email"
              @blur="getValidationAttrs('email').onBlur"
            />
          </UFormGroup>

          <UFormGroup
            size="lg"
            label="Signal (Optional)"
            :error="getValidationAttrs('signal').error"
            name="signal"
          >
            <UInput
              v-model="state.form.signal"
              @blur="getValidationAttrs('signal').onBlur"
            />
          </UFormGroup>

          <UFormGroup
            size="lg"
            label="SimpleX URL (Optional)"
            :error="getValidationAttrs('simplex').error"
            name="simplex"
          >
            <UInput
              v-model="state.form.simplex"
              @blur="getValidationAttrs('simplex').onBlur"
            />
          </UFormGroup>
        </template>

        <div v-if="state.errorMessage">
          <UAlert
            color="red"
            :description="state.errorMessage"
            title="Failed to start membership"
          >
          </UAlert>
        </div>

        <div class="flex gap-2">
          <UButton
            size="lg"
            type="submit"
            :loading="state.loading"
            class="flex items-center gap-2 w-fit"
          >
            {{
              hasActiveMembership ? "Renew membership" : "Become a Patron"
            }}
          </UButton>
          <UButton
            v-if="!patronStore.isLoggedIn"
            size="lg"
            variant="soft"
            @click="emit('login')"
          >
            Patron login
          </UButton>
        </div>
      </div>
    </GeneralForm>

    <PatronActiveMembers :members="activeMembers" />
  </div>
</template>

<style scoped></style>
