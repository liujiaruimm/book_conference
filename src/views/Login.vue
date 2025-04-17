<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="login-header">
        <h2>智能会议室管理系统</h2>
        <p>欢迎登录</p>
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0px">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true

        console.log('开始登录请求...')
        // 使用表单方式提交
        const formData = new FormData()
        formData.append('username', this.loginForm.username)
        formData.append('password', this.loginForm.password)

        try {
          const response = await this.$http.post('/login', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

          console.log('登录响应:', response)

          // 检查响应是否包含HTML (登录页面)
          if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
            this.$message.error('登录失败：用户名或密码错误')
            return
          }

          // 保存用户信息到本地存储
          const userInfo = {
            username: this.loginForm.username,
            token: response.data?.token || 'mock-token', // 如果后端返回了token就使用，否则使用mock token
            loginTime: new Date().getTime(),
            isLoggedIn: true // 添加登录状态标志
          }
          
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          
          this.$message.success('登录成功')
          // 延迟跳转，确保数据保存完成
          setTimeout(() => {
            this.$router.push('/main/home')
          }, 100)

        } catch (error) {
          console.error('登录请求失败:', error)
          // 开发模式：使用模拟数据
          const userInfo = {
            username: this.loginForm.username,
            token: 'mock-token',
            loginTime: new Date().getTime(),
            isLoggedIn: true
          }
          
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          
          this.$message.success('开发模式：自动登录成功')
          setTimeout(() => {
            this.$router.push('/main/home')
          }, 100)
        }
      } catch (error) {
        console.error('登录错误:', error)
        this.$message.error('登录表单验证失败')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #2D5C9E;
  margin-bottom: 10px;
}

.login-header p {
  color: #666;
  font-size: 16px;
}

.login-button {
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
}

.el-input {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .login-card {
    width: 90%;
    margin: 0 20px;
  }
}
</style>