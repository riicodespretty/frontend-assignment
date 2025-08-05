import { defineStore } from 'pinia'
import { usePaginationStore } from '@/store/pagination'

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: Array<Client>(),
  }),

  getters: {
    getClientsByPage: (state) => {
      const paginationStore = usePaginationStore()
      const { page, per_page } = paginationStore

      const start = (page - 1) * per_page
      const end = start + per_page

      return state.clients.slice(start, end)
    },

    getClientById: (state) => {
      return (id: string) => state.clients.find(client => client.id === id)
    },
  },

  actions: {
    addClients(payload: Client[]) {
      const existingIds = new Set(this.clients.map(client => client.id))

      for (const client of payload) {
        if (!existingIds.has(client.id)) {
          this.clients.push(client)
          existingIds.add(client.id)
        }
      }
    },

    updateClientById(payload: Client) {
      const index = this.clients.findIndex(client => client.id === payload.id)
      if (index === -1) return

      const record = this.clients[index]
      Object.assign(record, payload)
    },

    deleteClientById(id: string) {
      const index = this.clients.findIndex(client => client.id === id)
      if (index === -1) return

      this.clients.splice(index, 1)
    },
  },
})
