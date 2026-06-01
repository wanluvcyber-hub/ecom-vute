<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="h-screen flex items-center">
    <div class="flex-1 max-w-2xl shadow-xl mx-auto p-8 ">
        <div class="flex flex-col items-center">
            <h1 class="text-3xl">Login</h1>


            <div class="form-control w-full">
                <legend class="fieldset-legend">email</legend>
                <input type="text" class="input input-bordered w-full" placeholder="Your email" />
            </div>

            <div class="form-control w-full">
                <legend class="fieldset-legend">password</legend>
                <input type="password" class="input input-bordered w-full" placeholder="Your email" />
            </div>


            <RouterLink :to="{name : 'admin-dashboard'}" class="btn btn-neutral mt-4 w-full">Login</RouterLink>
     
        </div>


    </div>
    </div>
</template>