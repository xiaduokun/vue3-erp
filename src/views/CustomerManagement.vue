<template>
  <div class="customer-management">
    <el-card class="toolbar-card">
      <div class="toolbar">
        <el-button type="primary" @click="handleAddCustomer">
          <el-icon><Plus /></el-icon>
          添加客户
        </el-button>
        <el-input
          v-model="searchKeyword"
          placeholder="搜索客户..."
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
      <el-table :data="filteredCustomers" stripe style="width: 100%">
        <el-table-column prop="id" label="客户ID" />
        <el-table-column prop="name" label="客户名称" />
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
    <el-dialog v-model="dialogVisible" title="客户信息" width="500px">
      <el-form :model="customerForm" ref="customerFormRef" :rules="rules" label-width="100px">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="customerForm.name" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="customerForm.contact" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="customerForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="customerForm.email" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="customerForm.address" type="textarea" :rows="3" />
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
const customerFormRef = ref(null)

const customers = ref([
  { id: 'C001', name: '张三', contact: '张三', phone: '13800138000', email: 'zhangsan@example.com', address: '北京市朝阳区' },
  { id: 'C002', name: '李四', contact: '李四', phone: '13900139000', email: 'lisi@example.com', address: '上海市浦东新区' },
  { id: 'C003', name: '王五', contact: '王五', phone: '13700137000', email: 'wangwu@example.com', address: '广州市天河区' },
  { id: 'C004', name: '赵六', contact: '赵六', phone: '13600136000', email: 'zhaoliu@example.com', address: '深圳市南山区' },
  { id: 'C005', name: '孙七', contact: '孙七', phone: '13500135000', email: 'sunqi@example.com', address: '杭州市西湖区' },
  { id: 'C006', name: '周八', contact: '周八', phone: '13400134000', email: 'zhouba@example.com', address: '南京市玄武区' },
  { id: 'C007', name: '吴九', contact: '吴九', phone: '13300133000', email: 'wujiu@example.com', address: '成都市锦江区' },
  { id: 'C008', name: '郑十', contact: '郑十', phone: '13200132000', email: 'zhengshi@example.com', address: '武汉市武昌区' }
])

const customerForm = reactive({
  id: '',
  name: '',
  contact: '',
  phone: '',
  email: '',
  address: ''
})

const rules = {
  name: [
    { required: true, message: '请输入客户名称', trigger: 'blur' }
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

const filteredCustomers = computed(() => {
  if (!searchKeyword.value) {
    return customers.value
  }
  return customers.value.filter(customer => 
    customer.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    customer.phone.includes(searchKeyword.value)
  )
})

const handleAddCustomer = () => {
  customerForm.id = ''
  customerForm.name = ''
  customerForm.contact = ''
  customerForm.phone = ''
  customerForm.email = ''
  customerForm.address = ''
  dialogVisible.value = true
}

const handleEdit = (row) => {
  customerForm.id = row.id
  customerForm.name = row.name
  customerForm.contact = row.contact
  customerForm.phone = row.phone
  customerForm.email = row.email
  customerForm.address = row.address
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessage.confirm('确定要删除这个客户吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = customers.value.findIndex(c => c.id === row.id)
    if (index > -1) {
      customers.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

const handleSearch = () => {
  // 搜索逻辑已在 computed 中处理
}

const handleSave = async () => {
  if (!customerFormRef.value) return
  
  await customerFormRef.value.validate((valid) => {
    if (valid) {
      if (customerForm.id) {
        // 更新
        const index = customers.value.findIndex(c => c.id === customerForm.id)
        if (index > -1) {
          customers.value[index] = { ...customerForm }
          ElMessage.success('更新成功')
        }
      } else {
        // 添加
        const newCustomer = {
          id: 'C' + (customers.value.length + 1).toString().padStart(3, '0'),
          ...customerForm
        }
        customers.value.push(newCustomer)
        ElMessage.success('添加成功')
      }
      dialogVisible.value = false
    }
  })
}
</script>

<style scoped>
.customer-management {
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
