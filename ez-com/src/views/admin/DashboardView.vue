<script setup>
import { onMounted, computed } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAdminProductStore } from '@/stores/user/admin/product';
import { useAdminOrderStore } from '@/stores/user/admin/order';
import { useAdminUserStore } from '@/stores/user/admin/user';

const adminProductStore = useAdminProductStore()
const adminOrderStore = useAdminOrderStore()
const adminUserStore = useAdminUserStore()

onMounted(async () => {
    await Promise.all([
        adminProductStore.loadProducts(),
        adminOrderStore.loadOrders(),
        adminUserStore.loadUsers()
    ])
})

const totalOrders = computed(() => adminOrderStore.list.length)
const totalProducts = computed(() => adminProductStore.list.length)
const totalUsers = computed(() => adminUserStore.list.length)

// Calculate total sales from all orders
const totalSales = computed(() => {
    return adminOrderStore.list.reduce((acc, order) => {
        return acc + (parseFloat(order.totalPrice) || 0)
    }, 0).toLocaleString()
})

const priceChart = {
    options: {
        chart: {
            id: 'vuechart-example'
        },
        xaxis: {
            categories: ['Orders', 'Products', 'Users']
        },
    },
    series: [
        {
            name: 'Total Count',
            data: [totalOrders.value, totalProducts.value, totalUsers.value]
        },
    ]
}

const categorytChart = {
    options: {
        labels: ['Active Users', 'Inactive Users']
    },
    series: [
        adminUserStore.list.filter(u => u.status === 'active').length,
        adminUserStore.list.filter(u => u.status === 'inactive').length
    ]
}
</script>

<template>
    <AdminLayout>
        <div class="text-3xl my-4 font-bold">Dashboard</div>

        <div class="stats shadow w-full mb-8 bg-white">
            <div class="stat">
                <div class="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div class="stat-title text-slate-500">Total Sales</div>
                <div class="stat-value text-primary">${{ totalSales }}</div>
                <div class="stat-desc text-slate-400">Total revenue from all orders</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                </div>
                <div class="stat-title text-slate-500">Orders</div>
                <div class="stat-value text-secondary">{{ totalOrders }}</div>
                <div class="stat-desc text-slate-400">Total orders placed</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                </div>
                <div class="stat-title text-slate-500">Products</div>
                <div class="stat-value text-accent">{{ totalProducts }}</div>
                <div class="stat-desc text-slate-400">Items in catalog</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div class="stat-title text-slate-500">Users</div>
                <div class="stat-value text-info">{{ totalUsers }}</div>
                <div class="stat-desc text-slate-400">Registered customers</div>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-4">
            <div class="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 class="font-bold mb-4 text-slate-700">Platform Overview</h3>
                <apexchart type="bar" :options="priceChart.options" :series="[{ name: 'Total Count', data: [totalOrders, totalProducts, totalUsers] }]"></apexchart>
            </div>
            <div class="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 class="font-bold mb-4 text-slate-700">User Status</h3>
                <apexchart type="donut" :options="categorytChart.options" :series="categorytChart.series"></apexchart>
            </div>
        </div>
    </AdminLayout>
</template>