<script setup lang="ts">
import topbar from '@/components/TopBarComponent.vue';
import { reactive, ref } from 'vue';
import moment from 'moment';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/lib/api';

const authStore = useAuthStore();

const formatDate = (date: Date) => {
  return moment(date).format('YYYY-MM-DDTHH:mm');
}

const passeio = reactive({
  name: '',
  place: '',
  startDate: '',
  endDate: '',
  companyId: authStore.userData.value.companyId
})

const form = ref<HTMLFormElement | null>(null);
const errors = reactive([] as string[]);

const register = () => {
  if (!form.value) return;
  if (form.value.checkValidity()) {
    const passeioPayload = {
      ...passeio,
      startDate: moment(passeio.startDate).format('YYYY-MM-DDTHH:MM:ss.000[Z]'),
      endDate: moment(passeio.endDate).format('YYYY-MM-DDTHH:MM:ss.000[Z]'),
    }
    api.passeio.register(passeioPayload);
  } else {
    form.value.reportValidity();
  }

  console.log(passeio);
}

</script>

<template>
  <ion-page>
    <topbar :title="'Cadastrar Passeio'" :back-target="'/lista-passeios'"></topbar>
    <div class="container d-flex flex-column justify-content center vh-100 p-4">
      <div class="row justify-content center center border border-primary rounded p-3">
        <form class="col-12" @submit.prevent="register" ref="form" novalidate>
          <div class="mb-3">
            <label for="inputName" class="form-label">Nome do Passeio</label>
            <input type="text" class="form-control" v-model="passeio.name" required>
          </div>

          <div class="mb-3">
            <label for="inputPlace" class="form-label">Local</label>
            <input type="text" class="form-control" v-model="passeio.place" required>
          </div>

          <div class="mb-3">
            <label for="inputstartDate" class="form-label">Data de Início</label>
            <input type="datetime-local" class="form-control" v-model="passeio.startDate" :min="formatDate(new Date())"
              required>
          </div>

          <div class="mb-3">
            <label for="inputendDate" class="form-label">Data de Fim</label>
            <input type="datetime-local" class="form-control" v-model="passeio.endDate" :min="passeio.startDate"
              :disabled="passeio.startDate == ''" required>
          </div>

          <div class="alert alert-danger" v-if="errors.length">
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </div>

          <button type="submit" class="btn btn-primary me-3">
            <span>Cadastrar</span>
          </button>
        </form>
      </div>
    </div>
  </ion-page>
</template>