<script setup lang="ts">
import { api } from '@/lib/api';
import { onMounted, ref } from 'vue';

import UsersCard from '@/components/UsersCard.vue'
import TripsCard from '@/components/TripsCard.vue'

let info = ref({
  users: {
    userCount: 0
  },

  trips: {
    tripCount: 0,
    activeTripCount: 0
  },
});

onMounted(async () => {
  const { data } = await api.admin.info();
  console.log(data);
  info.value = data;
})
</script>

<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <!-- <div class="col">
        <h1>Home</h1>
        <p>Home page</p>
      </div>
      <div class="col">
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
      </div> -->
      <div class="col-3 mb-2">
        <UsersCard :user-count="info.users.userCount"></UsersCard>
      </div>
      <div class="col-3 mb-2">
        <TripsCard :trip-count="info.trips.tripCount" :active-trip-count="info.trips.activeTripCount"></TripsCard>
      </div>
    </div>
  </div>
</template>
