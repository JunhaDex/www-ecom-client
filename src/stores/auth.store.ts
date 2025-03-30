import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/service.type'
import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_SERIALIZE_KEY
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
  {
    persist: {
      key: 'auth',
      storage: localStorage,
      serializer: {
        serialize: (state) => {
          const jsonStr = JSON.stringify(state)
          return CryptoJS.AES.encrypt(jsonStr, SECRET_KEY).toString()
        },
        deserialize: (state) => {
          const decrypted = CryptoJS.AES.decrypt(state, SECRET_KEY).toString(CryptoJS.enc.Utf8)
          return JSON.parse(decrypted)
        },
      },
    },
  },
)
