<template>
  <div class="device-control">
    <div class="header">
      <el-button type="primary" icon="el-icon-back" @click="goBack" class="back-button">返回主页</el-button>
    </div>
    <div class="iframe-container">
      <iframe 
        src="https://ha.79598454.xyz/sensor-0/0" 
        width="100%" 
        height="100%" 
        style="border: none;">
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceControl',
  methods: {
    goBack() {
      this.$router.push('/main/home')
    }
  }
}
</script>

<style scoped>
.device-control {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.header {
  padding: 16px 24px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.back-button {
  font-size: 14px;
  padding: 8px 16px;
}

.iframe-container {
  flex: 1;
  overflow: hidden;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  background-color: #fff;
}
</style>