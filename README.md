# 服装公司 ERP 系统

![Vue Version](https://img.shields.io/badge/Vue-3.x-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Element Plus](https://img.shields.io/badge/Element%20Plus-2.x-purple.svg)
![Vite](https://img.shields.io/badge/Vite-4.x-yellow.svg)

## 项目简介

这是一个基于 Vue 3 + TypeScript + Element Plus 开发的服装公司 ERP 系统，旨在帮助服装企业实现数字化管理，提高运营效率。

**在线演示**：https://vue3-erp-pc.vercel.app/

**登录信息**：用户名 `admin`，密码 `123456`

## 技术栈

- **前端框架**：Vue 3 (Composition API)
- **类型系统**：TypeScript
- **UI 组件库**：Element Plus
- **状态管理**：Pinia
- **路由管理**：Vue Router
- **国际化**：Vue I18n
- **构建工具**：Vite
- **HTTP 客户端**：Axios

## 核心功能

### 1. 登录认证
- 用户登录/登出
- 路由守卫权限控制
- 本地存储用户信息

### 2. 仪表盘
- 数据概览（商品总数、库存总量、订单总数、客户总数）
- 销售趋势图表
- 库存状态图表
- 最近订单列表

### 3. 商品管理
- 商品列表展示
- 商品添加/编辑/删除
- 商品搜索功能

### 4. 库存管理
- 库存列表展示
- 库存入库/出库操作
- 库存状态监控
- 安全库存预警

### 5. 订单管理
- 订单列表展示
- 订单创建/编辑/取消
- 订单状态跟踪
- 订单详情查看

### 6. 客户管理
- 客户列表展示
- 客户添加/编辑/删除
- 客户信息管理

### 7. 供应商管理
- 供应商列表展示
- 供应商添加/编辑/删除
- 供应商信息管理

### 8. 国际化支持
- 中英文切换
- 浏览器语言自动检测

## 项目结构

```
├── src/
│   ├── api/             # API 接口
│   ├── locales/         # 国际化配置
│   ├── router/          # 路由配置
│   ├── stores/          # 状态管理
│   ├── views/           # 页面组件
│   │   ├── Login.vue            # 登录页
│   │   ├── Layout.vue           # 布局页
│   │   ├── Dashboard.vue        # 仪表盘
│   │   ├── ProductManagement.vue    # 商品管理
│   │   ├── InventoryManagement.vue  # 库存管理
│   │   ├── OrderManagement.vue      # 订单管理
│   │   ├── CustomerManagement.vue   # 客户管理
│   │   └── SupplierManagement.vue   # 供应商管理
│   ├── App.vue          # 应用入口组件
│   ├── main.ts          # 应用入口文件
│   └── vite-env.d.ts    # Vite 环境类型声明
├── dist/                # 构建输出目录
├── auto-imports.d.ts    # 自动导入声明
├── index.html           # HTML 模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
├── tsconfig.node.json   # Node.js TypeScript 配置
└── vite.config.ts       # Vite 配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### TypeScript 类型检查

```bash
npm run type-check
```

## 部署方式

### Vercel（推荐）

1. 访问 [Vercel](https://vercel.com) 注册账号
2. 点击 "New Project" → 选择 GitHub 仓库
3. 配置构建命令：`npm run build`
4. 配置输出目录：`dist`
5. 点击 "Deploy"

### GitHub Pages

1. 在 `vite.config.ts` 中添加配置：
   ```typescript
   base: '/vue3-erp/'
   ```
2. 构建项目：
   ```bash
   npm run build
   ```
3. 创建 gh-pages 分支：
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r dist/* .
   git add -A
   git commit -m "Deploy"
   git push origin gh-pages
   ```
4. 在 GitHub 仓库设置中配置 Pages

### 本地开发

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建生产版本
npm run build
```

## 国际化

系统支持中英文切换，默认根据浏览器语言自动检测。

- 中文：`zh`
- 英文：`en`

## 浏览器兼容性

系统使用 Vite 的 legacy 插件，支持以下浏览器：

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 低版本安卓浏览器
- 不支持 IE 11

## 跨域配置

开发环境下，系统通过 Vite 的代理配置解决跨域问题：

```typescript
// vite.config.ts
server: {
  host: '127.0.0.1',
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

## 模拟数据

系统使用模拟数据进行展示，实际项目中需要替换为真实的 API 接口。

## 项目特点

1. **类型安全**：使用 TypeScript 提供完整的类型定义
2. **组件化**：使用 Element Plus 组件库，统一 UI 风格
3. **响应式设计**：适配不同屏幕尺寸
4. **国际化支持**：内置中英文切换
5. **权限控制**：路由守卫实现页面访问控制
6. **模块化**：清晰的目录结构，便于维护和扩展

## 注意事项

1. 本项目为前端演示版本，实际使用需要后端 API 支持
2. 登录功能使用本地存储模拟，实际项目需要实现真实的认证机制
3. 所有数据为模拟数据，实际项目需要连接真实数据库

## 许可证

MIT
