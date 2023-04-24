<script setup lang="ts">
defineProps({
  tripCount: {
    type: Number,
    required: true,
  },
  activeTripCount: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">Passeios</div>
      <div class="row">
        <div class="col mb-3">Registrados: {{ tripCount }}</div>
        <div class="col mb-3">Ativos: {{ activeTripCount }}</div>
      </div>
      <div class="row">
        <div class="col-6">
          <a class="btn btn-primary">Cadastro</a>
        </div>
        <div class="col-6">
          <a class="btn btn-outline-primary">Ver Mais</a>
        </div>
      </div>
    </div>
  </div>
</template>