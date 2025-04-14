<template>
  <el-table
    :data="tableData"
    height="550"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="会议室名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="会议室地点"
      width="180">
    </el-table-column>
    <el-table-column
      prop="capacity"
      label="可容纳人数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="使用状态"
      width="180">
      <template slot-scope="scope">
        <span :style="{ color: getStatusColor(scope.row.status) }">{{ scope.row.status }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="equipment"
      label="设备">
    </el-table-column>
    <el-table-column
      prop="booking"
      label="预定情况"
      width="180">
      <template slot-scope="scope">
        <el-button @click="handleBookingClick(scope.row.booking)" type="primary" style="margin: 0 auto; display: block;background-color: #8dade8; color: white;border: none;">
          {{ scope.row.booking }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
          {
            name:"会议室1",
            address: 101,
            status: "空闲",
            capacity: "10人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室2",
            address: 102,
            status: "正在使用",
            capacity: "12人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室3",
            address: 103,
            status: "停用",
            capacity: "12人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室4",
            address: 104,
            status: "空闲",
            capacity: "15人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室5",
            address: 105,
            status: "正在使用",
            capacity: "17人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室6",
            address: 106,
            status: "正在使用",
            capacity: "9人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室7",
            address: 107,
            status: "空闲",
            capacity: "12人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室8",
            address: 108,
            status: "空闲",
            capacity: "10人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室9",
            address: 201,
            status: "空闲",
            capacity: "10人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室10",
            address: 202,
            status: "正在使用",
            capacity: "15人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室11",
            address: 203,
            status: "空闲",
            capacity: "20人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室12",
            address: 204,
            status: "停用",
            capacity: "12人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          },
          {
            name:"会议室13",
            address: 205,
            status: "空闲",
            capacity: "17人",
            equipment: "白板，麦克风，投影仪",
            booking: "查看"
          }
        ]
    }
  },
  methods: {
    handleBookingClick(bookingInfo) {
      this.open();  // 点击时就打开弹框
    },
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: '预定情况',
        message: h('el-empty', {
          props: {
            description: '暂无预定信息'
          }
        }),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    },
    getStatusColor(status) {
      if (status === '空闲') {
        return 'green'; // '空闲' 状态为绿色
      } else if (status === '正在使用') {
        return 'blue'; // '正在使用' 状态为蓝色
      } else if (status === '停用') {
        return 'red'; // '停用' 状态为红色
      }
      return 'black'; // 默认颜色为黑色
    }
  }
}
</script>

<style>
.row-green {
  color: green;
}

.row-blue {
  color: blue;
}

.row-red {
  color: red;
}

.el-table .el-table__header tr {
  height: 30px;
}

.el-table .el-table__header th {
  line-height: 30px;
  padding: 0;
}
</style>





