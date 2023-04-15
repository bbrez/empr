<script setup lang="ts">
import Topbar from "@/components/Topbar.vue";
import UsersCard from "@/components/UsersCard.vue";
</script>

<template>
    <Topbar></Topbar>
    <div class="container">
        <div class="row mt-5">
            <div class="col">
                <h1>Home</h1>
                <p>Home page</p>
            </div>
            <div class="col">
                <button class="btn btn-primary">Primary</button>
                <button class="btn btn-secondary">Secondary</button>
            </div>
            <div class="col-4">
                <UsersCard></UsersCard>
            </div>
        </div>
    </div>
</template>