<script setup lang="ts">
</script>

<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="col-lg-4 col-md-8 col-sm-10">
            <form class="border rounded p-4">
                <h2 class="mb-3">Login</h2>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary me-2">Submit</button>
                <a href="/register" class="btn btn-secondary">Register</a>
            </form>
        </div>
    </div>
</template>