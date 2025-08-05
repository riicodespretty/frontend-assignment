<template>
  <UModal
    :title
    :description
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        :validate
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
            :min="1"
            :variant
          />
        </UFormField>

        <div
          class="mt-8 flex w-full"
          :class="[editState ? 'justify-end' : 'justify-start']"
        >
          <UButton
            v-if="!editState"
            class="cursor-pointer"
            color="info"
            @click="editState = !editState"
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
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { computed, ref, toRefs } from 'vue'
import { toReactive } from '@vueuse/core'

export interface ClientModalProps {
  title?: string
  description?: string
  client?: Partial<Client>
  edit?: boolean
}

const props = withDefaults(defineProps<ClientModalProps>(), {
  title: 'Client Information',
  description: 'View or update client information',
  client: () => ({ currency: 'USD' }),
  edit: false,
})
const { edit, client, title, description } = toRefs(props)
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

const validate = (state: Partial<{
  name: string
  gender: string
  company: string
  age: number
  picture: string
  currency: string
  subscriptionCost: unknown
}>): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ name: 'name', message: 'Must not be empty' })
  if (!state.gender) errors.push({ name: 'gender', message: 'Must not be empty' })
  if (!state.company) errors.push({ name: 'company', message: 'Must not be empty' })
  if (!state.age) errors.push({ name: 'age', message: 'Must be at least 18 years old' })
  if (!state.picture) errors.push({ name: 'picture', message: 'Must not be empty' })
  if (!state.currency) errors.push({ name: 'currency', message: 'Must be a valid currency' })
  if (!state.subscriptionCost) errors.push({ name: 'subscriptionCost', message: 'Must be a positive amount' })
  return errors
}

const emit = defineEmits<{
  submit: [data: Schema]
}>()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('submit', event.data)
}

const editState = ref(edit.value)
const variant = computed(() => !editState.value ? 'subtle' : 'outline')
</script>
