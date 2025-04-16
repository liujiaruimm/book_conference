import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import * as echarts from 'echarts'

// 配置 axios
axios.defaults.baseURL = 'https://114c-240c-c983-8-60c0-dd4e-61a3-1ce9-ae19.ngrok-free.app'
axios.defaults.timeout = 5000
axios.defaults.withCredentials = false

// 移除多余的 headers 配置
delete axios.defaults.headers.common['Content-Type']
delete axios.defaults.headers.post['Content-Type']

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 如果是 FormData 类型，确保正确的 Content-Type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          Vue.prototype.$message.error('请求参数错误，请检查输入')
          break
        case 404:
          Vue.prototype.$message.error('请求的资源不存在')
          break
        case 500:
          Vue.prototype.$message.error('服务器内部错误')
          break
        default:
          Vue.prototype.$message.error(error.response.data?.msg || '网络错误')
      }
    } else {
      Vue.prototype.$message.error('网络连接失败，请检查网络设置')
    }
    return Promise.reject(error)
  }
)

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
