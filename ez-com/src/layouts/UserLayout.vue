<script setup>
import { RouterView,useRouter } from 'vue-router';
import { ref ,onMounted,} from 'vue';
import { useCartStore } from '@/stores/user/cart';

import { useAccountStore } from '@/stores/account';

const cartStore = useCartStore()
const accountStore = useAccountStore()
const searchText = ref('')
const router = useRouter()

const login = () => {
    router.push({ name: 'admin-login' })
}

const logout = async () => {
    await accountStore.logout()
    cartStore.clearCart()
    window.location.reload()
}

onMounted(async () => {
    await accountStore.checkAuth()
})

const handleSearch = (event) =>{
    if (event.key === 'Enter'){
            router.push({
                name:'search',
                query:{
                    q:searchText.value
                }
            })
        
    }
}

</script>
<template>
    <div class="container mx-auto">
        <div class="navbar bg-base-100 shadow-sm">
            <div class="flex-1">
                <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl">Apicahit Shop</RouterLink>
            </div>
            <div class="flex items-center gap-2">
                <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto"
                 v-model="searchText"
                 @keyup="handleSearch"/>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="badge badge-sm indicator-item">{{ cartStore.summaryQuantity }}</span>
                        </div>
                    </div>
                    <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div class="card-body">
                            <span class="text-lg font-bold">{{ cartStore.summaryQuantity }}Items</span>
                            <span class="text-info">Subtotal: $ {{ cartStore.summaryPrice }}</span>
                            <div class="card-actions">
                                <RouterLink :to="{ name: 'cart' }" class="btn btn-primary btn-block">View cart</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button @click="login" v-if="!accountStore.isLoggedIn" class="btn btn-ghost">
                        Login
                    </button>

                    <div v-else class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component"
                                    src="https://scontent.fphs3-1.fna.fbcdn.net/v/t39.30808-6/706064615_122315223392008333_6277296808766203873_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFyDSoaImA0iuWPNCIBOgiAYpDNAy_JMcxikM0DL8kxzDITXcKux3ynUCSXqBft1000dBcTxDiYlxnD6iavB33z&_nc_ohc=eEUZnYK-Dm4Q7kNvwEhSB7k&_nc_oc=AdonbeN8s_gcwpIHVSfPcwHTKOv11KDtUrhw8CYPjxNspyqs_vPmuiIKN_lVf6PibKGFns2MVA-JKuYFvq4bAVPD&_nc_zt=23&_nc_ht=scontent.fphs3-1.fna&_nc_gid=-wozZQDhTsmwreBQO0ucwA&_nc_ss=7b2a8&oh=00_Af7PBRRQhHLRs5p57PtRsWTb4DMxG_L3o3BPK7Juqz0WUQ&oe=6A1878A1" />
                            </div>
                        </div>
                        <ul tabindex="-1"
                            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <RouterLink :to="{ name: 'profile' }">
                                    Profile

                                </RouterLink>
                            </li>

                            <li><a @click="logout">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <slot></slot>
        <!--  -->
        <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <nav>
                <h6 class="footer-title">Services</h6>
                <a class="link link-hover">Branding</a>
                <a class="link link-hover">Design</a>
                <a class="link link-hover">Marketing</a>
                <a class="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 class="footer-title">Company</h6>
                <a class="link link-hover">About us</a>
                <a class="link link-hover">Contact</a>
                <a class="link link-hover">Jobs</a>
                <a class="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 class="footer-title">Legal</h6>
                <a class="link link-hover">Terms of use</a>
                <a class="link link-hover">Privacy policy</a>
                <a class="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    </div>
</template>