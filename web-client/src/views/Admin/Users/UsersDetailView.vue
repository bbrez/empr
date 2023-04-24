<script setup lang="ts">
import { api } from '@/lib/api';
import { onMounted, ref } from 'vue';

let info = ref([]);
onMounted(async () => {
    const { data } = await api.admin.users();
    console.log(data);
    info.value = data;
})
</script>

<template>
    <div class="container">

    </div>
</template>