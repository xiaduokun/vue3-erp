<template>
  <div class="product-management">
    <el-card class="toolbar-card">
      <div class="toolbar">
        <el-button type="primary" @click="handleAddProduct">
          <el-icon><Plus /></el-icon>
          添加商品
        </el-button>
        <el-input
          v-model="searchKeyword"
          placeholder="搜索商品..."
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
      <el-table :data="filteredProducts" stripe style="width: 100%">
        <el-table-column prop="id" label="商品ID" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="category" label="分类" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="stock" label="库存" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '在售' ? 'success' : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="商品信息" width="500px">
      <el-form :model="productForm" ref="productFormRef" :rules="rules" label-width="100px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="productForm.name" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="productForm.category" placeholder="请选择分类">
            <el-option label="男装" value="男装" />
            <el-option label="女装" value="女装" />
            <el-option label="童装" value="童装" />
            <el-option label="配饰" value="配饰" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="productForm.price" :min="0" step="0.01" />
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input-number v-model="productForm.stock" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="productForm.status" active-text="在售" inactive-text="下架" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Plus, Search, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const searchKeyword = ref('')
const dialogVisible = ref(false)
const productFormRef = ref(null)

const products = ref([
  { id: 'P001', name: '男士T恤', category: '男装', price: 199, stock: 150, status: '在售' },
  { id: 'P002', name: '女士连衣裙', category: '女装', price: 299, stock: 80, status: '在售' },
  { id: 'P003', name: '休闲牛仔裤', category: '男装', price: 259, stock: 120, status: '在售' },
  { id: 'P004', name: '时尚卫衣', category: '男装', price: 229, stock: 90, status: '在售' },
  { id: 'P005', name: '女士衬衫', category: '女装', price: 189, stock: 60, status: '下架' },
  { id: 'P006', name: '运动夹克', category: '男装', price: 399, stock: 70, status: '在售' },
  { id: 'P007', name: '女士短裙', category: '女装', price: 159, stock: 100, status: '在售' },
  { id: 'P008', name: '男士西装', category: '男装', price: 899, stock: 40, status: '在售' }
])

const productForm = reactive({
  id: '',
  name: '',
  category: '',
  price: 0,
  stock: 0,
  status: true
})

const rules = {
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '请输入库存', trigger: 'blur' }
  ]
}

const filteredProducts = computed(() => {
  if (!searchKeyword.value) {
    return products.value
  }
  return products.value.filter(product => 
    product.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    product.category.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

const handleAddProduct = () => {
  productForm.id = ''
  productForm.name = ''
  productForm.category = ''
  productForm.price = 0
  productForm.stock = 0
  productForm.status = true
  dialogVisible.value = true
}

const handleEdit = (row) => {
  productForm.id = row.id
  productForm.name = row.name
  productForm.category = row.category
  productForm.price = row.price
  productForm.stock = row.stock
  productForm.status = row.status === '在售'
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessage.confirm('确定要删除这个商品吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = products.value.findIndex(p => p.id === row.id)
    if (index > -1) {
      products.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

const handleSearch = () => {
  // 搜索逻辑已在 computed 中处理
}

const handleSave = async () => {
  if (!productFormRef.value) return
  
  await productFormRef.value.validate((valid) => {
    if (valid) {
      if (productForm.id) {
        // 更新
        const index = products.value.findIndex(p => p.id === productForm.id)
        if (index > -1) {
          products.value[index] = {
            ...productForm,
            status: productForm.status ? '在售' : '下架'
          }
          ElMessage.success('更新成功')
        }
      } else {
        // 添加
        const newProduct = {
          id: 'P' + (products.value.length + 1).toString().padStart(3, '0'),
          ...productForm,
          status: productForm.status ? '在售' : '下架'
        }
        products.value.push(newProduct)
        ElMessage.success('添加成功')
      }
      dialogVisible.value = false
    }
  })
}
</script>

<style scoped>
.product-management {
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
