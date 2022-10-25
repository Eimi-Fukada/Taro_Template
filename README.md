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

## 注意事项

1. H5 上安全区域总是不准确，可以创建 2 个不用的 tabbar，在 app.config.ts 中写入 tabBar，Taro 会在外层包裹 id 为 container 的容器
