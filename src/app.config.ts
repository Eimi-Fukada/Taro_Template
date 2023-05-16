export default defineAppConfig({
  pages: ['pages/index/index'],
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
  },
  lazyCodeLoading: 'requiredComponents',
})
