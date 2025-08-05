<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { usePaginationStore } from '@/store/pagination'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useApiUrl } from '@/composables/useApiUrl'
import { useClientStore } from '@/store/client'

const paginationStore = usePaginationStore()
const { getPaginationParams, page } = storeToRefs(paginationStore)

const apiUrl = computed(() => {
  const url = useApiUrl()
  const { page: _page, per_page: _per_page } = getPaginationParams.value
  const params = new URLSearchParams({ _page, _per_page })
  url.search = params.toString()
  return url.toString()
})

const totalPages = ref(page.value)
const { isFetching, error, data, onFetchResponse } = useFetch(apiUrl, {
  refetch: true,
}).get().json<Client[]>()

onFetchResponse((response) => {
  totalPages.value = Number(response.headers.get('X-Total-Count'))
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
  <div v-if="error">
    error
  </div>
  <template v-else-if="getClientsByPage.length">
    <ClientTable :loading="isFetching" />
    <UPagination
      :page="page"
      :total="totalPages"
      class="flex w-full items-center justify-center"
      @update:page="paginationStore.updatePage($event)"
    />
  </template>
</template>
