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
      <el-table-column prop="startTime" label="开始时间" width="180"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="180"></el-table-column>
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
        const params = this.selectedDate ? { date: this.selectedDate } : {};
        const response = await this.$http.get('/getMeetingRoomBookings', { params });
        this.bookings = response.data.map(booking => ({
          ...booking,
          startTime: this.formatDateTime(booking.startTime),
          endTime: this.formatDateTime(booking.endTime)
        }));
      } catch (error) {
        this.$message.error('获取预约记录失败：' + (error.response?.data?.message || '网络错误'));
      }
    },

    formatDateTime(dateTimeStr) {
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
          // 这里需要后端提供取消预约的接口
          const response = await this.$http.delete(`/api/meeting-rooms/booking/${booking.id}`);
          if (response.data.success) {
            this.$message.success('取消预约成功');
            await this.fetchBookings();
          } else {
            this.$message.error('取消预约失败：' + response.data.message);
          }
        }
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('取消预约失败：' + (error.response?.data?.message || '网络错误'));
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

