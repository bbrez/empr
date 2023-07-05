<script setup lang="ts">
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { useIonRouter } from '@ionic/vue';
import { computed, reactive, ref } from 'vue';

const authStore = useAuthStore();
const router = useIonRouter();

const user = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: ''
});
const userConfirmPassword = ref('');

const carregando = ref(false);
const form = ref<HTMLFormElement | null>(null);
const errors = reactive([] as string[]);

const formValid = computed(() => {
  return !user.firstName || !user.lastName || !user.email || !user.phoneNumber || !user.password || !userConfirmPassword.value || carregando.value;
})

const checkForm = () => {
  errors.splice(0, errors.length);
  if (!user.firstName) errors.push('O campo nome é obrigatório');
  if (!user.lastName) errors.push('O campo sobrenome é obrigatório');
  if (!user.email) errors.push('O campo email é obrigatório');
  if (!user.phoneNumber) errors.push('O campo telefone é obrigatório');
  if (!user.password) errors.push('O campo senha é obrigatório');
  if (user.password.length < 8) errors.push('A senha deve ter no mínimo 8 caracteres');
  if (user.password !== userConfirmPassword.value) errors.push('As senhas não conferem');
  return errors.length === 0;
}

const register = () => {
  if (!form.value) return;
  if (!checkForm()) return;
  if (form.value.checkValidity()) {
    carregando.value = true;
    api.user.register(user).then(() => {
      carregando.value = false;
      authStore.login(user.email, user.password);
      router.push('/lista-passeios');
    }).catch((err) => {
      console.log(err);
    });
  }
}
</script>

<template>
  <ion-page>
    <div class="container d-flex flex-column justify-content-center vh-100 p-4">
      <div class="logo">
        Safe Travels
      </div>

      <div class="row justify-content-center center border border-primary rounded p-3">
        <h3 class="col-12 text-center">Cadastro</h3>

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
            <label for="inputPassword" class="form-label">Senha</label>
            <input type="password" id="inputPassword" class="form-control" v-model="user.password" required>
          </div>

          <div class="mb-3">
            <label for="inputConfirmPassword" class="form-label">Confirme a senha</label>
            <input type="password" id="inputConfirmPassword" class="form-control" v-model="userConfirmPassword" required>
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
          <a href="/login" class="btn btn-outline-warning">Voltar</a>
        </form>
      </div>
    </div>
  </ion-page>
</template>