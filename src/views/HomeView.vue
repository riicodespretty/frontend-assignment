<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { usePaginationStore } from '@/store/pagination'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const paginationStore = usePaginationStore()
const { getPaginationParams, page } = storeToRefs(paginationStore)

const apiUrl = computed(() => {
  const url = new URL(`http://localhost:${import.meta.env.VITE_JSON_SERVER_PORT}/clients`)
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

</script>

<template>
  <div v-if="isFetching">
    loading
  </div>
  <div v-else-if="error">
    error
  </div>
  <template v-else-if="data">
    <ClientTable :data />
    <UPagination
      :page="page"
      :total="totalPages"
      class="flex w-full items-center justify-center"
      @update:page="paginationStore.updatePage($event)"
    />
  </template>
</template>
