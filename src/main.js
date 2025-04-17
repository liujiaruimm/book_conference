import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import request from './utils/request'
import store from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 将 axios 实例挂载到 Vue 原型上
Vue.prototype.$http = request

// 创建 Vue 实例前初始化 store
store.dispatch('initializeApp')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
