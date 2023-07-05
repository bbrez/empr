<script setup lang="ts">
defineProps<{
  user: any;
}>();

const formatDate = (date: string) => new Date(date).toLocaleString();
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ user.firstName + ' ' + user.lastName }}</h5>
      <p class="card-text">
        <i class="fa-solid fa-user me-2"></i>
        {{ user.role }}
      </p>
      <p v-if="!!user.company" class="card-text">
        <i class="fa-solid fa-building me-2"></i>
        {{ user.company.name }}
      </p>
      <p class="card-text">
        Atualizado em: {{ formatDate(user.updatedAt) }}
      </p>
    </div>
  </div>
</template>