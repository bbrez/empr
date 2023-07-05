<script setup lang="ts">
defineProps<{
  company: any;
}>();
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ company.name }}</h5>
      <p class="card-text">
        <i class="fa-solid fa-user me-2"></i>
        Usuários: {{ company._count.users }}
      </p>
      <p class="card-text">
        <i class="fa-solid fa-street-view me-2"></i>
        Passeios: {{ company._count.trips }}
      </p>
    </div>
  </div>
</template>