import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '@/views/HomeView.vue'

const routes = [
  { path: '/home', name: 'Home', component: Home },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
