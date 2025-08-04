<template>
  <UModal
    title="Client Information"
    description="View or update client information"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        :disabled="!edit"
        @submit="onSubmit"
      >
        <UFormField
          label="Name"
          name="name"
          required
        >
          <UInput
            v-model="state.name"
            class="w-full"
            :variant
          />
        </UFormField>

        <UFormField
          label="Gender"
          name="gender"
          required
        >
          <UInputMenu
            v-model="state.gender"
            :items="genders"
            class="w-full"
            :variant
          />
        </UFormField>

        <UFormField
          label="Company"
          name="company"
          required
        >
          <UInput
            v-model="state.company"
            class="w-full"
            :variant
          />
        </UFormField>

        <UFormField
          label="Age"
          name="age"
          required
        >
          <UInputNumber
            v-model="state.age"
            :min="18"
            class="w-full"
            :variant
          />
        </UFormField>

        <UFormField
          label="Picture"
          name="picture"
          required
        >
          <UInput
            v-model="state.picture"
            class="w-full"
            :variant
          />
        </UFormField>

        <UFormField
          label="Currency"
          name="currency"
          required
        >
          <UInputMenu
            v-model="state.currency"
            :items="currencies"
            class="w-full"
            :variant
          />
        </UFormField>

        <UFormField
          label="Subscription Cost"
          name="subscriptionCost"
          required
        >
          <UInputNumber
            v-model.number="(state.subscriptionCost as unknown as number)"
            orientation="vertical"
            :format-options="{
              style: 'currency',
              currency: state.currency,
              currencyDisplay: 'narrowSymbol',
              currencySign: 'accounting'
            }"
            class="w-full"
            :variant
          />
        </UFormField>

        <div
          class="mt-8 flex w-full"
          :class="[edit ? 'justify-end' : 'justify-start']"
        >
          <UButton
            v-if="!edit"
            class="cursor-pointer"
            color="info"
            @click="edit = !edit"
          >
            Edit
          </UButton>

          <UButton
            v-else
            type="submit"
            class="cursor-pointer"
          >
            Submit
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { computed, ref, toRefs } from 'vue'
import { toReactive } from '@vueuse/core'

const props = defineProps<{ title?: string, description?: string, client: Client }>()
const { client } = toRefs(props)
const state = toReactive(client)

const currencies = ['USD', 'INR', 'JPY', 'CAD', 'SGD'] // Intl.supportedValuesOf('currency')
const genders = ['male', 'female', 'non-binary']
const schema = z.object({
  name: z.string().min(1, 'Must not be empty'),
  gender: z.enum(genders),
  company: z.string().min(1, 'Must not be empty'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  picture: z.url(),
  currency: z.enum(currencies),
  subscriptionCost: z.coerce.number().nonnegative(),
})

type Schema = z.output<typeof schema>

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'Information has been updated for client: ' + client.value.name, color: 'success' })
  console.log(event.data)
}

const edit = ref(false)
const variant = computed(() => !edit.value ? 'subtle' : 'outline')
</script>
