<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import type { Patron } from "~/types";
import { PatronMembershipStatus } from "~/types/enums";

const props = defineProps<{
  patron?: Patron;
}>();

const emit = defineEmits<{
  logout: [];
}>();

const { updateContacts } = usePatronStore();
const { getPatronMembershipStatus } = useConstants();
const { dayjs } = useDate();
const { toStreamer } = useRouteLocation();
const { maxLength } = useValidations();
const toast = useToast();

const isActive = (status: string) => status === PatronMembershipStatus.ACTIVE;

const destinationOf = (channel: string) =>
  props.patron?.contacts?.find((c) => c.channel === channel)?.destination || "";

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
      <UButton variant="soft" color="red" @click="emit('logout')">
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
          <UCard
            v-for="m in patron?.memberships"
            :ui="{ body: { padding: 'p-4 sm:p-4' } }"
          >
            <div class="flex justify-between flex-wrap gap-2 w-full">
              <div class="flex items-center gap-3">
                <GeneralImage
                  :url="m.page?.logo?.thumbnail || m.page?.logo?.url"
                  variant="logo"
                  class="w-12 h-12"
                />
                <div class="flex flex-col">
                  <UButton
                    :to="toStreamer(m.page?.path)"
                    variant="link"
                    class="font-medium"
                    :padded="false"
                  >
                    {{ m.page?.name || m.page?.path }}
                  </UButton>
                  <span>Patron name: {{ m.name }}</span>
                  <span class="text-pale">{{ m.membershipLevel?.name }}</span>
                </div>
              </div>
              <div class="flex ms-auto">
                <div class="flex flex-col items-end gap-1">
                  <UBadge
                    :color="getPatronMembershipStatus(m.status)?.color as any"
                    variant="subtle"
                  >
                    {{ getPatronMembershipStatus(m.status)?.label || m.status }}
                  </UBadge>
                  <div class="text-pale mt-auto">
                    {{ isActive(m.status) ? "Expires" : "Ended" }}
                    {{ dayjs(m.durationEnd).format("L LT") }}
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <div>
        <h2 class="text-lg font-medium">Contacts</h2>
        <p class="text-sm text-pale mb-4">
          How creators can reach you about your memberships.
        </p>

        <div class="">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>

          <div class="mt-4">
            <UButton :loading="state.loading" @click="handleUpdateContacts">
              Update contacts
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
