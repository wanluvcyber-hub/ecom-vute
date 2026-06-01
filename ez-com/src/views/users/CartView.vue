<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import Close from '@/icons/Close.vue';
import { useCartStore } from '@/stores/user/cart';
import { RouterLink } from 'vue-router';
const cartStore = useCartStore()

const changQuantity = (event,index) =>{
  const newQuantity  = parseInt(event.target.value)
  cartStore.updateQuantity(index,newQuantity)
}
</script>

<template>
  <UserLayout>
    <h1 class="text-3xl font-bold m-4 text-black">Shopping Cart</h1>

    <div class="flex">

      <div class="flex-auto w-64 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div v-if="cartStore.items.length === 0" class="text-black text-center py-8">
          Cart is empty
        </div>
        <div v-else class="flex" v-for="(i,index) in cartStore.items">

          <div class="flex-1">
            <img class="w-full p-10" src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp">
          </div>

          <div class="flex-1">
            <div class="flex flex-col justify-between h-full">
              <div>
                <div class="relative grid grid-cols-2">
                  <div>
                    <div class="font-bold text-black">{{ i.name }}</div>
                    <div class="text-slate-600">{{ i.about }}</div>
                    <div class="text-black font-medium">{{ i.price }}</div>
                  </div>
                  <div>
                    <select  v-model="i.quantity" class="select select-sm w-1/2 p-4 bg-white text-black border-slate-200" @change="changQuantity($event,index)">
                      <option v-for="quantity in [1, 2, 3, 4, 5]">
                        {{ quantity }}
                      </option>
                    </select>
                  </div>
                  <div @click=cartStore.removeItemCart(index) class="absolute top-0 right-0">
                    <Close class="text-slate-400 hover:text-slate-600 w-6 h-6"></Close>
                  </div>
                </div>

              </div>
            </div><b class="text-black"> Stock</b>
          </div>
        </div>
      </div>

      <div class="flex-auto w-32 bg-blue-50 p-4 rounded-2xl border border-blue-100 ml-4">
        <div class="text-xl font-bold text-black">Order Summary</div>
        <div class="my-4 divide-y divide-slate-200">

          <div class="flex justify-between text-black py-2">
            <div>ราคาสินค้าทั้งหมด</div>
            <div class="font-semibold text-black">{{ cartStore.summaryPrice }}</div>
          </div>

          <div class="flex justify-between text-black py-2">
            <div>ค่าส่ง</div>
            <div class="font-semibold text-black">0</div>
                </div>

            <div class="flex justify-between text-black py-2">
              <div>ราคารวมทั้งหมด</div>
              <div class="font-semibold">0</div>
            </div>
            <RouterLink :to="{ name:'checkout'}" class="btn bg-black text-white w-full mt-4 hover:bg-slate-800 border-none">
               ชำระเงิน
            </RouterLink>
        </div>
      </div>
    </div>
  </UserLayout>
</template>