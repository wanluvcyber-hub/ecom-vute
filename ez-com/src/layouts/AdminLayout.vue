<script setup>
 import router from '@/router';
import { RouterLink,useRoute} from 'vue-router';
import { ref,onMounted } from 'vue';

 const menus = [
    {
        name:'Dashboard',
        routeName:'admin-dashboard'
    },
    {
        name:'User',
        routeName:'admin-users-list'
    },
    {
        name:'Product',
        routeName:'admin-products-list'
    },
    {
        name:'Order',
        routeName:'admin-orders-list'
    },
    {
        name:'Logout',
        routeName:'admin-login'
    }
 ]

 const activeMenu = ref(''
    
 )

 const route = useRoute()

 onMounted (()=>{
    activeMenu.value = route.name
 })
</script>
<template>
    <div>
        <div class="drawer drawer-open">
              <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content mx-4">
                    <slot></slot>
                </div>
            <div class="drawer-side">
                <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
                <ul class="menu bg-base-200 min-h-full w-80 p-4">
                    <!-- Sidebar content here -->
                    <li class="text-3xl"><a>KADMIN XXX 1</a></li>
                    <li v-for="menu in menus">
                        <RouterLink 
                        :class="menu.routeName === activeMenu ? 'active' : '' "
                        :to="{name:menu.routeName}">
                        {{ menu.name }}</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>