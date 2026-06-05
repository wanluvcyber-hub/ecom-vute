<script setup>
import { reactive, ref } from 'vue';
import { useAccountStore } from '@/stores/account';
import { useRouter } from 'vue-router';

const accountStore = useAccountStore()
const router = useRouter()

const registerData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
})

const errorMessage = ref('')

const register = async () => {
  if (registerData.password !== registerData.confirmPassword) {
    errorMessage.value = "Passwords do not match"
    return
  }

  try {
    await accountStore.register(registerData.email, registerData.password, registerData.name)
    router.push({ name: 'home' })
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="h-screen flex items-center bg-base-200">
    <div class="flex-1 max-w-md shadow-2xl mx-auto p-8 bg-white rounded-3xl">
      <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold mb-2">Create Account</h1>
        <p class="text-slate-500 mb-8">Join Apicahit Shop today</p>

        <div v-if="errorMessage" class="alert alert-error mb-6 shadow-sm">
          <span>{{ errorMessage }}</span>
        </div>

        <div class="form-control w-full mb-4">
          <label class="label"><span class="label-text font-semibold">Full Name</span></label>
          <input v-model="registerData.name" type="text" class="input input-bordered w-full rounded-xl" placeholder="John Doe" />
        </div>

        <div class="form-control w-full mb-4">
          <label class="label"><span class="label-text font-semibold">Email</span></label>
          <input v-model="registerData.email" type="email" class="input input-bordered w-full rounded-xl" placeholder="mail@site.com" />
        </div>

        <div class="form-control w-full mb-4">
          <label class="label"><span class="label-text font-semibold">Password</span></label>
          <input v-model="registerData.password" type="password" class="input input-bordered w-full rounded-xl" placeholder="••••••••" />
        </div>

        <div class="form-control w-full mb-8">
          <label class="label"><span class="label-text font-semibold">Confirm Password</span></label>
          <input v-model="registerData.confirmPassword" type="password" class="input input-bordered w-full rounded-xl" placeholder="••••••••" @keyup.enter="register" />
        </div>

        <button @click="register" class="btn btn-primary w-full rounded-full text-lg shadow-lg">Sign Up</button>
        
        <div class="mt-6 text-sm text-slate-600">
          Already have an account? 
          <RouterLink :to="{ name: 'admin-login' }" class="text-primary font-bold hover:underline">Log in</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
