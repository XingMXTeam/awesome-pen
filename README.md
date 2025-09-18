# Awesome Pen H5

一个现代化的H5应用，使用最新的React技术栈构建。

## 🚀 技术栈

- **React 18** - 最新的React版本，支持并发特性
- **TypeScript** - 类型安全的JavaScript超集
- **Vite** - 极速的前端构建工具
- **Tailwind CSS** - 实用优先的CSS框架
- **Styled Components** - CSS-in-JS解决方案
- **Framer Motion** - 强大的动画库
- **React Router** - 声明式路由

## 📱 移动端优化

- 响应式设计，适配各种屏幕尺寸
- 支持iOS Safari和Android Chrome
- 优化触摸交互体验
- 防止页面缩放和橡皮筋效果
- 支持安全区域适配（刘海屏等）

## 🛠️ 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Button.tsx      # 按钮组件
│   ├── Card.tsx        # 卡片组件
│   ├── Header.tsx      # 头部组件
│   └── index.ts        # 组件导出
├── pages/              # 页面组件
│   └── Home.tsx        # 首页
├── hooks/              # 自定义Hooks
├── utils/              # 工具函数
├── types/              # TypeScript类型定义
├── assets/             # 静态资源
│   ├── images/         # 图片资源
│   └── icons/          # 图标资源
├── App.tsx             # 应用根组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🎨 设计系统

### 颜色

- **主色调**: #3b82f6 (蓝色)
- **辅助色**: #f3f4f6 (灰色)
- **文字色**: #1f2937 (深灰)

### 组件

- **Button**: 支持primary、secondary、outline三种变体
- **Card**: 可嵌套Header、Content、Footer
- **Header**: 固定顶部，支持安全区域

## 📱 移动端特性

- 支持iOS和Android的PWA特性
- 优化触摸交互和滚动体验
- 适配各种屏幕尺寸和安全区域
- 防止意外的页面缩放

## 🔧 配置说明

### Vite配置

- 开发服务器端口: 3000
- 支持热重载
- 自动打开浏览器

### TypeScript配置

- 严格模式启用
- 路径映射支持
- React JSX支持

### Tailwind配置

- 自定义断点
- 安全区域支持
- 移动端优化

## 📄 许可证

MIT License
