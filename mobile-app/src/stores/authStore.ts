import { defineStore } from 'pinia'
import { api } from '../lib/api'
import { computed } from 'vue'
import { Preferences } from '@capacitor/preferences';

export const useAuthStore = defineStore('auth', () => {
    const accessToken = {
        get value() {
            return localStorage.getItem('accessToken');
        },

        set value(newValue: any) {
            localStorage.setItem('accessToken', newValue);
        }
    }

    const userData = {
        get value() {
            const data = localStorage.getItem('userData');
            return data ? JSON.parse(data) : null;
        },

        set value(newValue: any) {
            localStorage.setItem('userData', JSON.stringify(newValue));
        }
    }

    const isAuthenticated = computed(() => !!accessToken && !!userData)

    async function login(email: string, password: string) {
        try {
            const response = await api.user.login({ email, password })
            const { token, user } = response.data

            accessToken.value = token
            userData.value = user
        } catch (error) {
            console.error(error)
        }
    }

    async function logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
    }

    function roleToNumber(role: string) {
        switch (role) {
            case 'Admin':
                return 3;
            case 'Manager':
                return 2;
            case 'Guide':
                return 1;
            default:
                return 0;
        }
    }

    function minRole(role: string) {
        const userRole = roleToNumber(userData.value.role);
        const minRole = roleToNumber(role);

        return userRole >= minRole;
    }

    function eqRole(role: string) {
        const userRole = roleToNumber(userData.value.role);
        const minRole = roleToNumber(role);

        return userRole === minRole;
    }

    return {
        accessToken,
        userData,
        isAuthenticated,
        login,
        logout,
        minRole,
        eqRole
    }
});