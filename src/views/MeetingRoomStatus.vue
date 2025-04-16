<template>
  <div class="meeting-room-status">
    <!-- 顶部统计卡片 -->
    <el-row :gutter="20" class="status-overview">
      <el-col :span="6" v-for="(stat, index) in statistics" :key="index">
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
          <div class="stat-card">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 搜索和筛选区域 -->
    <div class="search-filter-section">
      <el-input
        v-model="searchQuery"
        placeholder="搜索会议室..."
        prefix-icon="el-icon-search"
        clearable
        class="search-input"
      ></el-input>

      <el-select v-model="statusFilter" placeholder="状态筛选" clearable class="filter-select">
        <el-option label="全部" value=""></el-option>
        <el-option label="空闲" value="空闲"></el-option>
        <el-option label="使用中" value="正在使用"></el-option>
        <el-option label="停用" value="停用"></el-option>
      </el-select>

      <el-select v-model="capacityFilter" placeholder="容量筛选" clearable class="filter-select">
        <el-option label="全部" value=""></el-option>
        <el-option label="小型 (≤10人)" value="small"></el-option>
        <el-option label="中型 (11-20人)" value="medium"></el-option>
        <el-option label="大型 (>20人)" value="large"></el-option>
      </el-select>
    </div>

    <!-- 会议室卡片列表 -->
    <el-row :gutter="20" class="room-list">
      <el-col :span="8" v-for="room in filteredRooms" :key="room.name">
        <room-status-card 
          :room="room"
          @view-details="handleViewDetails"
        />
      </el-col>
    </el-row>

    <!-- 分页器 -->
    <div class="pagination-section">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 9, 12, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRooms"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import RoomStatusCard from '../components/RoomStatusCard.vue'

export default {
  name: 'MeetingRoomStatus',
  components: {
    RoomStatusCard
  },
  data() {
    return {
      rooms: [
        {
          name: "会议室1",
          address: "101",
          status: "空闲",
          capacity: "10人",
          equipment: "白板，麦克风，投影仪",
          booking: "查看"
        },
        {
          name: "会议室2",
          address: "102",
          status: "正在使用",
          capacity: "12人",
          equipment: "白板，麦克风，投影仪",
          booking: "查看"
        },
        {
          name: "会议室3",
          address: "103",
          status: "停用",
          capacity: "12人",
          equipment: "白板，麦克风，投影仪",
          booking: "查看"
        },
        {
          name: "会议室4",
          address: "104",
          status: "空闲",
          capacity: "15人",
          equipment: "白板，麦克风，投影仪",
          booking: "查看"
        },
        {
          name: "会议室5",
          address: "105",
          status: "正在使用",
          capacity: "17人",
          equipment: "白板，麦克风，投影仪",
          booking: "查看"
        },
        {
          name: "会议室6",
          address: "106",
          status: "正在使用",
          capacity: "9人",
          equipment: "白板，麦克风，投影仪",
          booking: "查看"
        }
      ],
      searchQuery: '',
      statusFilter: '',
      capacityFilter: '',
      currentPage: 1,
      pageSize: 6
    }
  },
  computed: {
    statistics() {
      const total = this.rooms.length
      const inUse = this.rooms.filter(room => room.status === '正在使用').length
      const free = this.rooms.filter(room => room.status === '空闲').length
      const disabled = this.rooms.filter(room => room.status === '停用').length

      return [
        { label: '总会议室', value: total },
        { label: '使用中', value: inUse },
        { label: '空闲', value: free },
        { label: '停用', value: disabled }
      ]
    },
    filteredRooms() {
      let filtered = this.rooms

      // 搜索过滤
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(room => 
          room.name.toLowerCase().includes(query) ||
          room.address.toLowerCase().includes(query)
        )
      }

      // 状态过滤
      if (this.statusFilter) {
        filtered = filtered.filter(room => room.status === this.statusFilter)
      }

      // 容量过滤
      if (this.capacityFilter) {
        const capacity = parseInt(room.capacity)
        switch(this.capacityFilter) {
          case 'small':
            filtered = filtered.filter(room => capacity <= 10)
            break
          case 'medium':
            filtered = filtered.filter(room => capacity > 10 && capacity <= 20)
            break
          case 'large':
            filtered = filtered.filter(room => capacity > 20)
            break
        }
      }

      // 分页
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return filtered.slice(start, end)
    },
    totalRooms() {
      return this.rooms.length
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleViewDetails(room) {
      // 实现查看详情的逻辑
      console.log('查看详情:', room)
    }
  }
}
</script>

<style scoped>
.meeting-room-status {
  padding: 20px;
}

.status-overview {
  margin-bottom: 20px;
}

.stat-card {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}

.stat-label {
  margin-top: 8px;
  color: #606266;
}

.search-filter-section {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
}

.search-input {
  width: 300px;
}

.filter-select {
  width: 150px;
}

.room-list {
  margin-bottom: 20px;
}

.pagination-section {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
