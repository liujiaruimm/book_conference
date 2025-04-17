import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

// 创建 axios 实例
const service = axios.create({
    baseURL: 'https://abbd-222-210-192-60.ngrok-free.app',
    timeout: 15000,
    withCredentials: false
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 对于 OPTIONS 请求，不添加认证头
        if (config.method.toLowerCase() === 'options') {
            return config
        }

        // 对于登录请求，不需要添加 token
        if (config.url.includes('/login')) {
            return config
        }

        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo)
            config.headers['Authorization'] = `Bearer ${parsedUserInfo.token}`
        } else {
            // 如果没有用户信息且不是登录请求，重定向到登录页
            router.push('/login')
            return Promise.reject('请先登录')
        }

        // 处理 POST 请求的数据格式
        if (config.method.toLowerCase() === 'post') {
            // 如果已经是 URLSearchParams 实例，则不需要处理
            if (!(config.data instanceof URLSearchParams)) {
                // 如果数据不是 FormData，则转换为 form-urlencoded 格式
                if (!(config.data instanceof FormData)) {
                    config.data = qs.stringify(config.data)
                }
            }
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }

        return config
    },
    error => {
        console.error('请求错误:', error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 如果响应是登录接口
        if (response.config.url.includes('/login')) {
            const { token, user } = response.data
            if (token) {
                localStorage.setItem('userInfo', JSON.stringify({
                    token,
                    user,
                    loginTime: new Date().getTime()
                }))
            }
        }
        return response
    },
    error => {
        console.error('响应错误:', error)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    Message.error('登录已过期，请重新登录')
                    localStorage.removeItem('userInfo')
                    router.push('/login')
                    break
                case 403:
                    Message.error('没有权限访问')
                    break
                case 500:
                    Message.error('服务器错误')
                    break
                default:
                    Message.error(error.response?.data?.message || '网络错误')
            }
        } else if (error.code === 'ERR_NETWORK') {
            Message.error('网络连接失败，请检查网络设置')
        } else {
            Message.error('请求失败，请稍后重试')
        }
        return Promise.reject(error)
    }
)

export default service 