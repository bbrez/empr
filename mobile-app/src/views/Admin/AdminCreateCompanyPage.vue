<script setup lang="ts">
import { api } from '@/lib/api';
import topbar from '@/components/TopBarComponent.vue';
import { ref, reactive, computed } from 'vue';
import { useIonRouter } from '@ionic/vue';

const router = useIonRouter();

const company = reactive({
  name: '',
})

const carregando = ref(false);
const form = ref<HTMLFormElement | null>(null);
const errors = reactive([] as string[]);

const formValid = computed(() => {
  return !company.name || carregando.value;
})

const register = () => {
  api.empresa.register(company).then(() => {
    router.push('/admin-companies');
  }).catch((err) => {
    console.log(err);
    errors.push('Erro ao criar empresa');
  });
}
</script>

<template>
  <ion-page>
    <div>
      <topbar :title="'Cadastro de Empresa'"></topbar>
      <div class="container d-flex flex-column justify-content-center p-4 vh-100">
        <div class="row justify-content-center center border border-primary rounded p-3">
          <form class="col-12" @submit.prevent="register" ref="form" novalidate>
            <div class="mb-3">
              <label for="name" class="form-label">Nome</label>
              <input type="text" class="form-control" id="name" v-model="company.name" required>
            </div>

            <div class="alert alert-danger" v-if="errors.length">
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </div>

            <button type="submit" class="btn btn-primary me-3" :disabled="formValid">
              <span v-if="!carregando">Cadastrar</span>
              <span v-else class="spinner-border spinner-border-sm"></span>
            </button>
            <a href="/admin-companies" class="btn btn-outline-warning">Voltar</a>
          </form>
        </div>
      </div>
    </div>
  </ion-page>
</template>