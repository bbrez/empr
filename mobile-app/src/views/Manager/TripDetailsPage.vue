<script setup lang="ts">
import topbar from '@/components/TopBarComponent.vue';
import { onMounted, reactive, ref } from 'vue';
import moment from 'moment';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/lib/api';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();

const formatDate = (date: Date) => {
  return moment(date).format('YYYY-MM-DDTHH:mm');
}

const passeio = reactive({
  name: '',
  place: '',
  startDate: '',
  endDate: '',
  companyId: authStore.userData.value.companyId,
  UsersOnTrips: [] as any[],
})

const form = ref<HTMLFormElement | null>(null);
const errors = reactive([] as string[]);
const userEmail = ref('');

onMounted(() => {
  api.passeio.byId(route.params.id).then((res) => {
    console.log(res);

    passeio.name = res.data.name;
    passeio.place = res.data.place;
    passeio.startDate = formatDate(res.data.startDate);
    passeio.endDate = formatDate(res.data.endDate);
    passeio.UsersOnTrips = res.data.UsersOnTrips;
  })
})

const addUser = () => {
  api.passeio.addUser(route.params.id, userEmail.value).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
    errors.push(err.response.data.message);
  })
}
</script>

<template>
  <ion-page>
    <topbar :title="'Cadastrar Passeio'" :back-target="'/lista-passeios'"></topbar>
    <div class="container d-flex flex-column justify-content center vh-100 p-4">
      <div class="row justify-content center center border border-primary rounded p-3">
        <form class="col-12" ref="form" novalidate>
          <div class="mb-3">
            <label for="inputName" class="form-label">Nome do Passeio</label>
            <input type="text" class="form-control" v-model="passeio.name" disabled>
          </div>

          <div class="mb-3">
            <label for="inputPlace" class="form-label">Local</label>
            <input type="text" class="form-control" v-model="passeio.place" disabled>
          </div>

          <div class="mb-3">
            <label for="inputstartDate" class="form-label">Data de Início</label>
            <input type="datetime-local" class="form-control" v-model="passeio.startDate" disabled>
          </div>

          <div class="mb-3">
            <label for="inputendDate" class="form-label">Data de Fim</label>
            <input type="datetime-local" class="form-control" v-model="passeio.endDate" disabled>
          </div>

          <div class="mb-3">
            <label for="inputUser" class="form-label">Incluir Usuario</label>
            <input type="email" class="form-control" v-model="userEmail" placeholder="email@example.com">
            <button type="button" class="btn btn-primary mt-2" @click="addUser">Incluir</button>
          </div>

          <div class="mb-3">
            <label for="inputUser" class="form-label">Usuarios Inclusos:</label>
            <ul>
              <li v-for="user of passeio.UsersOnTrips">{{ user.user.firstName + ' ' + user.user.lastName }}</li>
            </ul>
          </div>

          <div class="alert alert-danger" v-if="errors.length">
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </ion-page>
</template>