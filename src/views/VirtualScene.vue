<template>
  <div class="virtual-scene-container">
    <el-row :gutter="20">
      <el-col :span="8" v-for="(room, index) in virtualRooms" :key="index">
        <el-card class="room-card">
          <img :src="room.imageUrl" class="room-image">
          <div class="room-info">
            <h3>{{ room.name }}</h3>
            <p>容纳人数：{{ room.capacity }}人</p>
            <p>{{ room.description }}</p>
            <el-button type="primary" size="small" @click="view3DModel(room)">查看3D模型</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 3D模型查看对话框 -->
    <el-dialog
      :title="selectedRoom ? selectedRoom.name + ' - 3D预览' : ''"
      :visible.sync="dialogVisible"
      :fullscreen="true"
      :before-close="handleClose"
      custom-class="model-dialog"
      @open="onDialogOpen"
      @closed="onDialogClosed">
      <div class="model-container" v-if="selectedRoom">
        <div v-if="loading" class="loading-overlay">
          <i class="el-icon-loading"></i>
          <p>模型加载中...</p>
          <p v-if="loadingProgress > 0">加载进度: {{ loadingProgress }}%</p>
        </div>
        <div v-if="modelError" class="error-overlay">
          <i class="el-icon-warning"></i>
          <p>{{ modelError }}</p>
          <el-button type="primary" @click="retryLoadModel">重试</el-button>
        </div>
        <!-- 测试用的简单模型显示 -->
        <model-viewer
          v-show="!loading && !modelError"
          ref="modelViewer"
          src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
          camera-controls
          auto-rotate
          style="width: 100%; height: 80vh; background: #f0f0f0;"
          @load="onModelLoad"
          @error="onModelError"
          @progress="onProgress"
        ></model-viewer>
      </div>
    </el-dialog>

    <!-- 调试信息 -->
    <div v-if="debug" style="position: fixed; bottom: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 10px; font-family: monospace; font-size: 12px;">
      <p>Model Viewer Ready: {{ modelViewerReady }}</p>
      <p>Loading: {{ loading }}</p>
      <p>Progress: {{ loadingProgress }}%</p>
      <p>Error: {{ modelError }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualScene',
  data() {
    return {
      dialogVisible: false,
      selectedRoom: null,
      loading: false,
      modelError: null,
      autoRotate: true,
      modelViewer: null,
      loadingProgress: 0,
      modelViewerReady: false,
      debug: true, // 开启调试模式
      virtualRooms: [
        {
          name: '大型会议室',
          imageUrl: require('@/assets/c1.jpg'),
          capacity: 30,
          description: '配备完整多媒体设备，适合大型会议和演讲',
          modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'
        }
      ]
    }
  },
  mounted() {
    this.checkModelViewer();
  },
  methods: {
    checkModelViewer() {
      const check = () => {
        if (customElements.get('model-viewer')) {
          console.log('model-viewer is ready');
          this.modelViewerReady = true;
        } else {
          console.log('waiting for model-viewer...');
          setTimeout(check, 100);
        }
      };
      check();
    },
    view3DModel(room) {
      console.log('Opening 3D model for:', room.name);
      this.selectedRoom = room;
      this.dialogVisible = true;
      this.loading = true;
      this.modelError = null;
      this.loadingProgress = 0;
    },
    onDialogOpen() {
      console.log('Dialog opened');
      this.$nextTick(() => {
        const viewer = this.$refs.modelViewer;
        if (viewer) {
          console.log('Model viewer element found');
          // 强制重新加载模型
          viewer.src = '';
          setTimeout(() => {
            viewer.src = this.selectedRoom.modelUrl;
          }, 100);
        } else {
          console.error('Model viewer element not found');
          this.modelError = '模型查看器初始化失败';
        }
      });
    },
    onDialogClosed() {
      console.log('Dialog closed');
      this.loading = false;
      this.selectedRoom = null;
      this.modelError = null;
      this.loadingProgress = 0;
    },
    handleClose(done) {
      this.loading = false;
      this.selectedRoom = null;
      this.modelError = null;
      this.loadingProgress = 0;
      done();
    },
    onModelLoad(event) {
      console.log('Model loaded successfully');
      this.loading = false;
      this.modelError = null;
      this.$message.success('3D模型加载成功');
    },
    onModelError(error) {
      console.error('Model loading error:', error);
      this.loading = false;
      this.modelError = '3D模型加载失败，请检查模型文件是否正确';
      this.$message.error(this.modelError);
    },
    onProgress(event) {
      const progress = event.detail.totalProgress * 100;
      console.log('Loading progress:', progress);
      this.loadingProgress = Math.round(progress);
    },
    retryLoadModel() {
      this.loading = true;
      this.modelError = null;
      this.loadingProgress = 0;
      const viewer = this.$refs.modelViewer;
      if (viewer) {
        viewer.src = '';
        setTimeout(() => {
          viewer.src = this.selectedRoom.modelUrl;
        }, 100);
      }
    }
  }
}
</script>

<style scoped>
.virtual-scene-container {
  padding: 20px;
}

.room-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;
}

.room-card:hover {
  transform: translateY(-5px);
}

.room-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.room-info {
  padding: 15px;
}

.room-info h3 {
  margin: 0 0 10px 0;
  color: #303133;
}

.room-info p {
  margin: 5px 0;
  color: #606266;
}

.model-container {
  width: 100%;
  height: 80vh;
  background: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.loading-overlay i,
.error-overlay i {
  font-size: 32px;
  margin-bottom: 10px;
}

.error-overlay {
  color: #F56C6C;
}

.error-overlay .el-button {
  margin-top: 20px;
}

.controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 自定义 model-viewer 样式 */
model-viewer {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
}

/* 添加一些控制按钮的样式 */
model-viewer::part(default-progress-bar) {
  background-color: #409EFF;
}

model-viewer::part(default-progress-mask) {
  display: none;
}

/* 对话框样式 */
:deep(.model-dialog) {
  margin: 0 !important;
}

.progress {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 0 20px;
  z-index: 1;
}
</style> 