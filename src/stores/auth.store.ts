import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const state = ref<{
    token: string | null
  }>({ token: 'asdf' })

  function isAuthenticated() {
    return state.value.token !== null
  }

  return { state, isAuthenticated }
})
