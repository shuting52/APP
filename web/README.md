# 陈淑婷工具箱（懒得找导航站）

全中文一站式精选实用资源与网站导航平台，涵盖影视娱乐、在线工具、音乐听歌、小说阅读、游戏资源与装机必备。

## 技术栈

- React 19 + Vite 6 + TypeScript
- Tailwind CSS 4
- Express（server.ts，可选服务端能力）
- Capacitor 8（Android 封装）

## 功能特性

- 分类导航 + 子分类筛选 + 站内搜索
- 快速直达标签、快捷直达功能栏
- 收藏夹 / 自建网站 / 数据备份
- 自定义背景（图片 / 视频）
- 明暗模式切换
- 开屏动画（3D 立方体网格）
- Android APK：全站禁止左右滑动（标签区域除外），卡片图标按站点动态获取 favicon

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build          # 前端产物 → dist/
npx cap sync android   # 同步到 Android 工程
cd android && ./gradlew assembleDebug
```

## 项目结构

```
src/
  components/    UI 组件
  data/          分类与卡片数据
  App.tsx        主应用
android/         Capacitor Android 工程
server.ts        可选 Express 服务
```

## 说明

- 图标加载链：数据图标(https) → Google s2 favicon → iowen favicon → 站点 /favicon.ico → 首字母徽章
- 防左右滑动：全局拦截横向手势，仅标签/子分类区域允许横向滚动
