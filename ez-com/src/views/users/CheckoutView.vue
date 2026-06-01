<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { computed, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/user/cart';

const FormData = [
  {
    name: 'Email Address',
    field: 'email'
  },
  {
    name: 'Name',
    field: 'name'
  },
  {
    name: 'Address',
    field: 'address'
  },
  {
    name: 'Note',
    field: 'note'
  }
]

const userFormData = reactive({
  email:"",
  name:'',
  address:"",
  note:''
})

const router = useRouter()
const cartStore = useCartStore()

const payment = () =>{
  cartStore.placeorder(userFormData)
  router.push({name:'success'})
}


</script>

<template>
  <UserLayout>
    <h1 class="text-3xl font-bold m-4 text-black">Shopping Cart</h1>
    <div class="container mx-auto px-4 py-8">
      <div class="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <section class="rounded-3xl bg-slate-50 p-8 shadow-sm border border-slate-100">
          <div class="mb-6">
            <h1 class="text-3xl font-semibold text-black">Checkout</h1>
            <p class="mt-2 text-sm text-slate-600">กรอกข้อมูลสำหรับการสั่งซื้อของคุณ</p>
          </div>

          <div class="space-y-5">
            <div v-for="form in FormData" :key="form.field" class="form-control w-full">
              <label :for="form.field" class="label">
                <span class="label-text text-black font-medium">{{ form.name }}</span>
              </label>
              <input v-model="userFormData[form.field]" type="text" :id="form.field" placeholder="Type here" class="input input-bordered bg-white text-black border-slate-200" />
            </div>
          </div>
          <button @click="payment" class="btn bg-black text-white w-full mt-4 hover:bg-slate-800 border-none">ชำระเงิน</button>
        </section>

        <section class="rounded-3xl bg-blue-50 p-8 shadow-sm border border-blue-100">
          <div v-for="item in cartStore.items" class="flex bg-white rounded-2xl m-4 p-4 border border-slate-100 gap-4">
            <div class="flex-shrink-0 w-24">
              <img class="w-full rounded-lg" :src="item.imageUrl">
            </div>
            <div class="flex-1">
              <div class="flex flex-col justify-between h-full">
                <div>
                  <div class="font-semibold text-black">{{ item.name }}</div>
                  <div class="text-sm text-slate-600">จำนวน : {{ item.quantity }}</div>
                </div>
                <RouterLink :to="{name:'cart'}" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</RouterLink>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="p-4 space-y-3">
            <div class="font-semibold text-black text-lg">Order Summary</div>
            <div class="flex justify-between text-black">
              <div>ราคาสินค้าทั้งหมด</div>
              <div>{{ cartStore.summaryPrice }}</div>
            </div>

            <div class="flex justify-between text-slate-600">
              <div>ค่าส่ง</div>
              <div>0</div>
            </div>

            <div class="divider"></div>
            <div class="flex justify-between p-4 mt-2 bg-slate-50 rounded-lg">
              <div class="font-semibold text-black">ราคาทั้งหมด</div>
              <div class="font-bold text-black">{{ cartStore.summaryPrice }}</div>
            </div>
          </div>
          <div class="divider"></div>
        </section>
        
      </div>
    </div>
  </UserLayout>
</template>