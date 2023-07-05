<script setup lang="ts">
import { IonFab, IonFabButton, IonIcon, useIonRouter } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { onMounted, ref } from 'vue';

import topbar from '@/components/TopBarComponent.vue';
import CardCompany from '@/components/CardCompanyComponent.vue';
import { api } from '@/lib/api';

const router = useIonRouter();

const companies = ref([] as any[]);
onMounted(() => {
  api.admin.companies().then((res) => {
    console.log(res.data);
    companies.value = res.data;
  }).catch((err) => {
    console.log(err);
  });
})
</script>

<template>
  <ion-page>
    <div>
      <topbar :title="'Todas Empresas'" :back-target="'/lista-passeios'"></topbar>

      <div class="overflow-auto">
        <div class="container mt-3">
          <card-company v-if="companies.length > 0" v-for="company of  companies " :company="company"
            class="my-3"></card-company>
        </div>
      </div>
    </div>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="router.push('/admin-create-company')">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>