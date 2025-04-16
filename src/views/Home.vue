<template>
  <div class="home">
    <el-row :gutter="20">
      <!-- 会议室使用情况卡片 -->
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>会议室使用情况</span>
          </div>
          <div class="card-content">
            <div class="status-item">
              <span>空闲会议室：</span>
              <span class="number free">{{ freeRooms }}</span>
            </div>
            <div class="status-item">
              <span>使用中：</span>
              <span class="number in-use">{{ inUseRooms }}</span>
            </div>
            <div class="status-item">
              <span>已预约：</span>
              <span class="number booked">{{ bookedRooms }}</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 今日会议概览卡片 -->
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>今日会议概览</span>
          </div>
          <div class="card-content">
            <div class="status-item">
              <span>今日会议总数：</span>
              <span class="number">{{ todayMeetings }}</span>
            </div>
            <div class="status-item">
              <span>正在进行：</span>
              <span class="number">{{ ongoingMeetings }}</span>
            </div>
            <div class="status-item">
              <span>即将开始：</span>
              <span class="number">{{ upcomingMeetings }}</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 设备状态卡片 -->
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>设备状态</span>
          </div>
          <div class="card-content">
            <div class="status-item">
              <span>空调运行：</span>
              <span class="number">{{ acWorking }}</span>
            </div>
            <div class="status-item">
              <span>投影使用：</span>
              <span class="number">{{ projectorWorking }}</span>
            </div>
            <div class="status-item">
              <span>设备异常：</span>
              <span class="number warning">{{ deviceErrors }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快速预约按钮 -->
    <div class="quick-booking">
      <el-button type="primary" size="large" @click="goToBooking">
        <i class="el-icon-date"></i> 立即预订
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      freeRooms: 5,
      inUseRooms: 3,
      bookedRooms: 2,
      todayMeetings: 8,
      ongoingMeetings: 2,
      upcomingMeetings: 3,
      acWorking: 4,
      projectorWorking: 3,
      deviceErrors: 1
    }
  },
  methods: {
    goToBooking() {
      this.$router.push('/main/booking-room')
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  padding: 10px 0;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
}

.number {
  font-size: 20px;
  font-weight: bold;
  color: #409EFF;
}

.free {
  color: #67C23A;
}

.in-use {
  color: #409EFF;
}

.booked {
  color: #E6A23C;
}

.warning {
  color: #F56C6C;
}

.quick-booking {
  text-align: center;
  margin-top: 30px;
}

.quick-booking .el-button {
  padding: 15px 40px;
  font-size: 18px;
}

.quick-booking .el-button i {
  margin-right: 5px;
}
</style> 