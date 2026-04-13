import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: '/product',
        name: 'Product',
        component: () => import('../views/ProductManagement.vue')
      },
      {
        path: '/inventory',
        name: 'Inventory',
        component: () => import('../views/InventoryManagement.vue')
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('../views/OrderManagement.vue')
      },
      {
        path: '/customer',
        name: 'Customer',
        component: () => import('../views/CustomerManagement.vue')
      },
      {
        path: '/supplier',
        name: 'Supplier',
        component: () => import('../views/SupplierManagement.vue')
      },
      {
        path: '/big-screen',
        name: 'BigScreen',
        component: () => import('../views/BigScreen.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.isLoggedIn || !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
