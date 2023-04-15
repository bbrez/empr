<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Icon } from '@vicons/utils';
import { DarkModeFilled, LightModeFilled } from '@vicons/material';

const isDarkMode = ref(false);

onMounted(() => {
    const theme = localStorage.getItem('theme');
    if (theme == null) {
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
        return;
    }

    isDarkMode.value = theme === 'dark';
    document.documentElement.setAttribute('data-bs-theme', isDarkMode.value ? 'dark' : 'light');
});

function toggleDarkMode() {
    if (isDarkMode.value) {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
        isDarkMode.value = false;
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        isDarkMode.value = true;
    }
}
</script>

<template>
    <nav class="navbar navbar-expand bg-body-tertiary">
        <div class="container">
            <a href="/" class="navbar-brand">TourTrack</a>
            <form class="d-flex" role="option">
                <div class="form-check form-check-reverse form-switch" @click="toggleDarkMode()">
                    <label for="darkModeToggle" class="form-check-label">
                        <Icon>
                            <LightModeFilled v-if="!isDarkMode"></LightModeFilled>
                            <DarkModeFilled v-else></DarkModeFilled>
                        </Icon>
                    </label>
                    <input name="darkModeToggle" id="darkModeToggle" type="checkbox" class="form-check-input" role="switch"
                        v-model="isDarkMode">
                </div>
            </form>
        </div>
    </nav>
</template>