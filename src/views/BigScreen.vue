<template>
  <div class="big-screen">
    <!-- 页面标题 -->
    <div class="screen-header">
      <h1>{{ $t('bigScreen.title') }}</h1>
      <div class="header-info">
        <span class="current-time">{{ currentTime }}</span>
        <span class="refresh-time">{{ $t('bigScreen.lastRefresh') }}: {{ lastRefreshTime }}</span>
      </div>
    </div>

    <!-- 数据概览 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6" v-for="stat in stats" :key="stat.label">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" :class="stat.iconClass"></div>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ $t(stat.label) }}</div>
              <div class="stat-change" :class="stat.changeClass">
                {{ stat.change }}%
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 销售分析 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>{{ $t('bigScreen.salesTrend') }}</h3>
              <el-select v-model="timeRange" size="small">
                <el-option label="今日" value="today" />
                <el-option label="本周" value="week" />
                <el-option label="本月" value="month" />
                <el-option label="本年" value="year" />
              </el-select>
            </div>
          </template>
          <div ref="salesChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>{{ $t('bigScreen.salesByCategory') }}</h3>
            </div>
          </template>
          <div ref="categoryChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 库存与订单 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>{{ $t('bigScreen.inventoryStatus') }}</h3>
            </div>
          </template>
          <div ref="inventoryChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>{{ $t('bigScreen.orderStatus') }}</h3>
            </div>
          </template>
          <div ref="orderChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 客户分析 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>{{ $t('bigScreen.customerDistribution') }}</h3>
            </div>
          </template>
          <div ref="customerChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>{{ $t('bigScreen.topProducts') }}</h3>
            </div>
          </template>
          <div ref="topProductsChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'

// 响应式数据
const timeRange = ref('week')
const currentTime = ref('')
const lastRefreshTime = ref('')

// 图表引用
const salesChartRef = ref(null)
const categoryChartRef = ref(null)
const inventoryChartRef = ref(null)
const orderChartRef = ref(null)
const customerChartRef = ref(null)
const topProductsChartRef = ref(null)

// 图表实例
let salesChart = null
let categoryChart = null
let inventoryChart = null
let orderChart = null
let customerChart = null
let topProductsChart = null

// 统计数据
const stats = ref([
  {
    value: '¥1,280,000',
    label: 'bigScreen.totalSales',
    change: '+12.5',
    changeClass: 'positive',
    iconClass: 'icon-sales'
  },
  {
    value: '1,256',
    label: 'bigScreen.totalOrders',
    change: '+8.3',
    changeClass: 'positive',
    iconClass: 'icon-orders'
  },
  {
    value: '89.5%',
    label: 'bigScreen.orderCompletion',
    change: '+2.1',
    changeClass: 'positive',
    iconClass: 'icon-completion'
  },
  {
    value: '156',
    label: 'bigScreen.newCustomers',
    change: '+15.7',
    changeClass: 'positive',
    iconClass: 'icon-customers'
  }
])

// 模拟销售趋势数据
const salesData = computed(() => {
  if (timeRange.value === 'today') {
    return {
      xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      series: [12000, 15000, 28000, 45000, 38000, 52000]
    }
  } else if (timeRange.value === 'week') {
    return {
      xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      series: [120000, 132000, 101000, 134000, 90000, 230000, 210000]
    }
  } else if (timeRange.value === 'month') {
    return {
      xAxis: ['第1周', '第2周', '第3周', '第4周'],
      series: [450000, 520000, 480000, 610000]
    }
  } else {
    return {
      xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      series: [1200000, 1320000, 1010000, 1340000, 900000, 2300000, 2100000, 2500000, 1800000, 2200000, 2800000, 3200000]
    }
  }
})

// 模拟销售分类数据
const categoryData = [
  { name: 'T恤', value: 35 },
  { name: '衬衫', value: 25 },
  { name: '裤子', value: 20 },
  { name: '外套', value: 15 },
  { name: '其他', value: 5 }
]

// 模拟库存状态数据
const inventoryData = [
  { name: '充足', value: 65 },
  { name: '正常', value: 25 },
  { name: '不足', value: 8 },
  { name: '缺货', value: 2 }
]

// 模拟订单状态数据
const orderData = [
  { name: '已完成', value: 60 },
  { name: '已发货', value: 20 },
  { name: '待发货', value: 10 },
  { name: '待付款', value: 8 },
  { name: '已取消', value: 2 }
]

// 模拟客户分布数据
const customerData = [
  { name: '华东', value: 35 },
  { name: '华北', value: 25 },
  { name: '华南', value: 20 },
  { name: '西南', value: 10 },
  { name: '西北', value: 5 },
  { name: '东北', value: 5 }
]

// 模拟热销产品数据
const topProductsData = {
  xAxis: ['产品A', '产品B', '产品C', '产品D', '产品E'],
  series: [1200, 980, 850, 720, 680]
}

// 更新当前时间
const updateCurrentTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN')
  lastRefreshTime.value = now.toLocaleString('zh-CN')
}

// 初始化销售趋势图表
const initSalesChart = () => {
  if (salesChartRef.value) {
    salesChart = echarts.init(salesChartRef.value)
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: ¥{c}'
      },
      xAxis: {
        type: 'category',
        data: salesData.value.xAxis
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '¥{value}'
        }
      },
      series: [{
        data: salesData.value.series,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(52, 152, 219, 0.5)' },
            { offset: 1, color: 'rgba(52, 152, 219, 0.1)' }
          ])
        },
        lineStyle: {
          color: '#3498db'
        },
        itemStyle: {
          color: '#3498db'
        }
      }]
    }
    salesChart.setOption(option)
  }
}

// 初始化销售分类图表
const initCategoryChart = () => {
  if (categoryChartRef.value) {
    categoryChart = echarts.init(categoryChartRef.value)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: categoryData.map(item => item.name)
      },
      series: [{
        name: '销售分类',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: categoryData
      }]
    }
    categoryChart.setOption(option)
  }
}

// 初始化库存状态图表
const initInventoryChart = () => {
  if (inventoryChartRef.value) {
    inventoryChart = echarts.init(inventoryChartRef.value)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: inventoryData.map(item => item.name)
      },
      series: [{
        name: '库存状态',
        type: 'pie',
        radius: '60%',
        center: ['40%', '50%'],
        data: inventoryData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
    inventoryChart.setOption(option)
  }
}

// 初始化订单状态图表
const initOrderChart = () => {
  if (orderChartRef.value) {
    orderChart = echarts.init(orderChartRef.value)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: orderData.map(item => item.name)
      },
      series: [{
        name: '订单状态',
        type: 'pie',
        radius: '60%',
        center: ['40%', '50%'],
        data: orderData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
    orderChart.setOption(option)
  }
}

// 初始化客户分布图表
const initCustomerChart = () => {
  if (customerChartRef.value) {
    customerChart = echarts.init(customerChartRef.value)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: customerData.map(item => item.name)
      },
      series: [{
        name: '客户分布',
        type: 'pie',
        radius: '60%',
        center: ['40%', '50%'],
        data: customerData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
    customerChart.setOption(option)
  }
}

// 初始化热销产品图表
const initTopProductsChart = () => {
  if (topProductsChartRef.value) {
    topProductsChart = echarts.init(topProductsChartRef.value)
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} 件'
      },
      xAxis: {
        type: 'category',
        data: topProductsData.xAxis
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} 件'
        }
      },
      series: [{
        data: topProductsData.series,
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3498db' },
            { offset: 1, color: '#2980b9' }
          ])
        }
      }]
    }
    topProductsChart.setOption(option)
  }
}

// 初始化所有图表
const initCharts = () => {
  initSalesChart()
  initCategoryChart()
  initInventoryChart()
  initOrderChart()
  initCustomerChart()
  initTopProductsChart()
}

// 响应式调整
const handleResize = () => {
  salesChart?.resize()
  categoryChart?.resize()
  inventoryChart?.resize()
  orderChart?.resize()
  customerChart?.resize()
  topProductsChart?.resize()
}

// 监听时间范围变化
const handleTimeRangeChange = () => {
  if (salesChart) {
    const option = {
      xAxis: {
        data: salesData.value.xAxis
      },
      series: [{
        data: salesData.value.series
      }]
    }
    salesChart.setOption(option)
  }
}

// 生命周期
onMounted(() => {
  updateCurrentTime()
  setInterval(updateCurrentTime, 1000)
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  salesChart?.dispose()
  categoryChart?.dispose()
  inventoryChart?.dispose()
  orderChart?.dispose()
  customerChart?.dispose()
  topProductsChart?.dispose()
})
</script>

<style scoped>
.big-screen {
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 20px;
}

.screen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 20px;
}

.screen-header h1 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.header-info {
  display: flex;
  gap: 30px;
  font-size: 16px;
  color: #666;
}

.stats-row {
  margin-bottom: 30px;
}

.stat-card {
  height: 150px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.stat-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 24px;
  color: white;
}

.icon-sales {
  background-color: #3498db;
}

.icon-orders {
  background-color: #2ecc71;
}

.icon-completion {
  background-color: #f39c12;
}

.icon-customers {
  background-color: #e74c3c;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.stat-change {
  font-size: 12px;
  font-weight: bold;
}

.stat-change.positive {
  color: #2ecc71;
}

.stat-change.negative {
  color: #e74c3c;
}

.chart-row {
  margin-bottom: 30px;
}

.chart-card {
  height: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.card-header h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.chart-container {
  width: 100%;
  height: calc(100% - 50px);
}

@media screen and (max-width: 1200px) {
  .el-col {
    margin-bottom: 20px;
  }
}
</style>