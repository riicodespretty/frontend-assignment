import { defineStore } from 'pinia'

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    page: 1,
    per_page: 10,
  }),

  getters: {
    getPaginationParams: state => ({ page: state.page.toString(), per_page: state.per_page.toString() }),
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
