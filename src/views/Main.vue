<template>
    <el-container >
      <el-header >
        <span>树莓派智能会议室管理</span>
        <div class="user">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          <el-button type="info" @click="handleLogout">{{ userName }}</el-button>
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
            <router-link to="/main/home" tag="el-menu-item" index="0">
              <i class="el-icon-house"></i>
              <span>首页</span>
            </router-link>
  
            <!-- 会议室管理模块 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>会议室管理</span>
              </template>
              <router-link to="/main/add-meeting-room" tag="el-menu-item" index="1-1">添加会议室</router-link>
              <router-link to="/main/meeting-room-status" tag="el-menu-item" index="1-2">会议室状态</router-link>
              <router-link to="/main/user-management" tag="el-menu-item" index="1-3">用户管理</router-link>
              <router-link to="/main/environment-monitor" tag="el-menu-item" index="1-4">环境监测</router-link>
              <el-menu-item index="1-5" @click="openDeviceControl">设备控制</el-menu-item>
            </el-submenu>

            <!-- 会议室预约模块 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>会议室预约</span>
              </template>
              <router-link to="/main/booking-room" tag="el-menu-item" index="2-1">预约会议室</router-link>
              <router-link to="/main/inquiry-meeting-room" tag="el-menu-item" index="2-2">查询预约</router-link>
              <router-link to="/main/virtual-scene" tag="el-menu-item" index="2-3">虚拟会议室</router-link>
            </el-submenu>
  
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view> 
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script>
  import { mapState } from 'vuex'

  export default {
    name: 'main',
    computed: {
      ...mapState({
        userName: state => state.userName || '用户'
      })
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleLogout() {
        this.$confirm('确认退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('logout');
          this.$router.push('/');
          this.$message({
            type: 'success',
            message: '已退出登录'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
      openDeviceControl() {
        // 在新窗口打开设备控制页面
        window.open('/main/device-control', '_blank');
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
    margin-top: 0px;
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
    background-color: #ffffff;
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
  