<script setup lang="ts">
import { IonFab, IonFabButton, IonIcon, useIonRouter } from '@ionic/vue';
import { add } from 'ionicons/icons';
import topbar from '@/components/TopBarComponent.vue';
import { api } from '@/lib/api';
import { ref, onMounted } from 'vue';

import CardUser from '@/components/CardUserComponent.vue';

const router = useIonRouter();

const users = ref([] as any[]);
onMounted(() => {
  api.admin.users().then((res) => {
    users.value = res.data;
  }).catch((err) => {
    console.log(err);
  });
})
</script>

<template>
  <ion-page>
    <div>
      <topbar :title="'Todos usuarios'" :back-target="'/lista-passeios'"></topbar>

      <div class="overflow-auto">
        <div class="container mt-3">
          <card-user v-if="users.length > 0" v-for="user of users" :user="user" class="my-3"></card-user>
        </div>
      </div>
    </div>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="router.push('/admin-create-user')">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>