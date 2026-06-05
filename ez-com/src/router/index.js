import { createRouter, createWebHistory } from "vue-router";
import { useAccountStore } from "@/stores/account";
import HomeView from "../views/users/HomeView.vue";
// ... (rest of imports)

// (keep all current imports)
import CartView from "@/views/users/CartView.vue";
import CheckoutView from "@/views/users/CheckoutView.vue";
import ProfileView from "@/views/users/ProfileView.vue";
import SearchView from "@/views/users/SearchView.vue";
import SuccessView from "@/views/users/SuccessView.vue";
import RegisterView from "@/views/users/RegisterView.vue";

import LoginView from "@/views/admin/LoginView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";

import AdminProductList from "@/views/admin/product/ListView.vue";
import AdminProductUpdate from "@/views/admin/product/UpdateView.vue";

import UserListView from "@/views/admin/user/ListView.vue";
import UserUpdateView from "@/views/admin/user/UpdateView.vue";

import OrderDetailView from "@/views/admin/order/DetailView.vue";
import OrderListView from "@/views/admin/order/ListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/success",
      name: "success",
      component: SuccessView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },

    {
      path: "/admin/login",
      name: "admin-login",
      component: LoginView,
    },
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: DashboardView,
    },
    {
      path: "/admin/products/creates",
      name: "admin-products-list",
      component: AdminProductList,
    },
    {
      path: "/admin/product/create",
      name: "admin-product-create",
      component: AdminProductUpdate,
    },
    {
      path: "/admin/products/create/:id",
      name: "admin-products-update",
      component: AdminProductUpdate,
    },

     {
      path: "/admin/uesrs",
      name: "admin-users-list",
      component: UserListView,
    },
    {
      path: "/admin/users/update/:id",
      name: "admin-users-update",
      component: UserUpdateView,
    },

      {
      path: "/admin/orders",
      name: "admin-orders-list",
      component: OrderListView,
    },
    {
      path: "/admin/orders/detail/:id",
      name: "admin-orders-detail",
      component: OrderDetailView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const accountStore = useAccountStore()
  await accountStore.checkAuth()

  const isAdminRoute = to.path.startsWith('/admin')
  const isLoginPage = to.name === 'admin-login'

  if (isAdminRoute && !isLoginPage) {
    if (!accountStore.isLoggedIn) {
      next({ name: 'admin-login' })
    } else if (accountStore.role !== 'admin') {
      next({ name: 'home' })
    } else {
      next()
    }
  } else if (isLoginPage && accountStore.isLoggedIn && accountStore.role === 'admin') {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router;
