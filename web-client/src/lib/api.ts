import axios from 'axios'
import type { User } from './model/user'
import { useAuthStore } from '@/stores/authStore'

type UserPayload = Pick<User, 'email' | 'password'>

const api_client = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

api_client.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.accessToken

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export const api = {
  user: {
    async register(user: UserPayload) {
      return api_client.post('/users/register', user)
    },

    async login(user: UserPayload) {
      return api_client.post('/users/login', user)
    }
  },

  admin: {
    async info() {
      return api_client.get('/admin/info');
    },

    async users() {
      return api_client.get('/admin/users');
    }
  }
}
