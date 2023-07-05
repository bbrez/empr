import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }

  async checkTheme() {
    let theme = await Preferences.get({ key: 'theme' }).then((res) => res.value);
    if (theme == null) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      Preferences.set({ key: 'theme', value: theme });
    }

    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  setTheme(theme: string) {
    Preferences.set({ key: 'theme', value: theme });
    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  toggleTheme() {
    const theme = document.documentElement.getAttribute('data-bs-theme');
    if (theme === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }
}
