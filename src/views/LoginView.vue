<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isAuthenticated, loginWithRedirect, checkSession } = useAuth0()

watchEffect(async () => {
  await checkSession()

  if (!isAuthenticated.value) {
    loginWithRedirect()
  }
  else {
    router.push({ name: 'Home' })
  }
})

</script>
