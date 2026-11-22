<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import type { Patron } from "~/types";

const props = defineProps<{
  patron?: Patron;
}>();

const emit = defineEmits<{
  logout: [];
}>();

const { updateContacts } = usePatronStore();
const { maxLength } = useValidations();
const toast = useToast();

const isActive = (status: string) => status === "active";

const destinationOf = (channel: string) =>
  props.patron?.contacts?.find((c) => c.channel === channel)?.destination ||
  "";

const state = reactive({
  form: {
    email: destinationOf("email"),
    signal: destinationOf("signal"),
    simplex: destinationOf("simplex"),
  },
  loading: false,
});

watch(
  () => props.patron?.contacts,
  () => {
    state.form.email = destinationOf("email");
    state.form.signal = destinationOf("signal");
    state.form.simplex = destinationOf("simplex");
  },
);

const v = useVuelidate(
  {
    email: { maxLength: maxLength(255) },
    signal: { maxLength: maxLength(255) },
    simplex: { maxLength: maxLength(255) },
  },
  state.form,
);

const { getValidationAttrs } = useValidations(v);

const handleUpdateContacts = async () => {
  const valid = await v.value.$validate();
  if (!valid) return;

  try {
    state.loading = true;
    await updateContacts({
      email: state.form.email || undefined,
      signal: state.form.signal || undefined,
      simplex: state.form.simplex || undefined,
    });
    toast.add({
      description: "Contact information updated.",
      color: "green",
    });
  } catch (error) {
    toast.add({ description: getErrorMessage(error), color: "red" });
  } finally {
    state.loading = false;
  }
};
</script>

<template>
  <div>
    <PageTitle
      title="Patron account"
      description="View your memberships across pages and your contact information."
    />

    <div class="flex justify-end mb-10">
      <UButton variant="soft" color="gray" @click="emit('logout')">
        Log out
      </UButton>
    </div>

    <div class="flex flex-col gap-16">
      <div>
        <h2 class="text-lg font-medium">Memberships</h2>
        <p class="text-sm text-pale mb-4">
          All pages you have joined as a Patron.
        </p>

        <NoItems v-if="!patron?.memberships?.length" />

        <div v-else class="grid gap-4">
          <div
            v-for="m in patron?.memberships"
            :key="m.id"
            class="flex items-center justify-between flex-wrap gap-2 text-sm"
          >
            <div class="flex flex-col">
              <span class="font-medium">{{
                m.page?.name || m.page?.path
              }}</span>
              <span>{{ m.name }}</span>
              <span class="text-pale">{{ m.membershipLevel?.name }}</span>
            </div>
            <div class="flex flex-col items-end gap-1">
              <UBadge
                :color="isActive(m.status) ? 'primary' : 'gray'"
                variant="subtle"
              >
                {{ isActive(m.status) ? "Active" : "Inactive" }}
              </UBadge>
              <span class="text-pale">
                {{ isActive(m.status) ? "Expires" : "Ended" }}
                {{ new Date(m.durationEnd).toLocaleString() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-lg font-medium">Contacts</h2>
        <p class="text-sm text-pale mb-4">
          How creators can reach you about your memberships.
        </p>

        <div class="grid gap-4 max-w-xl">
          <UFormGroup
            label="Email (Optional)"
            :error="getValidationAttrs('email').error"
          >
            <UInput
              v-model="state.form.email"
              @blur="getValidationAttrs('email').onBlur"
            />
          </UFormGroup>

          <UFormGroup
            label="Signal (Optional)"
            :error="getValidationAttrs('signal').error"
          >
            <UInput
              v-model="state.form.signal"
              @blur="getValidationAttrs('signal').onBlur"
            />
          </UFormGroup>

          <UFormGroup
            label="SimpleX URL (Optional)"
            :error="getValidationAttrs('simplex').error"
          >
            <UInput
              v-model="state.form.simplex"
              @blur="getValidationAttrs('simplex').onBlur"
            />
          </UFormGroup>

          <div>
            <UButton :loading="state.loading" @click="handleUpdateContacts">
              Update contacts
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
