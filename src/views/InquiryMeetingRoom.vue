<template>
  <div>
    <div class="block" style="display: flex; align-items: center; margin-bottom: 10px;">
      <span class="demonstration" style="margin-right: 10px;">
        <i class="el-icon-s-shop"></i>
      </span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        style="margin-right: 10px;">
      </el-date-picker>

      <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>

    <Inquiry :query="queryResults" />
  </div>
</template>

<script>
import Inquiry from '@/components/Inquiry.vue';

export default {
  components: {
    Inquiry
  },
  data() {
    return {
      pickerOptions: {},
      value1: '', // 日期选择的模型
      allData: [ // 模拟数据
        {
          timeSlot: '2025-01-10 09:00-10:00',
          userName: 'my',
          meetingRoom: '会议室一',
          location: '101',
          participants: 5
        },
        {
          timeSlot: '2025-01-10 10:00-11:00',
          userName: 'my',
          meetingRoom: '会议室三',
          location: '102',
          participants: 3
        },
      
      ],
      queryResults: [] // 存储查询结果
    };
  },
  mounted() {
    this.queryResults = this.allData; // 初始化显示所有模拟数据
  },
  methods: {
    handleSearch() {
      // 输出实际选择的日期到控制台
      console.log("实际查询的日期:", this.value1);

      this.queryResults = this.allData.filter(item => {
        const itemDateStr = item.timeSlot.split(' ')[0]; // 获取记录日期字符串
        const itemDate = new Date(itemDateStr); // 将记录中的日期字符串转换为Date对象
        const selectedDate = this.value1 ? new Date(this.value1) : null; // 直接转换选择的日期为Date对象

        // 只比较日、月、年
        const matchesDate = selectedDate ? 
          (itemDate.getFullYear() === selectedDate.getFullYear() &&
           itemDate.getMonth() === selectedDate.getMonth() &&
           itemDate.getDate() === selectedDate.getDate()) 
          : true; // 检查日期是否匹配

        return matchesDate; // 返回符合条件的记录
      });
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

