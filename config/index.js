const path = require('path')

const config = {
  projectName: 'taro-template',
  date: '2022-8-24',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  // 配置全局环境变量
  defineConstants: {
    REACT_APP_ENV: JSON.stringify(process.env.REACT_APP_ENV),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    alias: {
      '~': path.resolve(__dirname, '../', 'src'),
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    // h5 打包带上hash值
    output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[chunkhash].js',
    },
    imageUrlLoaderOption: {
      limit: 5000,
      name: 'static/images/[name].[hash].[ext]',
    },
    miniCssExtractPluginOption: {
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[chunkhash].css',
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    router: {
      /** ["/","/ind"]可以支持多路由访问同一个页面实例 */
      customRoutes: {
        '/pages/index/index': '/',
      },
    },
    alias: {
      '~': path.resolve(__dirname, '../', 'src'),
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
  },
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
