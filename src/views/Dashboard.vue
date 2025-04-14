<template>
    <el-container>
      <el-header>
        <span>树莓派智能会议室管理</span>
        <div class="user">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          <el-button type="info" @click="toggleAccount">{{ accountType === 'admin' ? '管理员' : '用户' }}</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <router-link to="/" tag="el-menu-item" index="0">
              <i class="el-icon-house"></i>
              <span>首页</span>
            </router-link>
  
            <el-submenu index="1" v-if="accountType === 'admin'">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>会议室管理</span>
              </template>
              <router-link to="/add-meeting-room" tag="el-menu-item" index="1-1">添加会议室</router-link>
              <router-link to="/meeting-room-status" tag="el-menu-item" index="1-2">会议室状态</router-link>
            </el-submenu>
            
            <router-link to="/user-management" tag="el-menu-item" index="2" v-if="accountType === 'admin'">
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </router-link>
  
            <router-link to="/environment-monitor" tag="el-menu-item" index="3" v-if="accountType === 'admin'">
              <i class="el-icon-document"></i>
              <span>环境监测</span>
            </router-link>
  
            <router-link to="/device-control" tag="el-menu-item" index="4" v-if="accountType === 'admin'">
              <i class="el-icon-setting"></i>
              <span>设备控制</span>
            </router-link>
  
            <!-- 普通用户的菜单项 -->
            <router-link to="/booking-room" tag="el-menu-item" index="5" v-if="accountType === 'user'">
              <i class="el-icon-document"></i>
              <span>预约会议室</span>
            </router-link>
            <router-link to="/inquiry-meeting-room" tag="el-menu-item" index="6" v-if="accountType === 'user'">
              <i class="el-icon-document"></i>
              <span>查询会议室</span>
            </router-link>
            <router-link to="/virtual-meeting-room" tag="el-menu-item" index="7" v-if="accountType === 'user'">
              <i class="el-icon-document"></i>
              <span>虚拟会议室</span>
            </router-link>
  
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script>
  export default {
    name: 'app',
    data() {
      return {
        accountType: 'admin' // 假设初始为管理员，切换后变为普通用户
      };
    },
    methods: {
      toggleAccount() {
        this.accountType = this.accountType === 'admin' ? 'user' : 'admin';
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
  </script>
  <style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .el-header, .el-footer {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #e1e7ef;
    color: #03235e;
    font-size: 20px;
    text-align: left;
    line-height: 60px;
  }
  .header-right {
    display: flex; /* 使头像和按钮在一行显示 */
    align-items: center; /* 垂直居中对齐 */
  }
  .user {
    display: flex;
    align-items: center;
  }
  .el-avatar {
    margin-right: 20px; 
  }
  .el-aside {
    background-color: #fcfcfc;
    color: #333;
    text-align: center;
    line-height: 600px;
  }
  .el-main {
    background-color: #753434;
    color: #333;
    
  }
  .button{
    display: flex;
    margin-bottom: 20px;
  }
  .grid-content {
    font-size: 15px; 
    margin: 5px; 
    padding: 5px; 
    border-radius: 4px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  </style>
  