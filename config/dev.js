module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    // devServer: {
    //   proxy: {
    //     '/api': {
    //       target: 'https://dev-beep-service-client.nfkings.com/',
    //       pathRewrite: {
    //         '^/api/': '',
    //       },
    //       changeOrigin: true,
    //       onProxyRes(proxyRes, req, res) {
    //         proxyRes.headers[
    //           'x-real-url2'
    //         ] = `https://dev-beep-service-client.nfkings.com${req.url}`
    //       },
    //     },
    //   },
    // },
  },
}
