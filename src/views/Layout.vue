<template>
  <div class="layout-container">
    <el-container>
      <el-aside width="250px" class="sidebar">
        <div class="sidebar-header">
          <h3>{{ $t('layout.title') }}</h3>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          text-color="#ecf0f1"
          active-text-color="#3498db"
          background-color="#2c3e50"
          @select="handleMenuSelect"
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>{{ $t('layout.dashboard') }}</span>
          </el-menu-item>
          <el-menu-item index="/big-screen">
            <el-icon><Monitor /></el-icon>
            <span>{{ $t('bigScreen.title') }}</span>
          </el-menu-item>
          <el-menu-item index="/product">
            <el-icon><ShoppingBag /></el-icon>
            <span>{{ $t('layout.product') }}</span>
          </el-menu-item>
          <el-menu-item index="/inventory">
            <el-icon><Box /></el-icon>
            <span>{{ $t('layout.inventory') }}</span>
          </el-menu-item>
          <el-menu-item index="/order">
            <el-icon><Document /></el-icon>
            <span>{{ $t('layout.order') }}</span>
          </el-menu-item>
          <el-menu-item index="/customer">
            <el-icon><User /></el-icon>
            <span>{{ $t('layout.customer') }}</span>
          </el-menu-item>
          <el-menu-item index="/supplier">
            <el-icon><OfficeBuilding /></el-icon>
            <span>{{ $t('layout.supplier') }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-left">
            <h2>{{ getCurrentTitle() }}</h2>
          </div>
          <div class="header-right">
            <el-dropdown>
              <span class="user-info">
                <el-icon><User /></el-icon>
                <span>{{ userStore.username }}</span>
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleLogout">
                    <el-icon><Switch /></el-icon>
                    <span>{{ $t('layout.logout') }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
  House, ShoppingBag, Box, Document, User, OfficeBuilding, 
  ArrowDown, Switch, Monitor 
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()

const activeMenu = ref('/')

const getCurrentTitle = () => {
  const routes = {
    '/': 'dashboard.title',
    '/big-screen': 'bigScreen.title',
    '/product': 'product.title',
    '/inventory': 'inventory.title',
    '/order': 'order.title',
    '/customer': 'customer.title',
    '/supplier': 'supplier.title'
  }
  return t(routes[router.currentRoute.value.path] || 'dashboard.title')
}

const handleLogout = () => {
  userStore.logout()
  ElMessage.success(t('common.success'))
  router.push('/login')
}

const handleMenuSelect = (key) => {
  router.push(key)
}

onMounted(() => {
  activeMenu.value = router.currentRoute.value.path
  userStore.loadUserInfo()
})

router.beforeEach((to) => {
  activeMenu.value = to.path
})
</script>

<style scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  background: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 18px;
}

.sidebar-menu {
  border-right: none;
  flex: 1;
}

.header {
  background: white;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}

.header-left h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s;
}

.user-info:hover {
  background: #f5f5f5;
}

.main-content {
  padding: 20px;
  background: #f5f5f5;
}
</style>
