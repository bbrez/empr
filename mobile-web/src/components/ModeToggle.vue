<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Icon } from "@vicons/utils";
import { LightModeFilled, DarkModeFilled } from '@vicons/material';

const isDarkMode = ref(false)

onMounted(() => {
    const theme = localStorage.getItem('theme')
    if (theme == null) {
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
        return;
    }

    isDarkMode.value = theme === 'dark'
    document.documentElement.setAttribute('data-bs-theme', isDarkMode.value ? 'dark' : 'light');
});

function toggleMode() {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    document.documentElement.setAttribute('data-bs-theme', isDarkMode.value ? 'dark' : 'light');
}
</script>

<template>
    <div class="form-check form-check-reverse form-switch" @click="toggleMode()">
        <label for="modeToggle" class="form-check-label">
            <Icon>
                <LightModeFilled v-if="!isDarkMode" />
                <DarkModeFilled v-else />
            </Icon>
        </label>
        <input id="modeToggle" type="checkbox" class="form-check-input" v-model="isDarkMode">
    </div>
</template>