const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    proxy: {
      '/api/meetingRooms': {
        target: 'https://114c-240c-c983-8-60c0-dd4e-61a3-1ce9-ae19.ngrok-free.app',
        changeOrigin: true,
        pathRewrite: {
          '^/api/meetingRooms': '/meetingRooms'
        }
      },
      '/api/add': {
        target: 'https://114c-240c-c983-8-60c0-dd4e-61a3-1ce9-ae19.ngrok-free.app',
        changeOrigin: true,
        pathRewrite: {
          '^/api/add': ''
        }
      }
    }
  }
})
