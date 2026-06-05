<script setup>
    import { onMounted } from 'vue';
    import AdminLayout from '@/layouts/AdminLayout.vue';
    import Table from '@/icons/Table.vue';
    import { useAdminOrderStore } from '@/stores/user/admin/order';
    import { RouterLink } from 'vue-router';

    const adminOrderStore = useAdminOrderStore()

    onMounted(() => {
        adminOrderStore.loadOrders()
    })
</script>
<template>
    <AdminLayout>
                 <div class="flex items-center justify-between my-4">
            <div class="text-3xl">Order</div>
    </div>
    <Table :headers="['Customer Name','Price','Status','UpdatedAt','']">
        <tr v-for="(order,index) in adminOrderStore.list">
            <td>{{ order.customerName }}</td>
            <td>{{ order.totalPrice}}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.updatedAt }}</td>
            <RouterLink class="btn"
            :to="{name:'admin-orders-detail',params:{id:index}}">
            See detail
            </RouterLink>
        </tr>
    </Table>

    </AdminLayout>

</template>