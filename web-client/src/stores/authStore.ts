import { defineStore } from 'pinia';
import { api } from '../lib/api';
import { User } from '@/lib/model/user';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);

  const isAuthenticated = computed(() => !!accessToken.value);

  async function login(email: string, password: string) {
    try {
      const response = await api.user.login({ email, password });
      const { accessToken, refreshToken } = response.data;

      accessToken.value = accessToken;
      refreshToken.value = refreshToken;
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshAccessToken() {
    if (!refreshToken.value) return;

    try {
      const response = await api.user.refreshToken(
        refreshToken.value
      );

      const { newAccessToken } = response.data;
      accessToken.value = newAccessToken;
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    accessToken.value = null;
    refreshToken.value = null;
  }

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    refreshAccessToken,
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