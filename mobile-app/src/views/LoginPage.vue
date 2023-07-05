<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useIonRouter } from '@ionic/vue';
import { computed, reactive, ref } from 'vue';

const authStore = useAuthStore();
const router = useIonRouter();

const user = reactive({
  email: '',
  password: ''
});

const carregando = ref(false);
const form = ref<HTMLFormElement | null>(null);

const formValid = computed(() => {
  return !user.email || !user.password || carregando.value;
})

const login = () => {
  carregando.value = true;

  if (!form.value) return;
  if (form.value.checkValidity()) {
    authStore.login(user.email, user.password).then(() => {
      carregando.value = false;
      router.push('/lista-passeios');
    }).catch((err) => {
      console.log(err);
    })
  } else {
    form.value.reportValidity();
  }

  carregando.value = false;
}
</script>

<template>
  <ion-page>
    <div class="container d-flex flex-column justify-content-center vh-100 p-4">
      <div class="logo">
        Safe Travels
      </div>

      <div class="row justify-content center border border-primary rounded p-3">
        <h3 class="col-12 text-center">Login</h3>

        <form class="col-12" @submit.prevent="login" ref="form" novalidate>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email</label>
            <input type="email" id="inputEmail" class="form-control" v-model="user.email" required>
          </div>

          <div class="mb-3">
            <label for="inputPassword" class="form-label">Senha</label>
            <input type="password" id="inputPassword" class="form-control" v-model="user.password" required>
          </div>

          <button type="submit" class="btn btn-primary me-3" :disabled="formValid">
            <span v-if="!carregando">Entrar</span>
            <span v-else class="spinner-border spinner-border-sm"></span>
          </button>
          <a href="/register" class="btn btn-outline-primary">Cadastrar</a>
        </form>
      </div>
    </div>
  </ion-page>
</template>