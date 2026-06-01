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
const products = ref([
    {
        name: 'test',
        image: 'https://scontent.fphs3-1.fna.fbcdn.net/v/t39.30808-1/706064615_122315223392008333_6277296808766203873_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_ohc=xCj11IErvUgQ7kNvwH_T6es&_nc_oc=AdoDExBmd7OJYBVZ2tnI38ygDthdPTlnqCCN_HnYby5Mp7n7wdOF6MXzssp1imYbP9FIcPkUXXq5jKQTa88EalNg&_nc_zt=24&_nc_ht=scontent.fphs3-1.fna&_nc_gid=rbxch97eJ-8LVG4CsvqF9Q&_nc_ss=782a8&oh=00_Af41yJr_mlhhF5o1CnFJmzu-X-4T3CVV6dJ7t3dX5AoqQQ&oe=6A1D8346',
        price: 200,
        quantity: 20,
        remainQuantiy: 11,
        status: 'open',
        updatedAt: (new Date()).toISOString()
    }
])

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