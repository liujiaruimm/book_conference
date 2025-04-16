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
        console.log('添加会议室，提交数据:', this.editForm);
        
        // 检查登录状态
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
          console.warn('用户未登录，无法添加会议室');
          this.$message.warning('请先登录系统');
          this.$router.push('/login');
          return;
        }
        
        // 使用代理路径
        const response = await this.$http.post('/api/add?action=add', {
          roomName: this.editForm.roomName,
          capacity: this.editForm.capacity,
          location: this.editForm.location,
          equpment: this.editForm.equipment.join(','), // 注意：后端字段名是 equpment 不是 equipment
          status: this.editForm.status
        });
        
        console.log('添加会议室响应:', response);
        
        // 检查响应类型
        if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
          console.error('返回了 HTML 页面，可能是登录页面');
          this.$message.error('会话已过期，请重新登录');
          this.$router.push('/login');
          return;
        }
        
        if (response.data && response.data.status === 200) {
          this.$message.success('添加会议室成功');
          this.roomDialogVisible = false;
          this.loadRoomData();
        } else {
          console.warn('添加会议室返回非成功状态:', response.data);
          this.$message.error('添加会议室失败：' + (response.data.error || '未知错误'));
          
          // 尽管返回了错误，但仍然将新会议室添加到本地数据中，保证用户体验
          const newRoom = {
            roomName: this.editForm.roomName,
            capacity: this.editForm.capacity,
            location: this.editForm.location,
            equipment: this.editForm.equipment.join(','),
            status: this.editForm.status
          };
          this.roomData.push(newRoom);
          this.roomDialogVisible = false;
          this.$message.info('已在本地添加会议室');
        }
      } catch (error) {
        console.error('添加会议室时发生错误：', error);
        this.$message.error('添加会议室失败：' + (error.response?.data?.error || '请稍后重试'));
        
        // 出现错误时，仍然添加到本地数据中
        const newRoom = {
          roomName: this.editForm.roomName,
          capacity: this.editForm.capacity,
          location: this.editForm.location,
          equipment: this.editForm.equipment.join(','),
          status: this.editForm.status
        };
        this.roomData.push(newRoom);
        this.roomDialogVisible = false;
        this.$message.info('已在本地添加会议室');
      }
    },
    handleClose() {
      this.roomDialogVisible = false;
      this.$refs.editForm.resetFields();
    },
    async loadRoomData() {
      try {
        console.log('开始加载会议室数据...');
        
        // 检查登录状态
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo || !JSON.parse(userInfo).isLoggedIn) {
          console.warn('用户未登录或登录状态无效');
          this.$message.warning('请先登录系统');
          setTimeout(() => {
            this.$router.push('/login');
          }, 100);
          return;
        }

        const parsedUserInfo = JSON.parse(userInfo);
        // 检查登录是否过期（24小时）
        const now = new Date().getTime();
        if (now - parsedUserInfo.loginTime > 24 * 60 * 60 * 1000) {
          console.warn('登录已过期');
          this.$message.warning('登录已过期，请重新登录');
          localStorage.removeItem('userInfo');
          setTimeout(() => {
            this.$router.push('/login');
          }, 100);
          return;
        }
        
        // 使用代理路径，添加token到请求头
        const response = await this.$http.get('/api/meetingRooms', {
          headers: {
            'Authorization': `Bearer ${parsedUserInfo.token}`
          }
        });
        
        console.log('会议室数据响应:', response);
        
        // 检查响应类型
        if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
          console.error('返回了 HTML 页面，需要重新登录');
          this.$message.error('会话已过期，请重新登录');
          localStorage.removeItem('userInfo');
          setTimeout(() => {
            this.$router.push('/login');
          }, 100);
          return;
        }
        
        if (response.data && Array.isArray(response.data)) {
          this.roomData = response.data;
          this.$message.success('会议室数据加载成功');
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          this.roomData = response.data.data;
          this.$message.success('会议室数据加载成功');
        } else {
          console.warn('返回的数据格式不正确，使用模拟数据:', response.data);
          this.loadMockData();
        }
      } catch (error) {
        console.error('加载会议室数据失败:', error);
        this.$message.error('加载会议室数据失败：' + (error.response?.data?.error || '请刷新页面重试'));
        this.loadMockData();
      }
    },
    
    // 加载模拟数据
    loadMockData() {
      this.$message.info('使用模拟数据');
      this.roomData = [
        {
          roomName: '会议室一',
          location: '101',
          capacity: 20,
          equipment: '空调,投影仪,白板',
          status: 1
        },
        {
          roomName: '会议室二',
          location: '102',
          capacity: 15,
          equipment: '空调,白板',
          status: 1
        },
        {
          roomName: '会议室三',
          location: '103',
          capacity: 30,
          equipment: '空调,投影仪,视频会议设备',
          status: 1
        }
      ];
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
