<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import Product from '@/components/Product.vue';
import { useProductStore } from '@/stores/user/product';
import { useCartStore } from '@/stores/user/cart';
import { useRouter } from 'vue-router';

const router = useRouter()
const productStore = useProductStore()
const cartStore  = useCartStore()

const addTocart  = (product) => {
  cartStore.addToCart(product)
  router.push({name:'cart'})
}
</script>

<template>
  <UserLayout>
      <div class="hero bg-slate-50 min-h-96 border-b border-slate-100">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold text-black">Hello Ka</h1>
      <p class="py-6 text-slate-600">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
  </div>
</div>

<!-- product shell -->
 <Product :products="productStore.list"
                  :addTocart = "addTocart"
 > </Product>
  </UserLayout>
</template>