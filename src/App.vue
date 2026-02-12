<template>
  <div id="app">
    <header style="padding:20px;background:rgb(191, 186, 236);display:none;border-radius: 5px;width:40%;justify-content:space-between;align-items:center;">
      <div><strong>Vehicle Counter</strong></div>
      <div v-if="isLoggedIn">
        <span style="margin-right:8px">Hi, {{ currentUser?.name || 'User' }}</span>
        <button @click="logout">Logout</button>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()
    const isLoggedIn = ref(false)
    const currentUser = ref<any>(null)

    const checkAuth = () => {
      const user = localStorage.getItem('currentUser')
      if (user) {
        isLoggedIn.value = true
        try {
          currentUser.value = JSON.parse(user)
        } catch {
          currentUser.value = user
        }
      } else {
        isLoggedIn.value = false
        currentUser.value = null
      }
    }

    const logout = () => {
      localStorage.removeItem('currentUser')
      isLoggedIn.value = false
      currentUser.value = null
      router.push('/')
    }

    onMounted(checkAuth)

    provide('isLoggedIn', isLoggedIn)
    provide('currentUser', currentUser)
    provide('checkAuth', checkAuth)
    provide('logout', logout)

    return { isLoggedIn, currentUser, checkAuth, logout }
  },
})
</script>

<style>
/* global styles if needed */
.VehicleCounter {font-family: Arial, sans-serif; color: #333;}
</style>