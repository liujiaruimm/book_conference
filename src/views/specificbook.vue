<template>
  <div class="page-container">
    <!-- 返回按钮 -->
    <div class="back-header">
      <el-page-header @back="goBack" content="会议室预约"></el-page-header>
    </div>

    <div class="content-wrapper">
      <!-- 左侧会议室信息 -->
      <div class="room-card">
        <div class="room-image" :style="{ backgroundImage: `url(${require('@/assets/images/c7.png')})` }">
          <div class="room-overlay">
            <h1 class="room-name">{{ roomName }}</h1>
            <el-tag :type="roomStatusType" effect="dark" class="status-tag">{{ roomStatus }}</el-tag>
          </div>
        </div>

        <div class="room-details">
          <div class="detail-item">
            <i class="el-icon-location-information"></i>
            <span>{{ location }}</span>
          </div>
          
          <div class="detail-item">
            <i class="el-icon-time"></i>
            <span>{{ available }}</span>
          </div>

          <div class="detail-item capacity-item">
            <div class="capacity-header">
              <i class="el-icon-user-solid"></i>
              <span>容纳人数：{{ capacity }}人</span>
            </div>
            <el-progress 
              :percentage="(attendees/capacity)*100" 
              :format="format" 
              :status="progressStatus"
              class="capacity-progress">
            </el-progress>
          </div>

          <div class="equipment-section">
            <h3>设备配置</h3>
            <div class="equipment-list">
              <el-tag 
                v-for="item in equipmentList" 
                :key="item" 
                effect="plain" 
                class="equipment-tag">
                {{ item }}
              </el-tag>
            </div>
          </div>

          <!-- 虚拟漫游入口 -->
          <div class="virtual-tour">
            <div class="tour-content">
              <div class="tour-info">
                <h3>虚拟漫游</h3>
                <p>体验真实的会议室环境</p>
              </div>
              <el-button 
                type="primary" 
                plain 
                icon="el-icon-view"
                @click="startVirtualTour">
                开始漫游
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧预约表单 -->
      <div class="booking-form">
        <div class="form-header">
          <h2>预约信息</h2>
          <el-tooltip content="选择日期和时间段，填写参会人数即可完成预约" placement="top">
            <el-button type="text" icon="el-icon-question" circle></el-button>
          </el-tooltip>
        </div>

        <!-- 日期选择器 -->
        <div class="date-section">
          <div class="section-title">选择日期</div>
          <div class="date-scroll">
            <div v-for="(date, index) in nextSevenDays" 
                 :key="index" 
                 class="date-item" 
                 :class="{ active: isSelectedDate(date) }"
                 @click="selectDate(date)">
              <span class="day-name">{{ getDayName(date) }}</span>
              <span class="date-number">{{ date.getDate() }}</span>
            </div>
          </div>
        </div>

        <!-- 时间选择器 -->
        <div class="time-section">
          <div class="section-title">选择时间</div>
          <div class="time-picker-group">
            <el-time-select
              v-model="startTime"
              :picker-options="{
                start: availableStart,
                step: '00:30',
                end: availableEnd
              }"
              placeholder="开始时间"
              class="time-input">
            </el-time-select>
            <div class="time-separator">至</div>
            <el-time-select
              v-model="endTime"
              :picker-options="{
                start: availableStart,
                step: '00:30',
                end: availableEnd,
                minTime: startTime
              }"
              placeholder="结束时间"
              class="time-input">
            </el-time-select>
          </div>
          <div class="duration-info" v-if="startTime && endTime">
            预计时长：{{ calculateDuration }}
          </div>
        </div>

        <!-- 参会人数 -->
        <div class="attendees-section">
          <div class="section-title">参会人数</div>
          <div class="attendees-input-group">
            <el-input-number 
              v-model="attendees" 
              :min="1" 
              :max="capacity"
              :step="1"
              size="medium"
              @change="handleAttendeesChange">
            </el-input-number>
            <span class="capacity-hint">最多可容纳 {{ capacity }} 人</span>
          </div>
        </div>

        <!-- 提交按钮 -->
        <div class="form-footer">
          <el-button 
            type="primary" 
            :disabled="!isFormValid || isOverCapacity" 
            class="submit-btn"
            @click="bookRoom">
            立即预约
          </el-button>
          <el-button plain class="check-btn" @click="checkConflicts">查看冲突</el-button>
        </div>
      </div>
    </div>

    <!-- 3D模型查看对话框 -->
    <el-dialog
      title="会议室3D预览"
      :visible.sync="showModel"
      :fullscreen="true"
      :before-close="closeModel"
      custom-class="model-dialog"
      @open="onDialogOpen"
      @closed="onDialogClosed">
      <div class="dialog-header" slot="title">
        <div class="header-left">
          <el-button 
            type="text" 
            icon="el-icon-back" 
            @click="closeModel"
            class="back-button">
            返回预约页面
          </el-button>
          <span class="dialog-title">会议室3D预览</span>
        </div>
      </div>
      <div class="model-container">
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
            :src="modelUrl"
            alt="会议室3D模型"
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
              <img :src="require('@/assets/images/c7.png')" alt="模型预览图" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
          </model-viewer>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SpecificBook',
  data() {
    return {
      roomName: this.$route.query.roomName,
      location: this.$route.query.location,
      capacity: parseInt(this.$route.query.capacity),
      available: this.$route.query.availableTime || '无可用时段',
      selectedDate: new Date(),
      startTime: '',
      endTime: '',
      attendees: 1,
      availableStart: '',
      availableEnd: '',
      equipmentList: ['投影仪', '白板', '视频会议系统', 'WiFi'],
      roomStatus: '空闲中',
      nextSevenDays: [],
      showModel: false,
      loading: false,
      modelError: null,
      modelUrl: window.location.origin + '/models/room1.glb',
      modelViewerReady: false
    }
  },
  computed: {
    isFormValid() {
      return this.selectedDate && this.startTime && this.endTime && this.attendees > 0
    },
    isOverCapacity() {
      return this.attendees > this.capacity
    },
    progressStatus() {
      if (this.attendees > this.capacity) return 'exception'
      if (this.attendees === this.capacity) return 'warning'
      return 'success'
    },
    roomStatusType() {
      return this.roomStatus === '空闲中' ? 'success' : 'warning'
    },
    calculateDuration() {
      if (!this.startTime || !this.endTime) return ''
      const start = new Date(`2000/01/01 ${this.startTime}`)
      const end = new Date(`2000/01/01 ${this.endTime}`)
      const diff = end - start
      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      return `${hours}小时${minutes}分钟`
    }
  },
  created() {
    this.initDateRange()
    if (this.available !== '无可用时段') {
      const times = this.available.split(' - ')
      this.availableStart = times[0]
      this.availableEnd = times[1]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    initDateRange() {
      const today = new Date()
      this.nextSevenDays = Array.from({length: 7}, (_, i) => {
        const date = new Date()
        date.setDate(today.getDate() + i)
        return date
      })
    },
    getDayName(date) {
      const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return days[date.getDay()]
    },
    isSelectedDate(date) {
      return date.toDateString() === this.selectedDate.toDateString()
    },
    selectDate(date) {
      this.selectedDate = date
    },
    format(percentage) {
      return percentage === 100 ? '已满' : `${percentage}%`
    },
    handleAttendeesChange(value) {
      if (value > this.capacity) {
        this.$message.warning(`参会人数不能超过会议室容量：${this.capacity}人`)
      }
    },
    showHelp() {
      this.$message({
        message: '选择日期和时间段，填写参会人数即可完成预约',
        type: 'info',
        duration: 3000
      })
    },
    checkConflicts() {
      // 这里可以添加检查时间冲突的逻辑
      this.$message({
        message: '当前时间段无冲突',
        type: 'success'
      })
    },
    async bookRoom() {
      if (this.isOverCapacity) {
        this.$message.error(`参会人数超过会议室容量！`)
        return
      }
      
      try {
        // 将选中的日期和时间合并成完整的日期时间字符串，并格式化为后端所需格式
        const formatDateTime = (date, timeStr) => {
          const [hours, minutes] = timeStr.split(':').map(Number)
          const dateTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hours,
            minutes
          )
          // 转换为 "yyyy-MM-ddTHH:mm:00" 格式
          const year = dateTime.getFullYear()
          const month = String(dateTime.getMonth() + 1).padStart(2, '0')
          const day = String(dateTime.getDate()).padStart(2, '0')
          const hour = String(hours).padStart(2, '0')
          const minute = String(minutes).padStart(2, '0')
          return `${year}-${month}-${day}T${hour}:${minute}:00`
        }

        const startDateTime = formatDateTime(this.selectedDate, this.startTime)
        const endDateTime = formatDateTime(this.selectedDate, this.endTime)

        const roomID = parseInt(this.$route.query.roomID || '1')

        // 构建表单数据
        const formData = new URLSearchParams()
        formData.append('startTime', startDateTime)
        formData.append('endTime', endDateTime)
        formData.append('roomID', roomID.toString())
        formData.append('attendees', this.attendees.toString())

        console.log('发送请求参数:', Object.fromEntries(formData))

        // 发送预约请求
        const response = await fetch('https://5229-222-210-192-60.ngrok-free.app/api/meeting-rooms/availability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': '1'
          },
          credentials: 'include',
          mode: 'cors',
          body: formData
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('服务器响应:', errorText)
          throw new Error(`预约失败: ${response.status} - ${errorText}`)
        }

        const result = await response.json()
        
        if (result.status === 200) {
          this.$message({
            type: 'success',
            message: result.msg || '预约成功！可查询你的预约记录'
          })
          // 跳转到查询页面
          this.$router.push('/main/inquiry-meeting-room')
        } else {
          throw new Error(result.msg || '预约失败，请稍后重试')
        }
      } catch (error) {
        console.error('预约失败:', error)
        this.$message.error(error.message || '预约失败，请稍后重试')
      }
    },
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
    startVirtualTour() {
      console.log('Opening 3D model');
      console.log('Model URL:', this.modelUrl);
      // 验证模型URL是否正确
      fetch(this.modelUrl)
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
      this.showModel = true;
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
            console.log('Loading model:', this.modelUrl);
            viewer.src = this.modelUrl;
            
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
      this.modelError = null;
    },
    closeModel(done) {
      this.loading = false;
      this.modelError = null;
      this.showModel = false;
      if (typeof done === 'function') {
        done();
      }
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
          viewer.src = this.modelUrl;
        }, 100);
      }
    }
  },
  mounted() {
    this.checkModelViewer();
  },
  beforeDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
    if (this.renderer) {
      this.renderer.dispose()
    }
  }
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 24px;
}

.back-header {
  margin-bottom: 24px;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 360px minmax(360px, 600px);
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 左侧会议室信息卡片 */
.room-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
}

.room-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  flex-shrink: 0;
}

.room-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
}

.room-name {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.status-tag {
  font-size: 12px;
}

.room-details {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: #606266;
}

.detail-item i {
  font-size: 18px;
  margin-right: 12px;
  color: #409EFF;
}

.capacity-item {
  flex-direction: column;
  align-items: stretch;
}

.capacity-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.equipment-section {
  margin-top: 24px;
  border-top: 1px solid #ebeef5;
  padding-top: 24px;
}

.equipment-section h3 {
  font-size: 16px;
  color: #303133;
  margin: 0 0 16px 0;
}

.equipment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.equipment-tag {
  font-size: 12px;
}

/* 右侧预约表单 */
.booking-form {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-shrink: 0;
}

.form-header h2 {
  font-size: 20px;
  color: #303133;
  margin: 0;
}

.section-title {
  font-size: 14px;
  color: #606266;
  margin-bottom: 16px;
  font-weight: 500;
}

/* 日期选择器样式 */
.date-section {
  margin-bottom: 24px;
  flex-shrink: 0;
}

.date-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.date-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.date-item:hover {
  border-color: #409EFF;
  transform: translateY(-2px);
}

.date-item.active {
  background-color: #409EFF;
  color: white;
  border-color: #409EFF;
}

.day-name {
  font-size: 13px;
  margin-bottom: 4px;
}

.date-number {
  font-size: 18px;
  font-weight: 600;
}

/* 时间选择器样式 */
.time-section {
  margin-bottom: 24px;
  flex-shrink: 0;
}

.time-picker-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.time-input {
  flex: 1;
}

.time-separator {
  color: #909399;
  font-size: 14px;
}

.duration-info {
  margin-top: 8px;
  color: #909399;
  font-size: 13px;
}

/* 参会人数样式 */
.attendees-section {
  margin-bottom: 24px;
  flex-shrink: 0;
}

.attendees-input-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.capacity-hint {
  color: #909399;
  font-size: 13px;
}

/* 提交按钮样式 */
.form-footer {
  margin-top: auto;
  flex-shrink: 0;
  display: flex;
  gap: 12px;
}

.submit-btn {
  flex: 2;
}

.check-btn {
  flex: 1;
}

/* 虚拟漫游样式 */
.virtual-tour {
  margin-top: 24px;
  border-top: 1px solid #ebeef5;
  padding-top: 24px;
}

.tour-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tour-info h3 {
  font-size: 16px;
  color: #303133;
  margin: 0 0 4px 0;
}

.tour-info p {
  font-size: 12px;
  color: #909399;
  margin: 0;
}

.model-preview {
  height: 120px;
  background: #f5f7fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    max-width: 600px;
  }

  .room-card,
  .booking-form {
    height: auto;
    min-height: auto;
  }

  .room-card {
    position: static;
  }

  .room-details {
    overflow-y: visible;
  }

  .equipment-section {
    margin-top: 24px;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 16px;
  }

  .booking-form {
    padding: 24px;
  }

  .time-picker-group {
    flex-direction: column;
  }

  .time-separator {
    margin: 8px 0;
  }

  .form-footer {
    flex-direction: column;
  }

  .submit-btn, 
  .check-btn {
    width: 100%;
  }

  .model-preview {
    height: 100px;
  }
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

/* 自定义 model-viewer 样式 */
model-viewer {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  --poster-color: transparent;
}

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

/* 对话框头部样式 */
.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-button {
  font-size: 14px;
  color: #409EFF;
  display: flex;
  align-items: center;
  padding: 0;
}

.back-button:hover {
  color: #66b1ff;
}

.back-button i {
  margin-right: 4px;
}

.dialog-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

/* 修改 element-ui 对话框样式 */
:deep(.el-dialog__header) {
  padding: 16px 0;
  margin: 0;
  border-bottom: 1px solid #ebeef5;
}

:deep(.el-dialog__headerbtn) {
  display: none;
}

:deep(.el-dialog__body) {
  padding: 0;
}
</style>
  