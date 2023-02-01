# 移动端模板框架

此项目框架是基于[Taro](https://taro-docs.jd.com/taro/docs/,https://taro-ui.jd.com/#/docs/introduction)

## 项目目录结构

```js
├── config                   # 全局配置，包含路由，构建等配置
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── custom-tab-bar       # 自定义底部tab-bar
│   ├── enums                # 枚举文件
│   ├── hooks                # 业务通用hooks文件
│   ├── layouts              # 通用布局
│   ├── pages                # 业务页面入口和常用模板
│   ├── request              # 业务请求
│   ├── styles               # 通用样式文件
│   ├── utils                # 工具库
│   ├── app.config           # 项目入口配置
│   ├── app.less             # 项目总通用样式
│   ├── app.ts               # 项目入口文件
│   ├── config.ts            # 全局配置文件
│   └── routes.ts            # 路由映射文件
├── README.md
└── package.json
```

## 内置功能

1. 框架内置响应式布局，开发单位请使用 px，不转译行内样式
2. 框架默认开启 gzip 对代码进行压缩

## 内置组件

1. 骨架屏
2. 错误边界
3. 图片预加载
4. Loading 组件
5. 阿里云上传图片
6. 国际化配置
7. 遮罩层
8. 顶部导航
9. 下拉列表
10. 自定义 Toast

## 内置 hooks

1. 双击事件 hooks
2. 超级钩子锁
3. 拥有 callback 的 useState

## 内置函数

1. 复制文本
2. 节流
3. 防抖
4. 查询元素大小
5. 生成唯一标识符
6. 判断是否是有刘海屏的 iPhone
