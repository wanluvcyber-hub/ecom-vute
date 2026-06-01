<script setup>
import { ref,computed,watch } from 'vue';
import UserLayout from '@/layouts/UserLayout.vue';
import { useRoute } from 'vue-router';
import Product from '@/components/Product.vue';
import { useProductStore } from '@/stores/user/product';
import { useCartStore } from '@/stores/user/cart';
import { useRouter } from 'vue-router';


const productStore = useProductStore()
const route = useRoute()
const searchText = ref('')
const router = useRouter()
const cartStore = useCartStore()

watch (() => route.query.q,(newSearchText) =>{
  searchText.value = newSearchText
},{immediate:true})

const filterProducts = computed(() =>{
  return productStore.filterProducts(searchText.value)
})

const addTocart  = (product) => {
  cartStore.addToCart(product)
  router.push({name:'cart'})
}
</script>

<template>
  <UserLayout>
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6 rounded-3xl bg-slate-50 p-6 border border-slate-100">
        <h1 class="text-3xl font-bold text-black">Search: <span class="text-slate-600">{{ searchText }}</span></h1>
      </div>
      <Product :products="filterProducts"
                      :add-tocart="addTocart"
      ></Product>
    </div>
  </UserLayout>
</template>