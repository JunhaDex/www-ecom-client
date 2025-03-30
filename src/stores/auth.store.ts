import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/service.type'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = ref<{
      token: string | null
    }>({ token: null })
    const user = ref<User | null>(null)
    const address = ref<{
      addr1: string
      addr2: string
      postalCode: string
    }>()

    function isAuthenticated() {
      return state.value.token !== null
    }

    function setCredential(token: string, userInfo: User) {
      state.value.token = token
      user.value = userInfo
    }

    function invalidate() {
      state.value.token = null
      user.value = null
    }

    return { state, user, address, isAuthenticated, setCredential, invalidate }
  },
  { persist: true },
)
