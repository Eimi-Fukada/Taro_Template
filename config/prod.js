module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    webpackChain(chain) {
      //   /**
      //    * 如果 h5 端编译后体积过大，可以使用 webpack-bundle-analyzer 插件对打包体积进行分析。
      //    * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
      //    */
      chain
        .plugin("analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin, []);

      chain.merge({
        performance: {
          hints: "warning",
          maxEntrypointSize: 1000000,
          maxAssetSize: 3000000,
          assetFilter: function(assetFilename) {
            return assetFilename.endsWith(".js");
          }
        }
      });

      //   /**
      //    * 如果 h5 端首屏加载时间过长，可以使用 prerender-spa-plugin 插件预加载首页。
      //    * @dreysolano/prerender-spa-plugin bug更大
      //    * prerender-spa-plugin 有bug，不兼容webpack5，需要去源码es6-> 60行改成compilerFS.mkdir，
      //    * compilerFS.mkdirp已经被废弃了
      //    */
      const path = require("path");
      const Prerender = require("prerender-spa-plugin");
      const staticDir = path.join(__dirname, "..", "dist");
      chain.plugin("prerender").use(
        new Prerender({
          staticDir,
          routes: ["/"],
          postProcess: context => ({
            ...context,
            outputPath: path.join(staticDir, "index.html")
          })
        })
      );
    }
  }
};
