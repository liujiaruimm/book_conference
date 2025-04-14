<template>
  <div class="User">
    <div class="button">
      <el-button type="primary" @click="openWithForm"><i class="el-icon-plus"></i> 添加管理员</el-button>
    </div>
    <Table_user :tableData="tableData" /> <!-- 确保 tableData 绑定正确 -->
    
    <el-dialog :visible.sync="dialogVisible" title="新管理员信息" @close="handleClose">
      <el-form :model="administrator" label-width="80px">
        <el-form-item label="工号">
          <el-input v-model="administrator.id" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="administrator.email" type="email" placeholder="请输入管理员邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="administrator.phone" placeholder="请输入管理员电话"></el-input>
        </el-form-item>
        <el-form-item label="人脸照片">
          <el-upload
            class="upload-demo"
            action="#"
            :show-file-list="false"
            :before-upload="beforeUpload"
            @change="handleAvatarChange">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div v-if="administrator.photo" class="avatar-preview">
            <img :src="administrator.photo" alt="头像预览" class="avatar" />
          </div>
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
import Table_user from '../components/Table_user.vue';

export default {
  name: 'UserManagement',
  components: {
    Table_user
  },
  data() {
    return {
      dialogVisible: false,
      administrator: {
        id: '',
        email: '',
        phone: '',
        photo: ''
      },
      tableData: [
        { userId: '1', email: 'user1@example.com', phone: '1234567890', photo: '' },
        { userId: '2', email: 'user2@example.com', phone: '0987654321', photo: '' },
        { userId: '3', email: 'user3@example.com', phone: '1122334455', photo: '' }
      ]
    };
  },
  methods: {
    openWithForm() {
      this.dialogVisible = true; // 打开弹窗
    },
    handleSave() {
      if (this.validateInputs()) {
        const newAdministrator = {
          userId: this.administrator.id,
          email: this.administrator.email,
          phone: this.administrator.phone,
          photo: this.administrator.photo
        };
        
        this.tableData.push(newAdministrator); // 添加新管理员
        this.$message.success("添加成功");
        this.handleClose(); // 关闭弹窗
      } else {
        this.$message.error('请填写所有字段');
      }
    },
    handleClose() {
      this.dialogVisible = false; // 关闭弹窗
      this.resetForm(); // 重置表单
    },
    validateInputs() {
      return this.administrator.id && this.administrator.email && this.administrator.phone; // 确保字段非空
    },
    resetForm() {
      this.administrator = {
        id: '',
        email: '',
        phone: '',
        photo: ''
      }; // 重置表单
    },
    beforeUpload(file) {
      const isImage = file.type.indexOf('image') === 0;
      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式！');
      }
      return isImage;
    },
    handleAvatarChange(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.administrator.photo = e.target.result; // 存储图片数据URL
      };
      reader.readAsDataURL(file.raw);
    }
  }
}
</script>



<style>
.user {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
}

.button {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}

.el-input {
  width: 300px;
  margin-top: 10px;
}

body > .home {
  margin-bottom: 40px;
}
</style>

