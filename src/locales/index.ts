import { createI18n } from 'vue-i18n'

interface Messages {
  zh: {
    login: {
      title: string
      username: string
      password: string
      login: string
      placeholder: {
        username: string
        password: string
      }
    }
    layout: {
      title: string
      dashboard: string
      product: string
      inventory: string
      order: string
      customer: string
      supplier: string
      logout: string
    }
    dashboard: {
      title: string
      stats: {
        totalProducts: string
        totalInventory: string
        totalOrders: string
        totalCustomers: string
      }
      charts: {
        salesTrend: string
        inventoryStatus: string
      }
      recentOrders: string
      orderId: string
      customer: string
      amount: string
      status: string
      createTime: string
    }
    product: {
      title: string
      addProduct: string
      search: string
      productId: string
      productName: string
      category: string
      price: string
      stock: string
      status: string
      action: string
      edit: string
      delete: string
    }
    inventory: {
      title: string
      inStock: string
      outStock: string
      search: string
      productId: string
      productName: string
      category: string
      currentStock: string
      safeStock: string
      stockStatus: string
      action: string
      viewDetail: string
    }
    order: {
      title: string
      createOrder: string
      search: string
      orderId: string
      customer: string
      amount: string
      status: string
      createTime: string
      action: string
      viewDetail: string
      cancelOrder: string
    }
    customer: {
      title: string
      addCustomer: string
      search: string
      customerId: string
      customerName: string
      contact: string
      phone: string
      email: string
      address: string
      action: string
      edit: string
      delete: string
    }
    supplier: {
      title: string
      addSupplier: string
      search: string
      supplierId: string
      supplierName: string
      contact: string
      phone: string
      email: string
      address: string
      action: string
      edit: string
      delete: string
    }
    bigScreen: {
      title: string
      totalSales: string
      totalOrders: string
      orderCompletion: string
      newCustomers: string
      lastRefresh: string
      salesTrend: string
      salesByCategory: string
      inventoryStatus: string
      orderStatus: string
      customerDistribution: string
      topProducts: string
    }
    common: {
      confirm: string
      cancel: string
      save: string
      delete: string
      edit: string
      add: string
      search: string
      reset: string
      submit: string
      close: string
      loading: string
      success: string
      error: string
      warning: string
      info: string
    }
  }
  en: {
    login: {
      title: string
      username: string
      password: string
      login: string
      placeholder: {
        username: string
        password: string
      }
    }
    layout: {
      title: string
      dashboard: string
      product: string
      inventory: string
      order: string
      customer: string
      supplier: string
      logout: string
    }
    dashboard: {
      title: string
      stats: {
        totalProducts: string
        totalInventory: string
        totalOrders: string
        totalCustomers: string
      }
      charts: {
        salesTrend: string
        inventoryStatus: string
      }
      recentOrders: string
      orderId: string
      customer: string
      amount: string
      status: string
      createTime: string
    }
    product: {
      title: string
      addProduct: string
      search: string
      productId: string
      productName: string
      category: string
      price: string
      stock: string
      status: string
      action: string
      edit: string
      delete: string
    }
    inventory: {
      title: string
      inStock: string
      outStock: string
      search: string
      productId: string
      productName: string
      category: string
      currentStock: string
      safeStock: string
      stockStatus: string
      action: string
      viewDetail: string
    }
    order: {
      title: string
      createOrder: string
      search: string
      orderId: string
      customer: string
      amount: string
      status: string
      createTime: string
      action: string
      viewDetail: string
      cancelOrder: string
    }
    customer: {
      title: string
      addCustomer: string
      search: string
      customerId: string
      customerName: string
      contact: string
      phone: string
      email: string
      address: string
      action: string
      edit: string
      delete: string
    }
    supplier: {
      title: string
      addSupplier: string
      search: string
      supplierId: string
      supplierName: string
      contact: string
      phone: string
      email: string
      address: string
      action: string
      edit: string
      delete: string
    }
    bigScreen: {
      title: string
      totalSales: string
      totalOrders: string
      orderCompletion: string
      newCustomers: string
      lastRefresh: string
      salesTrend: string
      salesByCategory: string
      inventoryStatus: string
      orderStatus: string
      customerDistribution: string
      topProducts: string
    }
    common: {
      confirm: string
      cancel: string
      save: string
      delete: string
      edit: string
      add: string
      search: string
      reset: string
      submit: string
      close: string
      loading: string
      success: string
      error: string
      warning: string
      info: string
    }
  }
}

const messages: Messages = {
  zh: {
    login: {
      title: '服装ERP系统登录',
      username: '用户名',
      password: '密码',
      login: '登录',
      placeholder: {
        username: '请输入用户名',
        password: '请输入密码'
      }
    },
    layout: {
      title: '服装ERP系统',
      dashboard: '仪表盘',
      product: '商品管理',
      inventory: '库存管理',
      order: '订单管理',
      customer: '客户管理',
      supplier: '供应商管理',
      logout: '退出登录'
    },
    dashboard: {
      title: '仪表盘',
      stats: {
        totalProducts: '商品总数',
        totalInventory: '库存总量',
        totalOrders: '订单总数',
        totalCustomers: '客户总数'
      },
      charts: {
        salesTrend: '销售趋势',
        inventoryStatus: '库存状态'
      },
      recentOrders: '最近订单',
      orderId: '订单编号',
      customer: '客户名称',
      amount: '订单金额',
      status: '订单状态',
      createTime: '创建时间'
    },
    product: {
      title: '商品管理',
      addProduct: '添加商品',
      search: '搜索商品',
      productId: '商品ID',
      productName: '商品名称',
      category: '分类',
      price: '价格',
      stock: '库存',
      status: '状态',
      action: '操作',
      edit: '编辑',
      delete: '删除'
    },
    inventory: {
      title: '库存管理',
      inStock: '入库',
      outStock: '出库',
      search: '搜索库存',
      productId: '商品ID',
      productName: '商品名称',
      category: '分类',
      currentStock: '当前库存',
      safeStock: '安全库存',
      stockStatus: '库存状态',
      action: '操作',
      viewDetail: '查看详情'
    },
    order: {
      title: '订单管理',
      createOrder: '创建订单',
      search: '搜索订单',
      orderId: '订单编号',
      customer: '客户名称',
      amount: '订单金额',
      status: '订单状态',
      createTime: '创建时间',
      action: '操作',
      viewDetail: '查看详情',
      cancelOrder: '取消订单'
    },
    customer: {
      title: '客户管理',
      addCustomer: '添加客户',
      search: '搜索客户',
      customerId: '客户ID',
      customerName: '客户名称',
      contact: '联系人',
      phone: '电话',
      email: '邮箱',
      address: '地址',
      action: '操作',
      edit: '编辑',
      delete: '删除'
    },
    supplier: {
      title: '供应商管理',
      addSupplier: '添加供应商',
      search: '搜索供应商',
      supplierId: '供应商ID',
      supplierName: '供应商名称',
      contact: '联系人',
      phone: '电话',
      email: '邮箱',
      address: '地址',
      action: '操作',
      edit: '编辑',
      delete: '删除'
    },
    bigScreen: {
      title: '数据大屏',
      totalSales: '总销售额',
      totalOrders: '总订单数',
      orderCompletion: '订单完成率',
      newCustomers: '新增客户',
      lastRefresh: '最后刷新',
      salesTrend: '销售趋势',
      salesByCategory: '销售分类',
      inventoryStatus: '库存状态',
      orderStatus: '订单状态',
      customerDistribution: '客户分布',
      topProducts: '热销产品'
    },
    common: {
      confirm: '确认',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      add: '添加',
      search: '搜索',
      reset: '重置',
      submit: '提交',
      close: '关闭',
      loading: '加载中...',
      success: '操作成功',
      error: '操作失败',
      warning: '警告',
      info: '提示'
    }
  },
  en: {
    login: {
      title: 'Clothing ERP System Login',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      placeholder: {
        username: 'Please enter username',
        password: 'Please enter password'
      }
    },
    layout: {
      title: 'Clothing ERP System',
      dashboard: 'Dashboard',
      product: 'Product Management',
      inventory: 'Inventory Management',
      order: 'Order Management',
      customer: 'Customer Management',
      supplier: 'Supplier Management',
      logout: 'Logout'
    },
    dashboard: {
      title: 'Dashboard',
      stats: {
        totalProducts: 'Total Products',
        totalInventory: 'Total Inventory',
        totalOrders: 'Total Orders',
        totalCustomers: 'Total Customers'
      },
      charts: {
        salesTrend: 'Sales Trend',
        inventoryStatus: 'Inventory Status'
      },
      recentOrders: 'Recent Orders',
      orderId: 'Order ID',
      customer: 'Customer Name',
      amount: 'Order Amount',
      status: 'Status',
      createTime: 'Create Time'
    },
    product: {
      title: 'Product Management',
      addProduct: 'Add Product',
      search: 'Search Product',
      productId: 'Product ID',
      productName: 'Product Name',
      category: 'Category',
      price: 'Price',
      stock: 'Stock',
      status: 'Status',
      action: 'Action',
      edit: 'Edit',
      delete: 'Delete'
    },
    inventory: {
      title: 'Inventory Management',
      inStock: 'In Stock',
      outStock: 'Out Stock',
      search: 'Search Inventory',
      productId: 'Product ID',
      productName: 'Product Name',
      category: 'Category',
      currentStock: 'Current Stock',
      safeStock: 'Safe Stock',
      stockStatus: 'Stock Status',
      action: 'Action',
      viewDetail: 'View Detail'
    },
    order: {
      title: 'Order Management',
      createOrder: 'Create Order',
      search: 'Search Order',
      orderId: 'Order ID',
      customer: 'Customer Name',
      amount: 'Order Amount',
      status: 'Status',
      createTime: 'Create Time',
      action: 'Action',
      viewDetail: 'View Detail',
      cancelOrder: 'Cancel Order'
    },
    customer: {
      title: 'Customer Management',
      addCustomer: 'Add Customer',
      search: 'Search Customer',
      customerId: 'Customer ID',
      customerName: 'Customer Name',
      contact: 'Contact',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      action: 'Action',
      edit: 'Edit',
      delete: 'Delete'
    },
    supplier: {
      title: 'Supplier Management',
      addSupplier: 'Add Supplier',
      search: 'Search Supplier',
      supplierId: 'Supplier ID',
      supplierName: 'Supplier Name',
      contact: 'Contact',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      action: 'Action',
      edit: 'Edit',
      delete: 'Delete'
    },
    bigScreen: {
      title: 'Data Dashboard',
      totalSales: 'Total Sales',
      totalOrders: 'Total Orders',
      orderCompletion: 'Order Completion Rate',
      newCustomers: 'New Customers',
      lastRefresh: 'Last Refresh',
      salesTrend: 'Sales Trend',
      salesByCategory: 'Sales by Category',
      inventoryStatus: 'Inventory Status',
      orderStatus: 'Order Status',
      customerDistribution: 'Customer Distribution',
      topProducts: 'Top Products'
    },
    common: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      reset: 'Reset',
      submit: 'Submit',
      close: 'Close',
      loading: 'Loading...',
      success: 'Operation successful',
      error: 'Operation failed',
      warning: 'Warning',
      info: 'Information'
    }
  }
}

// 检测浏览器语言
const getBrowserLocale = (): string => {
  const browserLocale = navigator.language
  const locale = browserLocale.split('-')[0]
  // 检查是否在支持的语言列表中
  return ['zh', 'en'].includes(locale) ? locale : 'zh'
}

const i18n = createI18n({
  locale: getBrowserLocale(),
  messages: messages as any,
  fallbackLocale: 'zh',
  legacy: false,
  globalInjection: true
})

export default i18n
