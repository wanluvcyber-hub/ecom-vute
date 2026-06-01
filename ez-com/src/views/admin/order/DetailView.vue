<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { ref, reactive } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminOrderStore } from '@/stores/user/admin/order';
import { RouterLink } from 'vue-router';

const orderIndex = ref(-1)
const orderData = ref({
    products: []
})

const route = useRoute()
const adminOrderStore = useAdminOrderStore()

onMounted(() => {
    if (route.params.id) {
        orderIndex.value = parseInt(route.params.id)
        const selectedOrder = adminOrderStore.getOrder(orderIndex.value)
        orderData.value = selectedOrder
    }
})


</script>
<template>
    <AdminLayout>

        <div class="shadow-xl p-8 mt-4">
            <div class="text-1xl font-bold">Order Detail id: {{ orderIndex }}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <div class="font-bolds">Order date</div>
                    <div>{{ orderData.updatedAt}}</div>
                </div>
                    <div>
                    <div class="font-bolds">Order number</div>
                    <div>{{ orderData.no}}</div>
                </div>
                    <div>
                    <div class="font-bolds">Payment method</div>
                    <div>{{ orderData.paymentMethod}}</div>
                </div>
                <div>
                    <div class="font-bolds">Address</div>
                    <div>{{ orderData.address}}</div>
                </div>
            </div>
            <div class="divider"></div>
            <div v-for="product in orderData.products" class="grid grid-cols-4">
                <div><img :src="product.imageUrl" ></div>
                <div>
                    <div class="font-bold">{{ product.name }}</div>
                    <div>{{ product.description }}</div>
                </div>
                <div>
                    {{ product.quantity }}
                </div>
                <div>
                    {{ product.price }}
                </div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div>ราคสินค้าทั้งหมด</div>
                <div>{{ orderData.totalPrice }}</div>
            </div>
             <div class="flex justify-end mt-4">
                <RouterLink :to="{name:'admin-orders-list'}" class="btn btn-ghost ">back</RouterLink>
            </div>
        </div>

    </AdminLayout>

</template>