<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { usePaginationStore } from '@/store/pagination'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useApiUrl } from '@/composables/apiUtils'
import { useClientStore } from '@/store/client'

const paginationStore = usePaginationStore()
const { getCurrentPage, getCurrentPageSize } = storeToRefs(paginationStore)

const apiUrl = computed(() => {
  const url = useApiUrl()
  const [_page, _limit] = [getCurrentPage.value.toString(), getCurrentPageSize.value.toString()]
  const params = new URLSearchParams({ _page, _limit })
  url.search = params.toString()
  return url.toString()
})

const { isFetching, error, data, onFetchResponse } = useFetch(apiUrl, {
  refetch: true,
}).get().json<Client[]>()

const totalItems = ref(getCurrentPage.value)
onFetchResponse((response) => {
  totalItems.value = Number(response.headers.get('X-Total-Count'))
})

const clientStore = useClientStore()
const { getClientsByPage } = storeToRefs(clientStore)
watch(data, (payload) => {
  if (payload) {
    clientStore.addClients(payload)
  }
})

</script>

<template>
  <template v-if="error">
    <UAlert
      title="An unexpected error has occured"
      description="Please try again later"
      icon="i-lucide-triangle-alert"
      color="warning"
    />
  </template>

  <template v-else-if="getClientsByPage.length">
    <ClientTable :loading="isFetching" />
    <UPagination
      :page="getCurrentPage"
      :items-per-page="getCurrentPageSize"
      :total="totalItems"
      class="flex w-full items-center justify-center"
      @update:page="paginationStore.updatePage($event)"
    />
  </template>
</template>
