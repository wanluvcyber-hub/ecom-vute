<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { onMounted, reactive } from 'vue';
import { useAdminProductStore } from '@/stores/user/admin/product';
import router from '@/router';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const formData = [
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Image',
        field: 'imageUrl'
    },
    {
        name: 'Price',
        field: 'price'
    },
    {
        name: 'Quantity',
        field: 'quantity'
    },
    {
        name: 'About',
        field: 'About'
    }
]

const adminProduct = useAdminProductStore()
const updateProduct = async () => {
    // Ensure status is lowercase to match DB check constraint
    productData.status = String(productData.status).toLowerCase()
    
    if (mode.value === 'EDIT') {
        await adminProduct.updateProduct(productIndex.value, productData)
    } else {
        await adminProduct.addProduct(productData)
    }

    router.push({ name: 'admin-products-list' })
}

const productData = reactive({
    name: '',
    imageUrl: '', // Fixed capitalization
    price: 0,
    quantity: 0,
    about: '',
    status: 'open' // Default value
})

const productIndex = ref(-1)
const mode = ref('ADD')
const route = useRoute()

onMounted(() => {
    if (route.params.id) {
        productIndex.value = parseInt(route.params.id)
        mode.value = 'EDIT'
    }

    const selectedProduct = adminProduct.getProducts(productIndex.value)
    productData.name = selectedProduct.name
    productData.imageUrl = selectedProduct.imageUrl
    productData.price = selectedProduct.price
    productData.quantity = selectedProduct.quantity
    productData.about = selectedProduct.about
    productData.status = selectedProduct.status
})

</script>
<template>
    <AdminLayout>
        <div class="shadow-xl p-8 mt-4">
            <div class="text-1xl font-bold">{{ mode }}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <fieldset class="fieldset w-full" v-for="form in formData">
                    <legend class="fieldset-legend">{{ form.name }}</legend>
                    <input type="text" class="input w-full" v-model="productData[form.field]" />
                </fieldset>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Status</legend>
                    <select class="select" v-model="productData.status">
                        <option disabled selected>Pick a Status</option>
                        <option>Open</option>
                        <option>Close</option>

                    </select>
                </fieldset>
            </div>
            <div class="flex justify-end  mt-4">
                <button class="btn btn-ghost">Back</button>
                <button class="btn btn-ghost" @click="updateProduct()">{{ mode }}</button>
            </div>
        </div>
    </AdminLayout>

</template>