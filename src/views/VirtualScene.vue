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
        </div>
        <div v-if="modelError" class="error-overlay">
          <i class="el-icon-warning"></i>
          <p>{{ modelError }}</p>
          <el-button type="primary" @click="retryLoadModel">重试</el-button>
        </div>
        <div v-show="!loading && !modelError" class="model-viewer-container">
          <model-viewer
            ref="modelViewer"
            :src="selectedRoom.modelUrl"
            alt="3D模型"
            camera-controls
            auto-rotate
            shadow-intensity="1"
            exposure="1"
            style="width: 100%; height: 80vh; background: #f0f0f0;"
            @load="onModelLoad"
            @error="onModelError"
            interaction-prompt="auto"
            interaction-prompt-style="basic"
            loading="eager"
            reveal="auto"
            ar
            ar-modes="webxr scene-viewer quick-look"
          >
            <div slot="poster" class="poster">
              <img :src="selectedRoom.imageUrl" alt="模型预览图" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
          </model-viewer>
        </div>
      </div>
    </el-dialog>

    <!-- 调试信息 -->
    <div v-if="debug" class="debug-info">
      <h3>调试信息</h3>
      <p>Model Viewer 状态: {{ modelViewerReady ? '已加载' : '未加载' }}</p>
      <p>当前模型: {{ selectedRoom ? selectedRoom.modelUrl : '无' }}</p>
      <p>加载状态: {{ loading ? '加载中' : '已完成' }}</p>
      <p>错误信息: {{ modelError || '无' }}</p>
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
      modelViewerReady: false,
      debug: true, // 开启调试模式
      virtualRooms: [
        {
          name: '大型会议室',
          imageUrl: require('@/assets/c1.jpg'),
          capacity: 30,
          description: '配备完整多媒体设备，适合大型会议和演讲',
          modelUrl: window.location.origin + '/models/room1.glb'  // 使用完整的URL路径
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
      console.log('Model URL:', room.modelUrl);
      // 验证模型URL是否正确
      fetch(room.modelUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log('Model file is accessible');
        })
        .catch(error => {
          console.error('Model file access error:', error);
          this.modelError = `模型文件访问失败: ${error.message}`;
        });
      this.selectedRoom = room;
      this.dialogVisible = true;
      this.loading = true;
      this.modelError = null;
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
            console.log('Loading model:', this.selectedRoom.modelUrl);
            viewer.src = this.selectedRoom.modelUrl;
            
            // 监听模型加载过程中的错误
            viewer.addEventListener('error', (error) => {
              console.error('Model viewer error:', error);
              this.modelError = `模型加载错误: ${error.detail}`;
            });
            
            // 监听模型加载状态
            viewer.addEventListener('load', () => {
              console.log('Model loaded into viewer');
              this.loading = false;
            });
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
    },
    handleClose(done) {
      this.loading = false;
      this.selectedRoom = null;
      this.modelError = null;
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
    retryLoadModel() {
      this.loading = true;
      this.modelError = null;
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
  position: relative;
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
  position: relative;
  width: 100%;
  height: 80vh;
  background: #f5f7fa;
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

.model-viewer-container {
  width: 100%;
  height: 100%;
}

.debug-info {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  z-index: 1000;
}

/* 自定义 model-viewer 样式 */
model-viewer {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  --poster-color: transparent;
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