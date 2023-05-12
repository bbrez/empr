<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore();
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div v-for="route of router.getRoutes()" class="mb-3 col-8">
                <button v-if="route.name != 'Debug'" class="btn btn-primary w-100" @click="router.push(route)">
                    {{ route.name }}
                </button>
            </div>
            <div class="mb-3 col-">
                <button class="btn btn-primary w-100" @click="auth.logout()">
                    Logout
                </button>
            </div>
            <div class="mb3 col-8">
                {{ auth.accessToken }}
                {{ auth.userData }}
            </div>
        </div>
    </div>
</template>