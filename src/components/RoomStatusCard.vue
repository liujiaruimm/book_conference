<template>
  <el-card class="room-card" :body-style="{ padding: '0px' }" shadow="hover">
    <div class="room-header">
      <div class="room-title">
        <span class="room-name">{{ room.name }}</span>
        <el-tag :type="getStatusType" effect="dark">{{ room.status }}</el-tag>
      </div>
      <div class="room-location">
        <i class="el-icon-location"></i> {{ room.address }}
      </div>
    </div>
    
    <div class="room-content">
      <div class="info-item">
        <i class="el-icon-user"></i>
        <span>容量：{{ room.capacity }}</span>
      </div>
      
      <div class="equipment-list">
        <div class="equipment-title">设备状态：</div>
        <div class="equipment-items">
          <div v-for="(status, device) in parseEquipment(room.equipment)" :key="device" class="equipment-item-wrapper">
            <el-tooltip :content="getEquipmentStatus(status)" placement="top">
              <div class="equipment-item">
                <i :class="getEquipmentIcon(device)"></i>
                <span class="equipment-status-dot" :class="getStatusDotClass(status)"></span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

    <div class="room-footer">
      <el-button type="text" @click="viewDetails">
        <i class="el-icon-more"></i> 详细信息
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'RoomStatusCard',
  props: {
    room: {
      type: Object,
      required: true
    }
  },
  computed: {
    getStatusType() {
      const statusMap = {
        '空闲': 'success',
        '正在使用': 'danger',
        '停用': 'info'
      }
      return statusMap[this.room.status] || 'info'
    }
  },
  methods: {
    parseEquipment(equipmentStr) {
      // 模拟设备状态
      const devices = equipmentStr.split('，')
      const status = {}
      devices.forEach(device => {
        status[device.trim()] = Math.random() > 0.7 ? 'warning' : 'normal'
      })
      return status
    },
    getEquipmentIcon(device) {
      const iconMap = {
        '白板': 'el-icon-edit-outline',
        '麦克风': 'el-icon-microphone',
        '投影仪': 'el-icon-video-camera',
        '空调': 'el-icon-cold-drink'
      }
      return iconMap[device] || 'el-icon-setting'
    },
    getEquipmentStatus(status) {
      return status === 'normal' ? '正常' : '需要维护'
    },
    getStatusDotClass(status) {
      return {
        'status-normal': status === 'normal',
        'status-warning': status === 'warning'
      }
    },
    viewDetails() {
      this.$emit('view-details', this.room)
    }
  }
}
</script>

<style scoped>
.room-card {
  margin: 10px;
  transition: all 0.3s ease;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.room-header {
  background-color: #f5f7fa;
  padding: 15px;
}

.room-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.room-name {
  font-size: 18px;
  font-weight: bold;
}

.room-location {
  color: #909399;
  font-size: 14px;
}

.room-content {
  padding: 15px;
}

.info-item {
  margin-bottom: 10px;
}

.info-item i {
  margin-right: 5px;
  color: #409EFF;
}

.equipment-list {
  margin-top: 15px;
}

.equipment-title {
  margin-bottom: 10px;
  color: #606266;
}

.equipment-items {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.equipment-item {
  position: relative;
  display: flex;
  align-items: center;
}

.equipment-status-dot {
  position: absolute;
  right: -3px;
  top: -3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-normal {
  background-color: #67C23A;
}

.status-warning {
  background-color: #E6A23C;
}

.room-footer {
  border-top: 1px solid #EBEEF5;
  padding: 10px 15px;
  display: flex;
  justify-content: flex-end;
}
</style> 