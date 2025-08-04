import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import { useAuth0 } from '@auth0/auth0-vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/home', name: 'Home', component: Home },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const { checkSession, isAuthenticated } = useAuth0()
  await checkSession()

  if (
    // make sure the user is authenticated
    !isAuthenticated.value
    // ❗️ Avoid an infinite redirect
    && to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})

export default router
