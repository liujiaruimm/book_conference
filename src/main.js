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
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true  // 启用凭证，支持 cookie 身份验证

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 如果是 FormData 类型，确保正确的 Content-Type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else if (typeof config.data === 'object') {
      config.headers['Content-Type'] = 'application/json'
    }

    // 从 localStorage 获取 token 并添加到请求头
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo)
        if (user.token) {
          config.headers['Authorization'] = `Bearer ${user.token}`
        }
      } catch (e) {
        console.error('解析用户信息失败', e)
      }
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
    // 如果返回的是 HTML (包含 <!DOCTYPE html>)，可能是登录页面
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      console.error('返回了 HTML 页面，可能需要登录')
      // 不要在这里直接访问 router，只返回错误
      return Promise.reject(new Error('需要登录'))
    }
    return response
  },
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        // 未授权或禁止访问，可能需要登录
        console.error('未授权访问，请重新登录')
      }
    }
    return Promise.reject(error)
  }
)

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
