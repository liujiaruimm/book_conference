<template>
  <el-card body-style="{ padding: '0px' }">
    <img :src="imageUrl" class="image">
    <div style="padding: 14px;">
      <span>{{ roomName }}</span><br>
      <span>地点：{{ location }}</span><br>
      <span>容纳人数：{{ capacity }}人</span><br>
      <span>可约时间：{{ availableTime }}</span>
      <div class="bottom clearfix">
        <el-button type="text" class="button" @click="goToBooking">预约会议室</el-button>
      </div>
    </div>
  </el-card>
</template>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
</style>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    roomName: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    availableTime: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedDate: null,  // 选择的日期
      startTime: null,      // 开始时间
      endTime: null,        // 结束时间
      attendees: ''         // 参会人数
    };
  },
  methods: {
    async checkAvailability() {
    try {
      const response = await this.$http.post('/api/checkAvailability', {
        roomName: this.roomName,
        startTime: this.startTime,
        endTime: this.endTime
      });

      if (response.data.available) {
        this.goToBooking();  // 如果可用，继续预约
      } else {
        this.$message.warning('该时间段已被预约，请选择其他时间。');
      }
    } catch (error) {
      console.error('检查可用性时出错:', error);
      this.$message.error('检查可用性失败，请稍后再试。');
    }
  },
    goToBooking() {
      this.$router.push({
        path: '/main/specificbook',
        query: {
          roomName: this.roomName,
          location: this.location,
          capacity: this.capacity,
          availableTime: this.availableTime,
          imageUrl: this.imageUrl
        }
        });
        }
  }
}
</script>
