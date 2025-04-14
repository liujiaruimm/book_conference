<template>
  <el-table
    :data="query"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="timeSlot"
      label="预约时间段"
      width="180">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="meetingRoom"
      label="会议室"
      width="180">
    </el-table-column>
    <el-table-column
      prop="location"
      label="会议室地点">
    </el-table-column>
    <el-table-column
      label="参会人数"
      width="120">
      <template slot-scope="scope">
        <el-input 
          v-model.number="scope.row.participants" 
          placeholder="参会人数" 
          type="number" 
          min="1"
          @blur="validateParticipants(scope.row)">
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="取消会议"
      width="150">
      <template slot-scope="scope">
        <el-button type="danger" @click="confirmCancelMeeting(scope.row)">取消会议</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { MessageBox } from 'element-ui';

export default {
  props: {
    query: {
      type: Array,
      required: true
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    confirmCancelMeeting(row) {
      MessageBox.confirm('此操作将删除你所预约的会议, 确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelMeeting(row);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    cancelMeeting(row) {
      this.$message({
        message: `已取消会议: ${row.meetingRoom}`,
        type: 'success'
      });
      this.query.splice(this.query.indexOf(row), 1);
    },
    validateParticipants(row) {
      if (row.participants < 1) {
        this.$message.error('参会人数必须大于或等于 1');
        row.participants = 1;  // 将人数重置为 1
      }
    }
  }
}
</script>

  
  <style>
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  </style>
  