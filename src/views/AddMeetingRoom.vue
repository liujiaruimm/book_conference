<template>
  <div class="AddRoom">
    <div class="row">
      <div class="button">
        <el-button type="primary" @click="openWithForm">
          <i class="el-icon-plus"></i> 添加会议室
        </el-button>
      </div>
    </div>
    <Table_2 :tableData="roomData" @update-table="updateTable" @delete-table="deleteTable" style="width: 100%;" />
  
    <el-dialog :visible.sync="roomDialogVisible" title="新会议室信息" @close="handleClose">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="editForm.roomName" placeholder="请输入会议室名称"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="editForm.location" placeholder="请输入会议室地点"></el-input>
        </el-form-item>
        <el-form-item label="容量">
          <el-input v-model.number="editForm.capacity" type="number" placeholder="请输入会议室容量"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table_2 from '../components/Table_2.vue';

export default {
  name: 'AddRoom',
  components: {
    Table_2
  },
  data() {
    return {
      roomDialogVisible: false,
      editForm: {
        roomName: '',
        location: '',
        capacity: null
      },
      roomData: [ // 初始四组数据
        { roomName: '会议室一', location: '101', capacity: 20 },
        { roomName: '会议室二', location: '102', capacity: 15 },
        { roomName: '会议室三', location: '103', capacity: 30 },
        { roomName: '会议室四', location: '104', capacity: 10 }
      ]
    };
  },
  methods: {
    openWithForm() {
      this.roomDialogVisible = true; // 打开弹窗
    },
    handleSave() {
      if (this.validateInputs()) {
        // 将新会议室添加到 roomData 数组中
        this.roomData.push({
          roomName: this.editForm.roomName,
          location: this.editForm.location,
          capacity: this.editForm.capacity
        });
        this.$message.success("会议室添加成功");
        this.handleClose(); // 关闭弹窗
      } else {
        this.$message.error('请填写所有字段');
      }
    },
    handleClose() {
      this.roomDialogVisible = false; // 关闭弹窗
      this.resetForm(); // 重置表单
    },
    validateInputs() {
      return this.editForm.roomName && this.editForm.location && this.editForm.capacity !== null; // 确保字段非空
    },
    resetForm() {
      this.editForm = {
        roomName: '',
        location: '',
        capacity: null
      }; // 重置表单
    },
    updateTable({ index, data }) {
      this.roomData[index] = data; // 更新会议室信息
    },
    deleteTable(index) {
      this.roomData.splice(index, 1); // 删除会议室
    }
  }
}
</script>


<style>
.AddRoom {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
}

.button {
  margin-bottom: 20px;
  text-align: left; /* 将按钮对齐到左侧 */
}

.row {
  display: flex; /* 使用 Flexbox 以确保按钮在行的最前面 */
  justify-content: flex-start; /* 按钮在行的左侧显示 */
}

.el-button {
  margin-right: 10px;
}

.el-input,
.el-select {
  width: 300px;
  margin-top: 10px;
}
</style>
