const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://1d1b-113-54-254-141.ngrok-free.app',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        onProxyReq: function (proxyReq) {
          console.log('代理请求URL:', proxyReq.path);
          console.log('代理请求方法:', proxyReq.method);
        }
      }
    }
  }
})
