import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// 创建axios实例
const service = axios.create({
    baseURL: 'https://1d1b-113-54-254-141.ngrok-free.app', // 使用完整的ngrok URL
    timeout: 5000, // 请求超时时间
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'  // 修改为表单格式
    }
})

// request拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        if (store.getters.token) {
            config.headers['Authorization'] = store.getters.token
        }

        // 如果是POST请求，将数据转换为表单格式
        if (config.method === 'post' && config.data) {
            const formData = new URLSearchParams();
            Object.entries(config.data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            config.data = formData;
        }

        console.log('Request Config:', config);
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response拦截器
service.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response.data
    },
    error => {
        console.log('Error Response:', error.response);
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service 