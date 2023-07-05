<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, useIonRouter } from '@ionic/vue';

const router = useIonRouter();

defineProps<{
  title: string;
  backTarget?: string;
}>();
</script>

<template>
  <!-- <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header> -->
  <nav class="navbar sticky-top bg-body-tertiary">
    <div class="container-fluid">
      <div v-if="!!backTarget" class="col-1 text-center" @click="router.push(backTarget)">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <div class="col">
        <span class="navbar-brand">{{ title }}</span>
      </div>
    </div>
  </nav>
</template>