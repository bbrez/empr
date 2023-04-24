import { defineStore } from 'pinia'
import { api } from '../lib/api'
import { computed } from 'vue'
import CryptoJS from 'crypto-js'
import { useLocalStorage } from '@vueuse/core'

const secret = '321atatab'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = useLocalStorage('token', '', {
    listenToStorageChanges: true,
    serializer: {
      read: (value) => CryptoJS.AES.decrypt(value, secret).toString(CryptoJS.enc.Utf8),
      write: (value) => {
        if (!value) return ''
        return CryptoJS.AES.encrypt(value, secret).toString()
      }
    }
  })

  const userData = useLocalStorage(
    'user',
    {},
    {
      listenToStorageChanges: true,
      serializer: {
        read: (value) =>
          JSON.parse(CryptoJS.AES.decrypt(value, secret).toString(CryptoJS.enc.Utf8)),
        write: (value) => {
          if (!value) return ''
          return CryptoJS.AES.encrypt(JSON.stringify(value), secret).toString()
        }
      }
    }
  )

  const isAuthenticated = computed(() => !!accessToken.value && !!userData.value)

  async function login(email: string, password: string) {
    try {
      const response = await api.user.login({ email, password })
      const { token, user } = response.data

      accessToken.value = token
      userData.value = user

      window.localStorage.setItem('token', CryptoJS.AES.encrypt(token, secret).toString())
      window.localStorage.setItem(
        'user',
        CryptoJS.AES.encrypt(JSON.stringify(user), secret).toString()
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function logout() {
    userData.value = null
    accessToken.value = null
  }

  return {
    accessToken,
    userData,
    isAuthenticated,
    login,
    logout
  }
})

// export const useAuthStore = defineStore({
//         async refreshAccessToken() {
//             try {
//                 const response = api.user.refreshToken()
//             } catch (error) {
//                 console.error(error);
//             }
//         },

//         async setTokens(accessToken: string, refreshToken: string) {
//             this.accessToken = accessToken;
//             this.refreshToken = refreshToken;
//         },

//         async logout() {
//             this.$reset();
//         }
//     },
// });
