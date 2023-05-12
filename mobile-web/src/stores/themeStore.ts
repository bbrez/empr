import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useThemeStore = defineStore('theme', () => {
    const themes = ['light', 'dark'] as const;

    const theme = useLocalStorage('theme', 'light', {
        listenToStorageChanges: true
    });

});