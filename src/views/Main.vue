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
              <router-link to="/main/meeting-room-status" tag="el-menu-item" index="1-1">会议室状态</router-link>
              <el-menu-item index="1-2" @click="openDeviceControl">设备控制</el-menu-item>
            </el-submenu>

            <!-- 会议室预约模块 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>会议室预约</span>
              </template>
              <router-link to="/main/booking-room" tag="el-menu-item" index="2-1">预约会议室</router-link>
              <router-link to="/main/inquiry-meeting-room" tag="el-menu-item" index="2-2">查询预约</router-link>
            </el-submenu>

            <!-- 数据分析模块 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-data-line"></i>
                <span>数据分析</span>
              </template>
              <router-link to="/main/data-analysis" tag="el-menu-item" index="3-1">数据可视化</router-link>
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
        window.open('/device-control', '_blank');
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
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
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    z-index: 900;
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    overflow-y: auto;
  }
  .el-main {
    background-color: #ffffff;
    color: #333;
    margin-left: 200px;
    margin-top: 60px;
    min-height: calc(100vh - 60px);
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
  /* 美化滚动条 */
  .el-aside::-webkit-scrollbar {
    width: 6px;
  }
  
  .el-aside::-webkit-scrollbar-thumb {
    background: #c0c4cc;
    border-radius: 3px;
  }
  
  .el-aside::-webkit-scrollbar-track {
    background: #f5f7fa;
  }

  /* 导航菜单样式优化 */
  .el-menu {
    border-right: none;
  }

  .el-menu-item, .el-submenu__title {
    height: 60px !important;
    line-height: 60px !important;
    font-size: 16px;
  }

  .el-submenu .el-menu-item {
    height: 50px !important;
    line-height: 50px !important;
    font-size: 14px;
  }

  .el-menu-item i, .el-submenu__title i {
    font-size: 18px;
    margin-right: 10px;
  }

  .el-menu-item:hover, .el-submenu__title:hover {
    background-color: #ecf5ff !important;
  }

  .el-menu-item.is-active {
    background-color: #409EFF !important;
    color: #fff !important;
  }

  /* 子菜单样式 */
  .el-submenu .el-menu {
    background-color: #f8f9fa;
  }

  /* 增加菜单项之间的间距 */
  .el-menu > .el-menu-item,
  .el-menu > .el-submenu {
    margin: 4px 0;
  }

  /* 修复内容区域的行高 */
  .el-container {
    min-height: 100vh;
  }

  /* 自定义菜单项样式 */
  .custom-menu-item {
    cursor: pointer;
  }
  
  .custom-menu-item .el-menu-item {
    padding-left: 54px !important;
  }
  
  .custom-menu-item .el-menu-item:hover {
    background-color: #ecf5ff !important;
  }
  
  .custom-menu-item .el-menu-item.is-active {
    background-color: transparent !important;
    color: #303133 !important;
  }
  </style>
  