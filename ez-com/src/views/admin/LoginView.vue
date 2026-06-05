<script setup>
import { reactive, ref } from 'vue';
import { useAccountStore } from '@/stores/account';
import { useRouter } from 'vue-router';

const accountStore = useAccountStore()
const router = useRouter()

const loginData = reactive({
  email: '',
  password: ''
})

const errorMessage = ref('')

const login = async () => {
  try {
    await accountStore.login(loginData.email, loginData.password)
    if (accountStore.role === 'admin') {
      router.push({ name: 'admin-dashboard' })
    } else {
      router.push({ name: 'home' })
    }
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>
<template>
    <div class="h-screen flex items-center">
    <div class="flex-1 max-w-2xl shadow-xl mx-auto p-8 ">
        <div class="flex flex-col items-center">
            <h1 class="text-3xl font-bold mb-4">Login</h1>

            <div v-if="errorMessage" class="alert alert-error mb-4">
                {{ errorMessage }}
            </div>

            <div class="form-control w-full mb-4">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input v-model="loginData.email" type="text" class="input input-bordered w-full" placeholder="Your email" />
            </div>

            <div class="form-control w-full mb-6">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input v-model="loginData.password" type="password" class="input input-bordered w-full" placeholder="Your password" @keyup.enter="login" />
            </div>

            <button @click="login" class="btn btn-neutral w-full">Login</button>
            
            <div class="mt-6 text-sm text-slate-600">
              Don't have an account? 
              <RouterLink :to="{ name: 'register' }" class="text-primary font-bold hover:underline">Register now</RouterLink>
            </div>
        </div>
    </div>
    </div>
</template>