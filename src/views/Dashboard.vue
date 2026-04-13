<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6" v-for="stat in stats" :key="stat.label">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ $t(stat.label) }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>{{ $t('dashboard.charts.salesTrend') }}</h3>
            </div>
          </template>
          <div class="chart-placeholder">
            <el-skeleton :rows="5" animated />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>{{ $t('dashboard.charts.inventoryStatus') }}</h3>
            </div>
          </template>
          <div class="chart-placeholder">
            <el-skeleton :rows="5" animated />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="orders-card" style="margin-top: 20px">
      <template #header>
        <div class="card-header">
          <h3>{{ $t('dashboard.recentOrders') }}</h3>
        </div>
      </template>
      <el-table :data="recentOrders" stripe style="width: 100%">
        <el-table-column prop="id" label="订单编号" />
        <el-table-column prop="customer" label="客户名称" />
        <el-table-column prop="amount" label="订单金额" />
        <el-table-column prop="status" label="订单状态">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { value: 128, label: 'dashboard.stats.totalProducts' },
  { value: 5680, label: 'dashboard.stats.totalInventory' },
  { value: 326, label: 'dashboard.stats.totalOrders' },
  { value: 156, label: 'dashboard.stats.totalCustomers' }
])

const recentOrders = ref([
  { id: 'ORD-202401001', customer: '张三', amount: '¥1,280', status: '已发货', createTime: '2024-01-15 14:30' },
  { id: 'ORD-202401002', customer: '李四', amount: '¥2,560', status: '待发货', createTime: '2024-01-15 13:45' },
  { id: 'ORD-202401003', customer: '王五', amount: '¥890', status: '已完成', createTime: '2024-01-15 12:15' },
  { id: 'ORD-202401004', customer: '赵六', amount: '¥3,420', status: '已付款', createTime: '2024-01-15 11:20' },
  { id: 'ORD-202401005', customer: '孙七', amount: '¥1,680', status: '待付款', createTime: '2024-01-15 10:05' }
])

const getStatusType = (status) => {
  const statusMap = {
    '待付款': 'warning',
    '已付款': 'info',
    '待发货': 'danger',
    '已发货': 'success',
    '已完成': 'info'
  }
  return statusMap[status] || 'info'
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stat-card {
  height: 120px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 8px;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

.chart-card {
  height: 300px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.chart-placeholder {
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orders-card {
  margin-top: 20px;
}
</style>
