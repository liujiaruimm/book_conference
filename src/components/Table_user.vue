    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="工号ID" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
    
        <el-table-column label="邮箱" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
    
        <el-table-column label="电话" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
    
        <el-table-column label="人脸信息" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.faceData }}</span>
          </template>
        </el-table-column>
    
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="editUser(scope.$index, scope.row)">编辑用户信息</el-button>
            <el-dialog :visible.sync="userDialogVisible" title="编辑用户信息" @close="handleClose">
          <el-form :model="editForm" label-width="80px">
            <el-form-item label="工号ID">
              <el-input v-model="editForm.userId"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="editForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="人脸信息">
              <el-input v-model="editForm.faceData"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </span>
        </el-dialog>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
          </template>
        </el-table-column>
    
       
      </el-table>
    </template>
    
    <script>
    import { MessageBox } from 'element-ui';
    
    export default {
      name: 'TableUser',
      props: {
        tableData: {
          type: Array,
          required: true
        }
      },
      data() {
        return {
          userDialogVisible: false,
          editForm: {
            userId: '',
            email: '',
            phone: '',
            faceData: ''
          },
          editIndex: -1,
          tableData: [
        // 初始数据
        { userId: '1', email: 'user1@example.com', phone: '1234567890', faceData: '' },
        { userId: '2', email: 'user2@example.com', phone: '0987654321', faceData: '' },
        { userId: '3', email: 'user3@example.com', phone: '1122334455', faceData: '' }
      ]
        };
      },
    
      methods: {
        editUser(index, row) {
      
          this.editIndex = index;
          this.editForm.userId = row.userId;
          this.editForm.email = row.email;
          this.editForm.phone = row.phone;
          this.editForm.faceData = row.faceData;
          this.userDialogVisible = true;
        },
        handleSave() {
         this.tableData[this.editIndex].userId = this.editForm.userId;
         this.tableData[this.editIndex].email = this.editForm.email;
         this.tableData[this.editIndex].phone = this.editForm.phone;
         this.tableData[this.editIndex].faceData = this.editForm.faceData;

            this.editIndex = -1;  
            this.userDialogVisible = false;
            this.$message({ type: 'success', message: '编辑成功!' });
          }
        },

        handleClose() {
          this.userDialogVisible = false;
        },
        handleDelete(index, row) {
          MessageBox.confirm('确认删除此用户吗?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('delete:user', index); // Emit delete event to parent
            this.$message({ type: 'success', message: '删除成功!' });
          }).catch(() => {
            this.$message({ type: 'info', message: '已取消删除' });
          });
        }
      };
    </script>
    
    <style>
    .dialog-footer {
      text-align: right;
    }
    </style>