<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAdminProductStore } from '@/stores/user/admin/product';
import { ref } from 'vue';
import Edit from '@/icons/Edit.vue';
import Trash from '@/icons/Trash.vue';
import { RouterLink } from 'vue-router';
import {
    onMounted
} from 'vue';
import Table from '@/icons/Table.vue';
const adminProduct = useAdminProductStore()

onMounted(() => {
    adminProduct.loadProducts()
})


const removeProduct = (index) => {
    adminProduct.removeProduct(index)
}
</script>

<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-4">
            <div class="text-3xl">Product</div>
            <div>
                <RouterLink :to="{ name: 'admin-product-create' }" class="btn btn-neutral">Add new</RouterLink>
            </div>
        </div>

        <div class="overflow-x-auto">
            <Table :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'Updated', '']">

                <tr v-for="(product, index) in adminProduct.list" :key="index">
                    <th>{{ product.name }}</th>
                    <td>
                        <img :src="product.imageUrl" class="w-12">
                    </td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.remainQuantiy }}/{{ product.quantity }}</td>
                    <td>
                        <div class='badge'
                            :class="String(product.status).trim().toLowerCase() === 'open' ? 'badge-success' : 'badge-error'">
                            {{ product.status }}
                        </div>
                    </td>
                    <td>{{ product.updatedAt }}</td>
                    <td>
                        <div class='flex gap-2 items-center'>
                            <RouterLink :to="{ name: 'admin-products-update', params: { id: index } }"
                                class="btn btn-ghost btn-sm">
                                <Edit class="w-5 h-5"></Edit>
                            </RouterLink>
                            <div class="btn btn-ghost btn-sm" @click="removeProduct(index)">
                                <Trash class="w-5 h-5"></Trash>
                            </div>
                        </div>
                    </td>
                </tr>

            </Table>
        </div>
    </AdminLayout>
</template>