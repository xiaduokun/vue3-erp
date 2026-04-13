<template>
  <div class="inventory-management">
    <el-card class="toolbar-card">
      <div class="toolbar">
        <el-button type="success" @click="handleInStock">
          <el-icon><Plus /></el-icon>
          入库
        </el-button>
        <el-button type="primary" @click="handleOutStock">
          <el-icon><Minus /></el-icon>
          出库
        </el-button>
        <el-input
          v-model="searchKeyword"
          placeholder="搜索库存..."
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
      <el-table :data="filteredInventory" stripe style="width: 100%">
        <el-table-column prop="id" label="商品ID" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="category" label="分类" />
        <el-table-column prop="currentStock" label="当前库存" />
        <el-table-column prop="safeStock" label="安全库存" />
        <el-table-column prop="stockStatus" label="库存状态">
          <template #default="scope">
            <el-tag :type="scope.row.stockStatus === '库存充足' ? 'success' : 'danger'">
              {{ scope.row.stockStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleViewDetail(scope.row)">
              <el-icon><View /></el-icon>
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="stockForm" ref="stockFormRef" :rules="rules" label-width="100px">
        <el-form-item label="商品名称">
          <el-select v-model="stockForm.productId" placeholder="请选择商品" disabled>
            <el-option
              v-for="product in products"
              :key="product.id"
              :label="product.name"
              :value="product.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="当前库存">
          <el-input v-model="stockForm.currentStock" disabled />
        </el-form-item>
        <el-form-item label="操作数量" prop="quantity">
          <el-input-number v-model="stockForm.quantity" :min="1" />
        </el-form-item>
        <el-form-item label="操作原因" prop="reason">
          <el-input v-model="stockForm.reason" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveStock">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Plus, Minus, Search, View } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const searchKeyword = ref('')
const dialogVisible = ref(false)
const stockFormRef = ref(null)
const dialogTitle = ref('')

const products = ref([
  { id: 'P001', name: '男士T恤', category: '男装', currentStock: 150, safeStock: 50 },
  { id: 'P002', name: '女士连衣裙', category: '女装', currentStock: 80, safeStock: 40 },
  { id: 'P003', name: '休闲牛仔裤', category: '男装', currentStock: 120, safeStock: 60 },
  { id: 'P004', name: '时尚卫衣', category: '男装', currentStock: 90, safeStock: 30 },
  { id: 'P005', name: '女士衬衫', category: '女装', currentStock: 60, safeStock: 40 },
  { id: 'P006', name: '运动夹克', category: '男装', currentStock: 70, safeStock: 50 },
  { id: 'P007', name: '女士短裙', category: '女装', currentStock: 100, safeStock: 30 },
  { id: 'P008', name: '男士西装', category: '男装', currentStock: 20, safeStock: 30 }
])

const inventory = ref([
  { id: 'P001', name: '男士T恤', category: '男装', currentStock: 150, safeStock: 50, stockStatus: '库存充足' },
  { id: 'P002', name: '女士连衣裙', category: '女装', currentStock: 80, safeStock: 40, stockStatus: '库存充足' },
  { id: 'P003', name: '休闲牛仔裤', category: '男装', currentStock: 120, safeStock: 60, stockStatus: '库存充足' },
  { id: 'P004', name: '时尚卫衣', category: '男装', currentStock: 90, safeStock: 30, stockStatus: '库存充足' },
  { id: 'P005', name: '女士衬衫', category: '女装', currentStock: 60, safeStock: 40, stockStatus: '库存充足' },
  { id: 'P006', name: '运动夹克', category: '男装', currentStock: 70, safeStock: 50, stockStatus: '库存充足' },
  { id: 'P007', name: '女士短裙', category: '女装', currentStock: 100, safeStock: 30, stockStatus: '库存充足' },
  { id: 'P008', name: '男士西装', category: '男装', currentStock: 20, safeStock: 30, stockStatus: '库存不足' }
])

const stockForm = reactive({
  productId: '',
  currentStock: 0,
  quantity: 1,
  reason: ''
})

const rules = {
  quantity: [
    { required: true, message: '请输入操作数量', trigger: 'blur' }
  ],
  reason: [
    { required: true, message: '请输入操作原因', trigger: 'blur' }
  ]
}

const filteredInventory = computed(() => {
  if (!searchKeyword.value) {
    return inventory.value
  }
  return inventory.value.filter(item => 
    item.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    item.category.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

const handleInStock = () => {
  dialogTitle.value = '商品入库'
  stockForm.productId = ''
  stockForm.currentStock = 0
  stockForm.quantity = 1
  stockForm.reason = ''
  dialogVisible.value = true
}

const handleOutStock = () => {
  dialogTitle.value = '商品出库'
  stockForm.productId = ''
  stockForm.currentStock = 0
  stockForm.quantity = 1
  stockForm.reason = ''
  dialogVisible.value = true
}

const handleViewDetail = (row) => {
  ElMessage.info(`查看商品 ${row.name} 的库存详情`)
}

const handleSearch = () => {
  // 搜索逻辑已在 computed 中处理
}

const handleSaveStock = async () => {
  if (!stockFormRef.value) return
  
  await stockFormRef.value.validate((valid) => {
    if (valid) {
      const product = products.value.find(p => p.id === stockForm.productId)
      if (product) {
        if (dialogTitle.value === '商品入库') {
          product.currentStock += stockForm.quantity
        } else {
          if (product.currentStock < stockForm.quantity) {
            ElMessage.error('库存不足')
            return
          }
          product.currentStock -= stockForm.quantity
        }
        
        // 更新库存状态
        const inventoryItem = inventory.value.find(i => i.id === stockForm.productId)
        if (inventoryItem) {
          inventoryItem.currentStock = product.currentStock
          inventoryItem.stockStatus = product.currentStock >= product.safeStock ? '库存充足' : '库存不足'
        }
        
        ElMessage.success(`${dialogTitle.value}成功`)
        dialogVisible.value = false
      }
    }
  })
}
</script>

<style scoped>
.inventory-management {
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
