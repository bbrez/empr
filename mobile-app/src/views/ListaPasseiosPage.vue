<script setup lang="ts">
import { IonFab, IonFabButton, IonFabList, IonIcon, useIonRouter } from '@ionic/vue';
import { add, person, businessOutline, flagOutline, logOutOutline } from 'ionicons/icons';
import { useAuthStore } from '@/stores/authStore';
import { computed, onMounted, ref } from 'vue';
import { api } from '@/lib/api';
import CardPasseio from '@/components/CardPasseioComponent.vue';
import CardEmpresa from '@/components/CardCompanyComponent.vue';
import Topbar from '@/components/TopBarComponent.vue';

const authStore = useAuthStore();
const router = useIonRouter();

const passeios = ref([] as any[]);
const empresa = ref({
  name: "",
  _count: {
    trips: 0,
    users: 0
  }
} as any);
onMounted(() => {
  api.passeio.list().then((res) => {
    passeios.value = res.data;
  }).catch((err) => {
    console.log(err);
  });

  if (authStore.eqRole('Manager')) {
    api.manager.company().then((res) => {
      empresa.value = res.data;
      console.log(empresa.value);
    }).catch((err) => {
      console.log(err);
    });
  }
})

const headerTitle = computed(() => {
  if (authStore.eqRole('Admin')) return 'Todos Passeios';
  if (authStore.eqRole('Manager')) return 'Passeios Gerenciados';
  return 'Meus Passeios';
});

const logout = () => {
  router.push('/login');
  authStore.logout();
}
</script>

<template>
  <ion-page id="main-content">
    <div class="overflow-auto">
      <topbar :title="headerTitle"></topbar>
      <div class="container mt-3">
        <div v-if="authStore.eqRole('Manager')" class="my-3">
          <card-empresa :company="empresa"></card-empresa>
        </div>

        <card-passeio v-if="passeios.length > 0" v-for="passeio of passeios" :passeio="passeio"
          class="my-3"></card-passeio>
        <div v-else>
          <div class="row">
            <div class="col-12 my-5">
              <h3 class="text-center text-Muted">Você ainda não possui passeios cadastrados.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="m-5">
      {{ authStore.userData }}
    </div> -->

    <ion-fab slot="fixed" vertical="bottom" horizontal="end" v-if="authStore.eqRole('Admin')">
      <ion-fab-button>
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button @click="router.push('/admin-users')" color="secondary">
          <ion-icon :icon="person"></ion-icon>
        </ion-fab-button>
        <ion-fab-button @click="router.push('/admin-companies')" color="secondary">
          <ion-icon :icon="businessOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button @click="router.push('/manager-passeios')" color="danger">
          <ion-icon :icon="logOutOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end" v-if="authStore.eqRole('Manager')">
      <ion-fab-button>
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button @click="router.push('/manager-users')" color="secondary">
          <ion-icon :icon="person"></ion-icon>
        </ion-fab-button>
        <ion-fab-button @click="router.push('/register-trip')" color="secondary">
          <ion-icon :icon="flagOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button @click="logout()" color="danger">
          <ion-icon :icon="logOutOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

  </ion-page>
</template>