<script setup lang="ts">
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { useIonRouter } from '@ionic/vue';
import { computed, onMounted, reactive, ref } from 'vue';

import topbar from '@/components/TopBarComponent.vue';

const authStore = useAuthStore();
const router = useIonRouter();

const user = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  company: {},
  role: '',
});
const userConfirmPassword = ref('');

const carregando = ref(false);
const form = ref<HTMLFormElement | null>(null);
const errors = reactive([] as string[]);

const empresas = ref([] as any[]);

onMounted(() => {
  api.admin.companies().then((res) => {
    empresas.value = res.data;
  }).catch((err) => {
    console.log(err);
  });
})

const formValid = computed(() => {
  return !user.firstName || !user.lastName || !user.email || !user.phoneNumber || !user.password || !userConfirmPassword.value || carregando.value;
})

const checkForm = () => {
  errors.splice(0, errors.length);
  if (user.password.length < 8) errors.push('A senha deve ter no mínimo 8 caracteres');
  if (user.password !== userConfirmPassword.value) errors.push('As senhas não conferem');
  if (user.role == '') errors.push('O campo nível de acesso é obrigatório');
  if (['Manager', 'Guide'].indexOf(user.role) > -1 && !user.company) errors.push('O campo empresa é obrigatório')
  return errors.length === 0;
}

const register = () => {
  if (!form.value) return;
  if (!checkForm()) return;
  if (form.value.checkValidity()) {
    carregando.value = true;
    api.admin.createUserWithRole(user).then(() => {
      router.push('/admin-users');
    }).catch((err) => {
      console.log(err);
      errors.push('Erro ao criar usuário');
    });
  }
}
</script>

<template>
  <ion-page>
    <div class="overflow-auto">
      <topbar :title="'Cadastro de Usuário'"></topbar>
      <div class="container d-flex flex-column justify-content-center p-4">
        <div class="row justify-content-center center border border-primary rounded p-3">
          <form class="col-12" @submit.prevent="register" ref="form" novalidate>
            <div class="mb-3">
              <label for="inputFirstName" class="form-label">Nome</label>
              <input type="text" id="inputFirstName" class="form-control" v-model="user.firstName" required>
            </div>

            <div class="mb-3">
              <label for="inputLastName" class="form-label">Sobrenome</label>
              <input type="text" id="inputLastName" class="form-control" v-model="user.lastName" required>
            </div>

            <div class="mb-3">
              <label for="inputEmail" class="form-label">Email</label>
              <input type="email" id="inputEmail" class="form-control" v-model="user.email" required>
            </div>

            <div class="mb-3">
              <label for="inputPhoneNumber" class="form-label">Telefone</label>
              <input type="tel" id="inputPhoneNumber" class="form-control" v-model="user.phoneNumber" required>
            </div>

            <div class="mb-3">
              <label for="inputRole" class="form-label">Nível de Acesso</label>
              <select id="inputRole" class="form-select" v-model="user.role" required>
                <option disabled selected value="">Selecione o Nível de Acesso...</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Guide">Guide</option>
                <option value="Tourist">Tourist</option>
              </select>
            </div>

            <div v-if="user.role == 'Manager' || user.role == 'Guide'" class="mb-3">
              <label for="inputCompany" class="form-label">Empresa</label>
              <select id="inputCompany" class="form-select" v-model="user.company">
                <option disabled selected :value="{}">Selecione a Empresa...</option>
                <option v-for="empresa of empresas" :value="empresa">{{ empresa.name }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="inputPassword" class="form-label">Senha</label>
              <input type="password" id="inputPassword" class="form-control" v-model="user.password" required>
            </div>

            <div class="mb-3">
              <label for="inputConfirmPassword" class="form-label">Confirme a senha</label>
              <input type="password" id="inputConfirmPassword" class="form-control" v-model="userConfirmPassword"
                required>
            </div>

            <div class="alert alert-danger" v-if="errors.length">
              <ul class="mb-0">
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </div>

            <button type="submit" class="btn btn-primary me-3" :disabled="formValid">
              <span v-if="!carregando">Cadastrar</span>
              <span v-else class="spinner-border spinner-border-sm"></span>
            </button>
            <a href="/admin-users" class="btn btn-outline-warning">Voltar</a>
          </form>
        </div>
      </div>
    </div>
  </ion-page>
</template>