<template>
  <el-container class="container" z-index="1">
    <el-page-header @back="goBack" content="会议室页面"></el-page-header>
    <el-header :style="{ backgroundColor: '#ffffff', display: 'flex' }">
      <el-tag style="flex: 1; height: 40px; line-height: 40px; font-weight: bold; font-size: 16px;">{{ roomName }}</el-tag>
      <el-tag type="success" style="flex: 1; height: 40px; line-height: 40px; font-weight: bold; font-size: 16px;">地点：{{ location }}</el-tag>
      <el-tag type="info" style="flex: 1; height: 40px; line-height: 40px; font-weight: bold; font-size: 16px;">容量：{{ capacity }}人</el-tag>
      <el-tag type="warning" style="flex: 1; height: 40px; line-height: 40px; font-weight: bold; font-size: 16px;">可用时间：{{ available || '无可用时段' }}</el-tag>
    </el-header>
    <el-container>
      <el-main class="spmain">
        <el-card class="box-card" z-index="0">
          <div slot="header" class="clearfix">
            <span>预约会议室</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="bookRoom">确定预约</el-button>
          </div>
          <div style="padding: 10px;">
            <!-- 日期选择器 -->
            <el-col :span="24" class="input-spacing">
              <el-date-picker
                v-model="selectedDate"
                style="width: 100%;" 
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>

            <!-- 开始时间选择器 -->
            <el-col :span="24" class="input-spacing">
              <el-time-select
                placeholder="开始时间"
                v-model="startTime"
                style="width: 100%;" 
                :picker-options="{
                  start: availableStart,
                  step: '00:30',
                  end: availableEnd
                }">
              </el-time-select>
            </el-col>

            <!-- 结束时间选择器 -->
            <el-col :span="24" class="input-spacing">
              <el-time-select
                placeholder="结束时间"
                v-model="endTime"
                style="width: 100%;" 
                :picker-options="{
                  start: availableStart,
                  step: '00:30',
                  end: availableEnd,
                  minTime: startTime // 限制结束时间不能小于开始时间
                }">
              </el-time-select>
            </el-col>

            <!-- 输入参会人数 -->
            <el-col :span="24" class="input-spacing">
              <el-input
                v-model="attendees"
                type="number"
                placeholder="参会人数">
              </el-input>
            </el-col>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

  
  <script>
  export default {
    data() {
      return {
        roomName: this.$route.query.roomName, 
        location: this.$route.query.location,
        capacity: this.$route.query.capacity,
        available: this.$route.query.availableTime || '无可用时段', 
        selectedDate: null,  
        startTime: null,      
        endTime: null,        
        attendees: '',        
        availableStart: '',    // 可预约开始时间
        availableEnd: ''       // 可预约结束时间
      };
    },
    mounted() {
      // 从可用时间字符串中提取开始和结束时间
      if (this.available !== '无可用时段') {
        const times = this.available.split(' - ');
        this.availableStart = times[0];
        this.availableEnd = times[1];
      }
    },
    methods: {
      goBack() {
      this.$router.go(-1);  // 返回上一个页面
    },
      bookRoom() {
        console.log('预约逻辑执行');
        console.log('日期:', this.selectedDate);
        console.log('开始时间:', this.startTime);
        console.log('结束时间:', this.endTime);
        console.log('参会人数:', this.attendees);
        if (parseInt(this.attendees) > this.capacity) {
        this.$message.error(`人数超过最大容纳人数: ${this.capacity}人！`);
        return;
      }
    
        // 跳转到查询页面
        this.$router.push('/main/inquiry-meeting-room');
        this.$message({ type: 'success', message: '预约成功！可查询你的预约记录' });
      }
    }
  }
  </script>

  <style>
  .room-title {
      font-family: Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
      color: rgb(17, 100, 138);
  border-radius: 8px; /* 圆角效果 */
  background-color: rgba(240, 248, 255, 0.8); /* 背景颜色，可选 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 景深效果 */
  }
  .el-header p {
  border-radius: 8px; /* 圆角效果 */
  background-color: rgba(240, 248, 255, 0.8); /* 背景颜色，可选 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 景深效果 */
}
  .box-card {
      width: 50%; /* 卡片宽度设置 */
      height: 400px;
      margin: 0 auto; /* 居中 */
      margin-top: 50px; /* 上方间距 */
  }
  .spmain {
    background-image: url('../assets/c3.jpg');
    margin-top: 30px;
    background-size: cover;
    background-position: center;
    height: 100vh; /* 铺满整个视口高度 */
}
  .input-spacing {
      margin-bottom: 10px; /* 各个输入项之间的间距 */
  }
  </style>
  