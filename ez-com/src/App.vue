<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/user/cart';
import { onMounted } from 'vue';
import { useProductStore } from './stores/user/product';

const cartStore = useCartStore()
const productStore = useProductStore()


onMounted(() =>{
  cartStore.loadCart()
  productStore.loadProducts()
})
</script>

<template>
  <RouterView></RouterView>
</template>