<template>
  <div class="order-management">
    <el-card class="toolbar-card">
      <div class="toolbar">
        <el-button type="primary" @click="handleCreateOrder">
          <el-icon><Plus /></el-icon>
          创建订单
        </el-button>
        <el-input
          v-model="searchKeyword"
          placeholder="搜索订单..."
          style="width: 300px"
          clearable
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button @click="handleSearch">
              <el-icon><Search /></el-icon>
            </el-button>
          </template>
        </el-input>
      </div>
    </el-card>
    <el-card class="table-card">
      <el-table :data="filteredOrders" stripe style="width: 100%">
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
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleViewDetail(scope.row)">
              <el-icon><View /></el-icon>
              查看详情
            </el-button>
            <el-button type="danger" size="small" @click="handleCancelOrder(scope.row)">
              <el-icon><Close /></el-icon>
              取消订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="订单详情" width="600px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="订单编号">{{ currentOrder.id }}</el-descriptions-item>
        <el-descriptions-item label="客户名称">{{ currentOrder.customer }}</el-descriptions-item>
        <el-descriptions-item label="订单金额">{{ currentOrder.amount }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">
          <el-tag :type="getStatusType(currentOrder.status)">
            {{ currentOrder.status }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ currentOrder.createTime }}</el-descriptions-item>
        <el-descriptions-item label="订单备注">
          {{ currentOrder.remark || '无' }}
        </el-descriptions-item>
      </el-descriptions>
      <div style="margin-top: 20px">
        <h4>订单商品</h4>
        <el-table :data="currentOrder.items" stripe style="width: 100%">
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="quantity" label="数量" />
          <el-table-column prop="price" label="单价" />
          <el-table-column prop="total" label="小计" />
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, Search, View, Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const searchKeyword = ref('')
const dialogVisible = ref(false)

const orders = ref([
  { 
    id: 'ORD-202401001', 
    customer: '张三', 
    amount: '¥1,280', 
    status: '已发货', 
    createTime: '2024-01-15 14:30',
    remark: '加急订单',
    items: [
      { name: '男士T恤', quantity: 2, price: '¥199', total: '¥398' },
      { name: '休闲牛仔裤', quantity: 3, price: '¥259', total: '¥777' },
      { name: '时尚卫衣', quantity: 1, price: '¥229', total: '¥229' }
    ]
  },
  { 
    id: 'ORD-202401002', 
    customer: '李四', 
    amount: '¥2,560', 
    status: '待发货', 
    createTime: '2024-01-15 13:45',
    items: [
      { name: '女士连衣裙', quantity: 4, price: '¥299', total: '¥1,196' },
      { name: '女士短裙', quantity: 8, price: '¥159', total: '¥1,272' }
    ]
  },
  { 
    id: 'ORD-202401003', 
    customer: '王五', 
    amount: '¥890', 
    status: '已完成', 
    createTime: '2024-01-15 12:15',
    items: [
      { name: '男士T恤', quantity: 5, price: '¥178', total: '¥890' }
    ]
  },
  { 
    id: 'ORD-202401004', 
    customer: '赵六', 
    amount: '¥3,420', 
    status: '已付款', 
    createTime: '2024-01-15 11:20',
    items: [
      { name: '男士西装', quantity: 4, price: '¥855', total: '¥3,420' }
    ]
  },
  { 
    id: 'ORD-202401005', 
    customer: '孙七', 
    amount: '¥1,680', 
    status: '待付款', 
    createTime: '2024-01-15 10:05',
    items: [
      { name: '运动夹克', quantity: 2, price: '¥399', total: '¥798' },
      { name: '女士衬衫', quantity: 6, price: '¥147', total: '¥882' }
    ]
  }
])

const currentOrder = ref({})

const filteredOrders = computed(() => {
  if (!searchKeyword.value) {
    return orders.value
  }
  return orders.value.filter(order => 
    order.id.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

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

const handleCreateOrder = () => {
  ElMessage.info('创建订单功能开发中')
}

const handleViewDetail = (row) => {
  currentOrder.value = row
  dialogVisible.value = true
}

const handleCancelOrder = (row) => {
  if (row.status === '已完成' || row.status === '已发货') {
    ElMessage.error('已完成或已发货的订单不能取消')
    return
  }
  
  ElMessage.confirm('确定要取消这个订单吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = orders.value.findIndex(o => o.id === row.id)
    if (index > -1) {
      orders.value[index].status = '已取消'
      ElMessage.success('订单已取消')
    }
  })
}

const handleSearch = () => {
  // 搜索逻辑已在 computed 中处理
}
</script>

<style scoped>
.order-management {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.toolbar {
  display: flex;
  gap: 20px;
  align-items: center;
}

.table-card {
  margin-top: 20px;
}
</style>
