<script setup lang="ts">
import ModeToggle from '@/components/ModeToggle.vue'
import { computed, reactive, ref } from 'vue';
import router from '@/router';
import { User } from '@/lib/model/user';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();

const user = reactive({
    email: '',
    password: ''
} as User);

const error = ref('');

const isFormValid = computed(() => {
    return user.email !== '' && user.password !== '';
});

const submitForm = async () => {
    if (!isFormValid.value) return;
    if (!user.password) return;

    authStore
        .login(user.email, user.password)
        .then(() => {
            router.push('/');
        })
        .catch((err) => {
            error.value = err
        });

    return;
}
</script>
<template>
    <div class="container d-flex flex-column justify-content-center vh-100 p-4">

        <!-- <img src="public/megatour.png" class="mb-2 px-5"> -->
        <h1 class="text-center fst-italic">
            Safe Travels
        </h1>

        <div class="row justify-content-center border border-primary rounded p-3">
            <h3 class="col-12 text-center">
                Login
            </h3>

            <div class="col-12">
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">Email</label>
                        <input type="email" id="inputEmail" class="form-control" v-model="user.email">
                    </div>

                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Senha</label>
                        <input type="password" id="inputPassword" class="form-control" v-model="user.password">
                    </div>

                    <button type="submit" class="btn btn-primary">
                        Entrar
                    </button>

                    <ModeToggle></ModeToggle>
                </form>
                {{ error }}
            </div>
        </div>
    </div>
</template>