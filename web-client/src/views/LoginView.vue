<script setup lang="ts">
import { computed, reactive } from 'vue'

import router from '@/router'
import type { User } from '@/lib/model/user'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const user = reactive({
  email: '',
  password: ''
} as User)

const errors = reactive([] as string[])

const isValid = computed(() => {
  return user.email !== '' && user.password !== ''
})

function submitForm() {
  if (!user.password) return

  errors.splice(0, errors.length)

  authStore
    .login(user.email, user.password)
    .then(() => {
      router.push('/dashboard')
    })
    .catch((err: any): void => {
      console.log(err)
      if (err.response.status === 401) {
        errors.push(err.response.data.error)
      }
    })
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="col-lg-4 col-md-8 col-sm-10">
      <form class="border rounded p-4" @submit.prevent="submitForm">
        <h2 class="mb-3">Login</h2>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            v-model="user.email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="user.password"
          />
        </div>
        <div class="form-text text-danger" v-if="errors.length > 0">
          <ul>
            <li v-for="error in errors" :key="error">
              {{ error }}
            </li>
          </ul>
        </div>
        <button type="submit" class="btn btn-primary me-2" :disabled="!isValid">Submit</button>
        <a href="/register" class="btn btn-secondary">Register</a>
      </form>
    </div>
  </div>
</template>
