<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useActiveElement } from '@vueuse/core';

import { api } from '@/lib/api';
import router from '@/router';
import type { User } from '@/lib/model/user';

const activeElement = useActiveElement();

const emailInput = ref(null as any);
const pwInput = ref(null as any);

const errors = ref([] as string[]);


const user = reactive({
    email: '',
    password: '',
} as User);


const isValid = computed(() => {
    return errors.value.length === 0 && user.email !== '' && user.password !== '';
});

const showEmailHint = ref(false);
const emailActivated = computed(() => {
    if (activeElement.value === emailInput.value) {
        showEmailHint.value = true;
    }
    return showEmailHint.value;
});

const showPwHint = ref(false);
const passwordActivated = computed(() => {
    if (activeElement.value === pwInput.value) {
        showPwHint.value = true;
    }
    return showPwHint.value;
});

function submitForm() {
    api.user.register(user).then(() => {
        router.push('/login');
    }).catch((err) => {
        if (err.response.status === 409) {
            errors.value.push('email-exists');
        }
    });
}

function validateEmail() {
    errors.value = errors.value.filter(e => !e.includes('email'));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
        errors.value.push('email-invalid');
    }
}

function validadePassword() {
    if (user.password == null) return;

    errors.value = errors.value.filter(e => !e.includes('password'));

    if (user.password.length < 8) {
        errors.value.push('password-short');
    }

    if (!/\d/.test(user.password)) {
        errors.value.push('password-no-number');
    }

    if (!/[A-Z]/.test(user.password)) {
        errors.value.push('password-no-uppercase');
    }

    if (!/[a-z]/.test(user.password)) {
        errors.value.push('password-no-lowercase');
    }

    if (!/[^A-Za-z0-9]/.test(user.password)) {
        errors.value.push('password-no-special');
    }
}


onMounted(() => {
    validadePassword();
});
</script>

<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="col-lg-4 col-md-8 col-sm-10">
            <form class="border rounded p-4" @submit.prevent="submitForm">
                <h2 class="mb-3">Register</h2>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email" @input="validateEmail"
                        ref="emailInput" v-model="user.email">
                    <div v-if="emailActivated" class="form-text text-danger">
                        <div v-if="errors.includes('email-invalid')">
                            Invalid email
                        </div>
                        <div v-if="errors.includes('email-exists')">
                            Email already exists
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <div class="position-relative">
                        <input type="password" class="form-control" id="password" placeholder="Password"
                            @input="validadePassword" ref="pwInput" v-model="user.password">
                        <div class="form-text" v-if="passwordActivated">
                            <ul>
                                <li :class="errors.includes('password-short') ? 'text-danger' : 'text-success'">
                                    At least 8 characters
                                </li>
                                <li :class="errors.includes('password-no-number') ? 'text-danger' : 'text-success'">
                                    At least 1 number
                                </li>
                                <li :class="errors.includes('password-no-uppercase') ? 'text-danger' : 'text-success'">
                                    At least 1 uppercase letter
                                </li>
                                <li :class="errors.includes('password-no-lowercase') ? 'text-danger' : 'text-success'">
                                    At least 1 lowercase letter
                                </li>
                                <li :class="errors.includes('password-no-special') ? 'text-danger' : 'text-success'">
                                    At least 1 special character
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button type="submit" :disabled="!isValid" class="btn btn-primary me-2">Submit</button>
                <a href="/login" class="btn btn-secondary">Login</a>
            </form>
        </div>
    </div>
</template>