<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAdminUserStore } from '@/stores/user/admin/user';
import { reactive, onMounted, ref } from 'vue';
import { useRoute ,useRouter} from 'vue-router';
const formData = [
    {
        name: "Name",
        field: 'name',
        type: 'text'

    },
    {
        name: "Role",
        field: 'role',
        type: 'select',
        dropdownList: ['admin', 'moderator', 'user']
    },
    {
        name: 'Status',
        field: 'status',
        type: 'select',
        dropdownList: ['active', 'inactive']
    }
]

const adminUserStore = useAdminUserStore()
const route = useRoute()
const router = useRouter()

const userIndex = ref(-1)
const userData = reactive({
    name: "",
    role: '',
    status: ""
})

onMounted(()=>{
     if (route.params.id) {
        userIndex.value = parseInt(route.params.id)
        const selectedUser = adminUserStore.getUser(userIndex.value)

        userData.name = selectedUser.name
        userData.role = selectedUser.role
        userData.status = selectedUser.status
    }
})
const updateUser = () => {
   adminUserStore.updateUser(userIndex.value,userData)
   router.push({name:'admin-users-list'})
}
</script>
<template>
    <AdminLayout>
        <div class="shadow-xl p-8 mt-4">
            <div class="text-1xl font-bold">Update User</div>
            <div class="divider"></div>
            <div class="grid grid-cols-1 gap-2">
                <fieldset class="fieldset w-full" v-for="form in formData">
                    <legend class="fieldset-legend">{{ form.name }}</legend>

                    <input type="text" class="input w-full" v-if="form.type === 'text'"
                        v-model="userData[form.field]" />

                    <select class="input w-full" v-if="form.type === 'select'" v-model="userData[form.field]">
                        <option v-for="i in form.dropdownList">
                            {{ i }}
                        </option>
                    </select>
                </fieldset>
            </div>


            <div class="flex justify-end  mt-4">
                <button class="btn btn-ghost">Back</button>
                <button class="btn btn-ghost" @click="updateUser()">Update</button>
            </div>
        </div>
    </AdminLayout>

</template>