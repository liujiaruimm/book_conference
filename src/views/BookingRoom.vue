<template>
  <div>
    <el-row>
      <!-- 选择会议室 -->
      <el-col :span="6" class="input-spacing">
        <el-select v-model="selectedRoom" placeholder="选择会议室" style="width: 100%;">
          <el-option
            v-for="room in meetingRooms"
            :key="room.roomName"
            :label="room.roomName"
            :value="room.roomName" />
        </el-select>
      </el-col>
      
      <!-- 开始时间选择器 -->
      <el-col :span="6" class="input-spacing">
        <el-time-select
          placeholder="开始时间"
          v-model="startTime"
          :picker-options="{
            start: '08:30',
            step: '00:10',
            end: '18:30'
          }" 
          style="width: 100%;" />
      </el-col>

      <!-- 结束时间选择器 -->
      <el-col :span="6" class="input-spacing">
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '08:30',
            step: '00:10',
            end: '18:30',
            minTime: startTime  // 限制结束时间不能早于开始时间
          }" 
          style="width: 100%;" />
      </el-col>
      
      <el-col :span="4" style="text-align: right;">
        <el-button type="primary" @click="searchMeetingRoom">查询</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col v-for="(room, index) in filteredRooms" :key="index" :span="8">
        <meeting-room-card 
          :image-url="room.imageUrl" 
          :room-name="room.roomName" 
          :location="room.location" 
          :capacity="room.capacity" 
          :available-time="room.availableTime" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MeetingRoomCard from '../components/RoomCard.vue'; 

export default {
  components: {
    MeetingRoomCard
  },
  data() {
    return {
      selectedRoom: null,  // 选择的会议室
      selectedDate: null,   // 选择的日期
      startTime: null,      // 开始时间
      endTime: null,        // 结束时间
      meetingRooms: [
        {
          imageUrl: require('../assets/c1.jpg'),  // 确保路径正确
          roomName: '会议室一',
          location: '101',
          capacity: 20,
          availableTime: '9:00 - 18:00'
        },
        {
          imageUrl: require('../assets/c2.jpg'),  // 确保路径正确
          roomName: '会议室二',
          location: '102',
          capacity: 15,
          availableTime: '10:00 - 17:00'
        },
        {
          imageUrl: require('../assets/c3.jpg'),  // 确保路径正确
          roomName: '会议室三',
          location: '103',
          capacity: 20,
          availableTime: '9:00 - 18:00'
        },
        {
          imageUrl: require('../assets/c4.jpg'),  // 确保路径正确
          roomName: '会议室四',
          location: '104',
          capacity: 15, 
          availableTime: '10:00 - 17:00'
        },
        {
          imageUrl: require('../assets/c5.jpg'),  // 确保路径正确
          roomName: '会议室五',
          location: '105',
          capacity: 20,
          availableTime: '9:00 - 18:00'
        },
        {
          imageUrl: require('../assets/c6.jpg'),  // 确保路径正确
          roomName: '会议室六',
          location: '106',
          capacity: 15,
          availableTime: '10:00 - 17:00'
        }
      ],
      filteredRooms: [] // 存储符合查询条件的会议室
    };
  },
  mounted() {
    this.filteredRooms = this.meetingRooms; // 初始化为所有会议室
  },
  methods: {
    searchMeetingRoom() {
      this.filteredRooms = this.meetingRooms.filter(room => {
        let isRoomSelected = !this.selectedRoom || this.selectedRoom === room.roomName;

        const roomAvailableTimes = room.availableTime.split(' - ');
        const roomStartTime = this.parseTime(roomAvailableTimes[0]);
        const roomEndTime = this.parseTime(roomAvailableTimes[1]);

        let isTimeSelected = true;

        // 仅判断开始时间
        if (this.startTime && !this.endTime) {
          const selectedStartTime = this.parseTime(this.startTime);
          isTimeSelected = selectedStartTime >= roomStartTime; // 只比较开始时间
        }

        // 同时判断开始时间和结束时间
        if (this.startTime && this.endTime) {
          const selectedStartTime = this.parseTime(this.startTime);
          const selectedEndTime = this.parseTime(this.endTime);
          isTimeSelected = selectedStartTime >= roomStartTime && selectedEndTime <= roomEndTime; // 同时比较开始和结束时间
        }

        return isRoomSelected && isTimeSelected;
      });

      // 如果有符合条件的房间可以进行预约逻辑，跳转到其他页面
      if (this.filteredRooms.length <= 0) {
      
        this.$message.warning('没有可用的会议室，请调整选择。');
      }
    },
    parseTime(timeStr) {
      const [hours, minutes] = timeStr.split(':');
      return parseInt(hours) * 60 + parseInt(minutes); // 时间转换为分钟
    }
  }
}
</script>

<style>
.input-spacing {
  margin-right: 20px;  /* 添加右侧间距 */
}
</style>
