import { defineStore } from 'pinia'

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    page: 1,
    per_page: 10,
  }),

  getters: {
    getCurrentPage: state => state.page,
    getCurrentPageSize: state => state.per_page,
  },

  actions: {
    updatePage(n: number) {
      this.page = n
    },

    next() {
      ++this.page
    },

    previous() {
      this.page = Math.min(0, this.page - 1)
    },
  },
})
