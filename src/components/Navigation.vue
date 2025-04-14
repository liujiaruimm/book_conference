<template>
  <el-col>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
      <template slot="title">
       <i class="el-icon-location"></i>
       <span>会议室管理</span>
      </template>
        <el-menu-item index="1-1">添加会议室</el-menu-item>
        <el-menu-item index="1-2">会议室状态</el-menu-item>
      </el-submenu>

      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="3">
  <i class="el-icon-document"></i>
  <span slot="title">环境监测</span>
</el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">设备控制</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </template>
<script>
import router from '@/router';

 export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>