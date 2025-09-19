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

## 🌐 本地调试配置

### 使用 Whistle 代理调试

为了方便在线上环境调试本地代码，可以使用 [Whistle](https://wproxy.org/whistle/) 代理工具将线上资源代理到本地开发服务器。

#### 快速开始

1. 安装并启动 Whistle
2. 在 Whistle 中添加代理规则：`awesome-pen.netlify.app http://127.0.0.1:3000`
3. 配置系统代理
4. 启动本地开发服务器
5. 访问 https://awesome-pen.netlify.app/ 进行调试

#### 1. 安装 Whistle

```bash
# 全局安装 whistle
npm install -g whistle

# 启动 whistle
w2 start
```

#### 2. 配置代理规则

在 Whistle 管理界面 (http://127.0.0.1:8899) 中添加以下代理规则：

```
# 推荐方案：直接代理整个域名到本地开发服务器
awesome-pen.netlify.app http://127.0.0.1:3000
```

**为什么这样配置？**
- Vite 开发服务器在开发模式下，资源路径与生产构建不同
- 开发模式下的资源路径通常是 `/@vite/client`、`/@fs/` 等
- 直接代理整个域名可以避免路径匹配问题，让 Vite 自动处理资源路径

**替代方案（如果需要精确控制）：**
```
# 代理线上 JS 资源到本地开发服务器
awesome-pen.netlify.app/assets/*.js http://127.0.0.1:3000/assets/$1

# 代理线上 CSS 资源到本地开发服务器  
awesome-pen.netlify.app/assets/*.css http://127.0.0.1:3000/assets/$1

# 代理主页面到本地开发服务器
awesome-pen.netlify.app/ http://127.0.0.1:3000/

# 代理 API 请求（如果需要）
awesome-pen.netlify.app/api/* https://aistudio.alibaba-inc.com/api/$1
```

#### 3. 配置系统代理

**macOS/Linux:**
```bash
# 设置系统代理
export http_proxy=http://127.0.0.1:8899
export https_proxy=http://127.0.0.1:8899

# 或者使用系统设置
# 系统偏好设置 → 网络 → 高级 → 代理 → HTTP/HTTPS 代理
# 服务器: 127.0.0.1, 端口: 8899
```

**Windows:**
```
# 在系统设置中配置代理
# 设置 → 网络和Internet → 代理 → 手动设置代理
# 地址: 127.0.0.1, 端口: 8899
```

#### 4. 启动本地开发服务器

```bash
# 确保本地开发服务器运行在 3000 端口
npm run dev
```

#### 5. 访问线上地址进行调试

打开浏览器访问: https://awesome-pen.netlify.app/

此时页面会加载本地的 JS/CSS 资源，实现线上环境调试本地代码的效果。

#### 6. 调试技巧

- **热重载**: 修改本地代码后，页面会自动刷新
- **断点调试**: 可以在浏览器开发者工具中设置断点
- **网络面板**: 可以查看资源是否成功代理到本地
- **控制台**: 可以查看本地代码的 console.log 输出

#### 7. 常见问题

**Q: 代理不生效怎么办？**
A: 检查以下几点：
- 确认 Whistle 服务正在运行 (http://127.0.0.1:8899)
- 确认系统代理设置正确
- 清除浏览器缓存
- 检查代理规则是否正确
- 确认本地开发服务器正在运行 (http://127.0.0.1:3000)

**Q: 资源路径不匹配怎么办？**
A: 使用推荐的代理方案 `awesome-pen.netlify.app http://127.0.0.1:3000` 可以避免这个问题：
- **原因**: Vite 开发模式和生产模式的资源路径不同
- **开发模式**: 资源路径是 `/@vite/client`、`/@fs/` 等
- **生产模式**: 资源路径是 `/assets/filename-hash.js`
- **解决方案**: 直接代理整个域名，让 Vite 自动处理资源路径

**Q: 如何只代理特定资源？**
A: 可以修改代理规则，例如只代理 JS 文件：
```
awesome-pen.netlify.app/assets/*.js http://127.0.0.1:3000/assets/$1
```

**Q: 如何停止代理？**
A: 在 Whistle 管理界面中删除代理规则，或关闭 Whistle 服务。

**Q: 如何验证代理是否生效？**
A: 在浏览器开发者工具的 Network 面板中：
- 查看资源请求的 Response Headers
- 确认 `Server` 字段显示为 Vite 开发服务器
- 查看资源的实际内容是否来自本地

#### 8. 其他代理工具

除了 Whistle，还可以使用其他代理工具：

- **Charles Proxy**: 图形化界面，配置简单
- **Fiddler**: Windows 平台推荐
- **mitmproxy**: 命令行工具，适合高级用户

配置方式类似，都是将线上资源代理到本地开发服务器。

## 📄 许可证

MIT License
