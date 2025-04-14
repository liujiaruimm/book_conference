<template>
  <div class="fullscreen-container">
    <div class="header">
      <el-button type="primary" icon="el-icon-back" @click="goBack">返回主页</el-button>
      <span class="title">设备控制面板</span>
    </div>
    <div class="iframe-container">
      <div v-if="loading" class="loading-container">
        <el-spinner type="primary"></el-spinner>
        <p>加载中...</p>
      </div>
      <div v-if="error" class="error-container">
        <i class="el-icon-warning"></i>
        <p>{{ error }}</p>
        <el-button type="primary" @click="reload">重新加载</el-button>
      </div>
      <iframe 
        v-show="!loading && !error"
        ref="iframe"
        :src="iframeUrl" 
        width="100%" 
        height="100%" 
        @load="onIframeLoad"
        @error="onIframeError"
        style="border: none;">
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceControl',
  data() {
    return {
      loading: true,
      error: null,
      iframeUrl: 'https://ha.79598454.xyz/sensor-0/0'
    }
  },
  methods: {
    goBack() {
      if (window.opener) {
        window.close();
      } else {
        this.$router.push('/main');
      }
    },
    onIframeLoad() {
      this.loading = false;
      this.error = null;
    },
    onIframeError() {
      this.loading = false;
      this.error = '加载失败，请检查网络连接或重试';
    },
    reload() {
      this.loading = true;
      this.error = null;
      const iframe = this.$refs.iframe;
      iframe.src = this.iframeUrl;
    }
  },
  mounted() {
    document.title = '设备控制面板';
  }
}
</script>

<style scoped>
.fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 16px 24px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  z-index: 1000;
}

.title {
  margin-left: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.iframe-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.loading-container,
.error-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.error-container {
  color: #f56c6c;
}

.error-container i {
  font-size: 48px;
  margin-bottom: 20px;
}

.error-container p {
  margin-bottom: 20px;
  font-size: 16px;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
  display: block;
}
</style>