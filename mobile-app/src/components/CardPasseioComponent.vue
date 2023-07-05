<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

defineProps<{
  passeio: any;
}>();

const formatDate = (date: string) => new Date(date).toLocaleString();

</script>

<template>
  <div class="card" :class="{ 'border-primary': passeio.isActivated }">
    <div class="card-body">
      <h5 class="card-title">{{ passeio.name }}</h5>
      <p class="card-text">
      <div>{{ passeio.place }}</div>
      <div v-if="authStore.eqRole('Admin')">{{ passeio.company.name }}</div>
      </p>
      <div class="card-text">
        <i class="fa-regular fa-clock me-2"></i>
        Inicio: {{ formatDate(passeio.startDate) }}
      </div>
      <div class="card-text">
        <i class="fa-solid fa-flag-checkered me-2"></i>
        Fim: {{ formatDate(passeio.endDate) }}
      </div>

      <div class="row mt-3">
        <div class="col">
          <a :href="'/'" class="btn btn-primary w-100">Detalhes</a>
        </div>
        <div v-if="passeio.isActivated" class="col">
          <a href="/" class="btn btn-primary w-100">Entrar</a>
        </div>
      </div>
    </div>
  </div>
</template>