<script setup lang="ts">
defineProps({
  userCount: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Usuários</h5>
      <div class="row">
        <div class="col mb-3">Registrados: {{ userCount }}</div>
        <div class="col-12 mb-3">
          <div class="row">
            <div class="col-6">
              <RouterLink to="/admin/users/register" class="btn btn-primary">Cadastro</RouterLink>
            </div>
            <div class="col-6">
              <RouterLink to="/admin/users" class="btn btn-outline-primary">Ver Mais</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
