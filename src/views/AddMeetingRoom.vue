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
      <el-form :model="editForm" label-width="80px" :rules="rules" ref="editForm">
        <el-form-item label="名称" prop="roomName">
          <el-input v-model="editForm.roomName" placeholder="请输入会议室名称"></el-input>
        </el-form-item>
        <el-form-item label="地点" prop="location">
          <el-input v-model="editForm.location" placeholder="请输入会议室地点"></el-input>
        </el-form-item>
        <el-form-item label="容量" prop="capacity">
          <el-input v-model.number="editForm.capacity" type="number" placeholder="请输入会议室容量"></el-input>
        </el-form-item>
        <el-form-item label="设备" prop="equipment">
          <el-select v-model="editForm.equipment" multiple placeholder="请选择会议室设备">
            <el-option v-for="item in equipmentOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="editForm.status" placeholder="请选择会议室状态">
            <el-option :value="1" label="可用"></el-option>
            <el-option :value="0" label="维护中"></el-option>
          </el-select>
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
        capacity: null,
        equipment: [],
        status: 1
      },
      equipmentOptions: [
        { value: '空调', label: '空调' },
        { value: '投影仪', label: '投影仪' },
        { value: '白板', label: '白板' },
        { value: '视频会议设备', label: '视频会议设备' }
      ],
      rules: {
        roomName: [
          { required: true, message: '请输入会议室名称', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请输入会议室地点', trigger: 'blur' }
        ],
        capacity: [
          { required: true, message: '请输入会议室容量', trigger: 'blur' },
          { type: 'number', message: '容量必须为数字', trigger: 'blur' }
        ],
        equipment: [
          { required: true, message: '请选择会议室设备', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择会议室状态', trigger: 'change' }
        ]
      },
      roomData: []
    };
  },
  methods: {
    openWithForm() {
      this.roomDialogVisible = true;
    },
    async handleSave() {
      try {
        await this.$refs.editForm.validate();
        const response = await this.$http.post('/?action=add', {
          roomName: this.editForm.roomName,
          capacity: this.editForm.capacity,
          location: this.editForm.location,
          equipment: this.editForm.equipment.join(','),
          status: this.editForm.status
        });
        
        if (response.data.status === 200) {
          this.$message.success('添加会议室成功');
          this.roomDialogVisible = false;
          this.loadRoomData();
        } else {
          this.$message.error('添加会议室失败：' + response.data.message);
        }
      } catch (error) {
        console.error('添加会议室时发生错误：', error);
        this.$message.error('添加会议室失败，请稍后重试');
      }
    },
    handleClose() {
      this.roomDialogVisible = false;
      this.$refs.editForm.resetFields();
    },
    async loadRoomData() {
      try {
        const response = await this.$http.get('/meetingRooms');
        if (response.data.status === 200) {
          this.roomData = response.data.data;
        }
      } catch (error) {
        console.error('加载会议室数据失败:', error);
        this.$message.error('加载会议室数据失败，请刷新页面重试');
      }
    },
    updateTable({ index, data }) {
      this.roomData[index] = data;
    },
    deleteTable(index) {
      this.roomData.splice(index, 1);
    }
  },
  mounted() {
    this.loadRoomData();
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
  text-align: left;
}

.row {
  display: flex;
  justify-content: flex-start;
}

.el-button {
  margin-right: 10px;
}

.el-input,
.el-select {
  width: 300px;
  margin-top: 10px;
}

.el-select .el-input {
  margin-top: 0;
}
</style>
