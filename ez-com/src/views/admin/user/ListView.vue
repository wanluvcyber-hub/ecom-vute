<script setup>
 import AdminLayout from '@/layouts/AdminLayout.vue';
import Edit from '@/icons/Edit.vue';
import Trash from '@/icons/Trash.vue';
import Table from '@/icons/Table.vue';
import { RouterLink } from 'vue-router';

import { onMounted } from 'vue';
import { useAdminUserStore } from '@/stores/user/admin/user';

const adminUserStore = useAdminUserStore()

onMounted(() => {
    adminUserStore.loadUsers()
})

const changeStatus = async (index) =>{
    let selectedUser = adminUserStore.list[index]
    const newStatus = selectedUser.status === 'active' ? 'inactive' : 'active'
    await adminUserStore.updateUser(index, { ...selectedUser, status: newStatus })
}
</script>
<template>
    <AdminLayout>
                <div class="flex items-center justify-between my-4">
            <div class="text-3xl">User</div>
            <div>
                <RouterLink :to="{ name: 'admin-product-create' }" class="btn btn-neutral">Add new</RouterLink>
            </div>
        </div>

                <Table :headers="['Name','Role','Status','Update At']">
                    <tr v-for="(user,index) in adminUserStore.list">
                        <td>{{ user.name }}</td>
                        <td>{{ user.role }}</td>
                        <td>{{ user.status }}</td>
                        <td>{{ user.updatedAt }}</td>
                        <td>
                            <div class="flex gap-2">
                                <RouterLink 
                                :to="{name:'admin-users-update',params:{id:index}}"    
                                class="btn">Edit
                            </RouterLink>
                                <button class="btn" @click="changeStatus(index)">
                                    {{ user.status === 'active'?'Disable':'Enable' }}
                                </button>
                            </div>
                        </td>
                    </tr>
                </Table>
    </AdminLayout>

</template>