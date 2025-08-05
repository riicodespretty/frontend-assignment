<template>
  <UNavigationMenu
    highlight
    highlight-color="primary"
    orientation="horizontal"
    :items="items"
    class="border-default px-6 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:border-b data-[orientation=vertical]:w-48"
  />
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import type { NavigationMenuItem } from '@nuxt/ui'
import { ref } from 'vue'

const { logout } = useAuth0()

const items = ref<NavigationMenuItem[][]>([
  [],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      class: 'cursor-pointer',
      onSelect() {
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        })
      },
    },
  ],
])
</script>
