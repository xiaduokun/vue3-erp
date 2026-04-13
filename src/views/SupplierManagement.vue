<template>
  <div class="supplier-management">
    <el-card class="toolbar-card">
      <div class="toolbar">
        <el-button type="primary" @click="handleAddSupplier">
          <el-icon><Plus /></el-icon>
          添加供应商
        </el-button>
        <el-input
          v-model="searchKeyword"
          placeholder="搜索供应商..."
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
      <el-table :data="filteredSuppliers" stripe style="width: 100%">
        <el-table-column prop="id" label="供应商ID" />
        <el-table-column prop="name" label="供应商名称" />
        <el-table-column prop="contact" label="联系人" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="address" label="地址" />
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
    <el-dialog v-model="dialogVisible" title="供应商信息" width="500px">
      <el-form :model="supplierForm" ref="supplierFormRef" :rules="rules" label-width="100px">
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="supplierForm.name" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="supplierForm.contact" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="supplierForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="supplierForm.email" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="supplierForm.address" type="textarea" :rows="3" />
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
const supplierFormRef = ref(null)

const suppliers = ref([
  { id: 'S001', name: '广州服装有限公司', contact: '陈经理', phone: '13800138001', email: 'chen@example.com', address: '广州市海珠区' },
  { id: 'S002', name: '上海纺织品有限公司', contact: '李经理', phone: '13900139001', email: 'li@example.com', address: '上海市静安区' },
  { id: 'S003', name: '北京服饰有限公司', contact: '王经理', phone: '13700137001', email: 'wang@example.com', address: '北京市丰台区' },
  { id: 'S004', name: '深圳服装加工厂', contact: '赵经理', phone: '13600136001', email: 'zhao@example.com', address: '深圳市宝安区' },
  { id: 'S005', name: '杭州丝绸有限公司', contact: '孙经理', phone: '13500135001', email: 'sun@example.com', address: '杭州市余杭区' },
  { id: 'S006', name: '南京服装有限公司', contact: '周经理', phone: '13400134001', email: 'zhou@example.com', address: '南京市江宁区' },
  { id: 'S007', name: '成都服装有限公司', contact: '吴经理', phone: '13300133001', email: 'wu@example.com', address: '成都市武侯区' },
  { id: 'S008', name: '武汉服装加工厂', contact: '郑经理', phone: '13200132001', email: 'zheng@example.com', address: '武汉市汉阳区' }
])

const supplierForm = reactive({
  id: '',
  name: '',
  contact: '',
  phone: '',
  email: '',
  address: ''
})

const rules = {
  name: [
    { required: true, message: '请输入供应商名称', trigger: 'blur' }
  ],
  contact: [
    { required: true, message: '请输入联系人', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入电话', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' }
  ]
}

const filteredSuppliers = computed(() => {
  if (!searchKeyword.value) {
    return suppliers.value
  }
  return suppliers.value.filter(supplier => 
    supplier.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    supplier.phone.includes(searchKeyword.value)
  )
})

const handleAddSupplier = () => {
  supplierForm.id = ''
  supplierForm.name = ''
  supplierForm.contact = ''
  supplierForm.phone = ''
  supplierForm.email = ''
  supplierForm.address = ''
  dialogVisible.value = true
}

const handleEdit = (row) => {
  supplierForm.id = row.id
  supplierForm.name = row.name
  supplierForm.contact = row.contact
  supplierForm.phone = row.phone
  supplierForm.email = row.email
  supplierForm.address = row.address
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessage.confirm('确定要删除这个供应商吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = suppliers.value.findIndex(s => s.id === row.id)
    if (index > -1) {
      suppliers.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

const handleSearch = () => {
  // 搜索逻辑已在 computed 中处理
}

const handleSave = async () => {
  if (!supplierFormRef.value) return
  
  await supplierFormRef.value.validate((valid) => {
    if (valid) {
      if (supplierForm.id) {
        // 更新
        const index = suppliers.value.findIndex(s => s.id === supplierForm.id)
        if (index > -1) {
          suppliers.value[index] = { ...supplierForm }
          ElMessage.success('更新成功')
        }
      } else {
        // 添加
        const newSupplier = {
          id: 'S' + (suppliers.value.length + 1).toString().padStart(3, '0'),
          ...supplierForm
        }
        suppliers.value.push(newSupplier)
        ElMessage.success('添加成功')
      }
      dialogVisible.value = false
    }
  })
}
</script>

<style scoped>
.supplier-management {
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
