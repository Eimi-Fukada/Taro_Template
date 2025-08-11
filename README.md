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
│   ├── layouts              # 通用布局，处理错误边界和页面loading
│   ├── pages                # 业务页面入口
│   ├── request              # 业务请求
│   ├── styles               # 通用样式文件和帮助函数
│   ├── utils                # 工具库
│   ├── app.config           # 项目入口配置
│   ├── app.less             # 项目总通用样式
│   ├── app.ts               # 项目入口文件
│   ├── config.ts            # 配置文件，配置域名等
│   ├── globalStorage.ts     # 全局变量存储
│   └── routes.ts            # 路由映射文件
├── .eslintrc                # eslintrc
├── .prettierr.js            # 格式化样式文件
├── global.d.ts              # 全局声明文件
├── postcss.config.js        # 适配布局配置文件
├── README.md                # README
└── package.json             # package.json
```
## 项目更新指南

# 使用Taro 升级命令更新CLI版本到最新版本
taro update self
# 使用Taro 升级命令更新CLI版本到指定版本
taro update self [版本号]
# 使用Taro 升级命令将项目依赖升级到与@tarojs/cli一致的版本
taro update project
# 使用Taro 升级命令将项目依赖升级到指定版本
taro update project [版本号]

## 项目配置tailwindcss指南
- 参考： https://docs.taro.zone/docs/tailwindcss

## 功能点

1. 内置响应式布局，开发单位请使用 px，转译行内样式请使用帮助函数 px2vw()

2. 区分多环境，配置 dev,test,pre,prod

3. 配置格式化样式配置文件，需要安装 prettierrc 插件

4. 默认引入字体文件

5. 封装了简易的缓存读取方法和类型文件

6. 对 Taro.request 进行了二次封装，具体使用可以参考 request 文件下的 REMEAD

7. 内置了页面错误边界和页面 loading，处理了 ios 手机上的底部安全区以及 tabbar 页面缺高度的问题

8. 使用了自定义 tabbar，增加底部安全区

9. 配置了路径别名 ～

10. 默认开启 gzip 对代码进行压缩

11. H5 端打包带上 hash 值，解决缓存问题

12. 使用 husky 规范化 git commit

13. 使用 stylelint 对样式进行检查

### 内置组件

1. 阿里云上传方法

2. Avatar 头像组件

3. Button 按钮

4. 图片预加载

5. 国际化配置

6. Loading 组件

7. 遮罩层

8. 瀑布流组件

9. 顶部导航栏

10. 具有双击事件的图片组件

11. 下拉列表

12. Qrcode 二维码

13. 自定义 Toast

### 内置 hooks

1. 拥有 callback 的 useState

2. 双击事件 hooks

3. 超级钩子锁

### 内置函数

1. 生成唯一标识符

2. 复制文本

3. 判断是否是有刘海屏的 iPhone

4. 手机号校验

5. 手机号加密显示

6. 防抖函数

7. 节流函数

8. sleep 睡眠函数

9. 查询元素大小

### 内置样式

1. 文字多行显示。。。

2. px2vw 转译行内样式

### Help

1. 页面自适应请使用 postcss-px-to-viewport-8-plugin，原本的 postcss-px-to-viewport 已经被废弃

2. @commitlint/config-conventional 请安装^17.6.3 版本，高版本提交代码的时候会不通过

## 前端开发规范

> 命名规范

### 1.1 变量

```js
// 命名方法：小驼峰式命名法
// 命名规范：前缀应当是名词。(函数的名字前缀为动词，以此区分变量和函数)
// 命名建议：尽量在变量名字中体现所属类型，如:length、count等表示数字类型；而包含name、title表示为字符串类型
// eg
let maxCount = 10
let tableTitle = 'LoginTable'
```

### 1.2 常量

```js
// 命名方法：名称全部大写
// 命名规范：使用大写字母和下划线来组合命名，下划线用以分割单词
// eg
const MAX_COUNT = 10
const URL = 'http://www.foreverz.com'
```

### 1.3 函数

```js
// 命名方法：小驼峰式命名法
// 命名规范：前缀应当为动词
// 命名建议：可使用常见动词约定
// eg
// 是否可阅读
function canRead(): boolean {
  return true
}
// 获取名称
function getName(): string {
  return this.name
}
```

| 动词 | 含义                         | 返回值                                                |     |
| ---- | ---------------------------- | ----------------------------------------------------- | --- |
| can  | 判断是否可执行某个动作(权限) | 函数返回一个布尔值。true：可执行；false：不可执行     |
| has  | 判断是否含有某个值           | 函数返回一个布尔值。true：含有此值；false：不含有此值 |
| is   | 判断是否为某个值             | 函数返回一个布尔值。true：为某个值；false：不为某个值 |
| get  | 获取某个值                   | 函数返回一个非布尔值                                  |
| set  | 设置某个值                   | 无返回值、返回是否设置成功或者返回链式对象            |
| load | 加载某些数据                 | 无返回值或者返回是否加载完成的结果                    |

### 1.4 类 & 构造函数

```js
// 命名方法：大驼峰式命名法，首字母大写
// 命名规范：前缀为名称
// eg
class Person {
  public name: string;
  constructor(name) {
    this.name = name;
  }
}
const person = new Person('mevyn');
```

### 1.5 类的成员

```js
// 公共属性和方法：跟变量和函数的命名一样
// 私有属性和方法：前缀为_(下划线)，后面跟公共属性和方法一样的命名方式
// eg
class Person {
  private _name: string;
  constructor() { }
  // 公共方法
  getName() {
    return this._name;
  }
  // 公共方法
  setName(name) {
    this._name = name;
  }
}
const person = new Person();
person.setName('mervyn');
person.getName();
```

> 项目命名

项目名全部采用小写方式， 以中划线分隔。 比如： my-project-name

> 目录命名

目录名参照上一条规则,有复数结构时，要采用复数命名法，比如说： scripts, styles, images, data-models

> JavaScript 文件命名

所有 js 文件名，多个单词组成时，采用中划线连接方式，比如说： 账号模型文件 account-model.js
