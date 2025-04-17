<template>
  <div>
    <div class="block" style="display: flex; align-items: center; margin-bottom: 10px;">
      <span class="demonstration" style="margin-right: 10px;">
        <i class="el-icon-s-shop"></i>
      </span>
      <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
        style="margin-right: 10px;">
      </el-date-picker>

      <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>

    <el-table :data="bookings" style="width: 100%">
      <el-table-column prop="roomName" label="会议室" width="180"></el-table-column>
      <el-table-column prop="userName" label="预订人" width="120"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="180"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="180"></el-table-column>
      <el-table-column prop="participants" label="参与人数" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleCancel(scope.row)">取消预约</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: '',
      bookings: []
    };
  },
  mounted() {
    this.fetchBookings();
  },
  methods: {
    async fetchBookings() {
      try {
        // 从localStorage获取用户信息
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
          this.$message.warning('请先登录');
          this.$router.push('/login');
          return;
        }

        // 构建请求参数
        const params = new URLSearchParams();
        if (this.selectedDate) {
          params.append('date', this.selectedDate);
        }

        const response = await this.$http({
          method: 'post',
          url: '/getMeetingRoomBookings',
          data: params,
          headers: {
            'Authorization': `Bearer ${JSON.parse(userInfo).token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        // 检查响应状态
        if (response.data.status === 1) {
          if (response.data.data && Array.isArray(response.data.data)) {
            this.bookings = response.data.data.map(booking => ({
              id: booking.rReservationId || '1',
              roomId: booking.roomId,
              roomName: booking.roomName || '未知会议室',
              userName: booking.userName || 'admin',
              startTime: this.formatDateTime(booking.startTime),
              endTime: this.formatDateTime(booking.endTime),
              participants: booking.attendees || booking.numberOfAttendees || booking.participants || 0
            }));
          } else {
            this.$message.warning('暂无预约记录');
            this.bookings = [];
          }
        } else {
          this.$message.error(response.data.msg || '获取预约记录失败');
          this.bookings = [];
        }
      } catch (error) {
        console.error('获取预约记录失败:', error);
        this.$message.error('获取预约记录失败：' + (error.response?.data?.message || '网络错误'));
      }
    },

    formatDateTime(dateTimeStr) {
      if (!dateTimeStr) return '';
      // 处理后端返回的日期时间格式 "2025-04-16T15:00:00"
      const date = new Date(dateTimeStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    },

    async handleSearch() {
      await this.fetchBookings();
    },

    async handleCancel(booking) {
      try {
        const confirmed = await this.$confirm('确认取消该预约?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });

        if (confirmed) {
          console.log('准备取消的预约ID:', booking.id);
          
          const response = await fetch(`https://5229-222-210-192-60.ngrok-free.app/cancel?rReservationId=${booking.id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'ngrok-skip-browser-warning': '1'
            },
            credentials: 'include',
            mode: 'cors'
          });

          // 获取响应文本
          const responseText = await response.text();
          console.log('服务器响应:', {
            status: response.status,
            statusText: response.statusText,
            body: responseText
          });

          if (!response.ok) {
            throw new Error(`取消预约失败: ${response.status} - ${responseText}`);
          }

          let result;
          try {
            result = JSON.parse(responseText);
          } catch (e) {
            console.error('解析响应JSON失败:', e);
            throw new Error('服务器响应格式错误');
          }
          
          if (result.status === 200 || result.status === 1) {
            this.$message.success(result.msg || '取消预约成功');
            // 刷新预约列表
            await this.fetchBookings();
          } else {
            throw new Error(result.msg || '取消预约失败');
          }
        }
      } catch (error) {
        if (error !== 'cancel') {
          console.error('取消预约失败:', error);
          this.$message.error(error.message || '取消预约失败，请稍后重试');
        }
      }
    }
  }
}
</script>

<style>
.block {
  display: flex;
  align-items: center;
}
</style>

