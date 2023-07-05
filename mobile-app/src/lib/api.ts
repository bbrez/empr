import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const prod = true;
const api_url = prod ? 'https://empr.bbrez.dev' : 'http://localhost:3000';

const api_client = axios.create({
  baseURL: api_url,
  headers: {
    'Content-Type': 'application/json'
  }
})

api_client.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.accessToken.value

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
});

// api_client.interceptors.response.use((response) => {
//   return response
// }, async (error) => {
//   const authStore = useAuthStore()

//   if (error.response.status === 403) {
//     await authStore.logout()
//   }

//   return Promise.reject(error)
// });

export const api = {
  user: {
    async register(user: any) {
      return api_client.post('/users', user)
    },

    async login(user: any) {
      return api_client.post('/users/login', user)
    }
  },

  admin: {
    async info() {
      return api_client.get('/admin/info');
    },

    async companies() {
      return api_client.get('/admin/companies');
    },

    async users() {
      return api_client.get('/admin/users');
    },

    async createUserWithRole(user: any) {
      return api_client.post('/admin/users', user);
    }
  },

  passeio: {
    async list() {
      return api_client.get('/trips');
    },

    async register(trip: any) {
      return api_client.post('/trips', trip);
    },

    async byId(id: any) {
      return api_client.get(`/trips/${id}`);
    },

    async addUser(tripId: any, userEmail: any) {
      return api_client.post(`/trips/${tripId}/users`, { email: userEmail });
    }
  },

  empresa: {
    async register(empresa: any) {
      return api_client.post('/admin/companies', empresa);
    }
  },

  manager: {
    async company() {
      return api_client.get('/admin/companies/mine');
    }
  }
}
