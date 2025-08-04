<template>
  <UTable
    :data
    :columns
    :column-visibility
    :sorting
  />
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { h, resolveComponent } from 'vue'
import type { Row, SortingState, VisibilityState } from '@tanstack/table-core'
import ClientModal from './ClientModal.vue'

defineProps<{ data: Client[] }>()

const UAvatar = resolveComponent('UAvatar')
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const columnVisibility: VisibilityState = {
  currency: false,
  registered: false,
}
const sorting: SortingState = [
  {
    id: 'registered',
    desc: true,
  },
]

const columns: TableColumn<Client>[] = [
  {
    accessorKey: 'picture',
    header: '',
    cell: ({ row }) => {
      return h(UAvatar, { src: row.getValue('picture'), alt: row.getValue('name'), size: 'xl' })
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'registered',
    header: 'Registered',
  },
  {
    accessorKey: 'subscriptionCost',
    header: 'Subscription Cost',
    cell: ({ row }) => {
      const n = Number(row.getValue('subscriptionCost'))
      const color = n >= 2_000
        ? 'success'
        : n >= 1_000
          ? 'info'
          : 'neutral'

      return h(UBadge, { color, variant: 'subtle' }, () =>
        new Intl.NumberFormat(undefined,
          {
            style: 'currency',
            currency: row.getValue('currency'),
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(n),
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            'content': {
              align: 'end',
            },
            'items': getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'color': 'neutral',
              'variant': 'ghost',
              'class': 'ml-auto cursor-pointer',
              'aria-label': 'Actions dropdown',
            }),
        ),
      )
    },
  },
]

function getRowItems(row: Row<Client>) {
  return [
    {
      label: 'View details',
      icon: 'i-lucide-user',
      onSelect() {
        showModal(row.original)
      },
      class: 'cursor-pointer',
    },
    {
      type: 'separator',
    },
    {
      label: 'Delete data',
      color: 'error',
      icon: 'i-lucide-trash-2',
      class: 'cursor-pointer',
    },
  ]
}

function showModal(client: Client) {
  const overlay = useOverlay()

  const modal = overlay.create(h(ClientModal, { client }))
  modal.open()
}
</script>
