<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      
      <el-table-column
        label="会议室名称"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.roomName }}</span>
        </template>
      </el-table-column>
      
      <el-table-column
        label="地点"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      
      <el-table-column
        label="容量"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.capacity }}</span>
        </template>
      </el-table-column>
  
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑信息</el-button>

            <el-dialog
    :visible.sync="dialogVisible"
    title="编辑会议室信息"
    @close="handleClose">
    <el-form :model="editForm" label-width="80px">
      <el-form-item label="会议室名称">
        <el-input v-model="editForm.roomName"></el-input>
      </el-form-item>
      <el-form-item label="地点">
        <el-input v-model="editForm.location"></el-input>
      </el-form-item>
      <el-form-item label="容量">
        <el-input v-model="editForm.capacity"></el-input>
          </el-form-item>
          </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </span>
  </el-dialog>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除会议室</el-button>
        </template>
      </el-table-column>
  
    </el-table>
  </template>
    
  <script>
  import { MessageBox } from 'element-ui';
  
  export default {
    name: 'Table_2',
    props: {
      // 接收父组件传递的data数据
      tableData: {
        type: Array,
        required: true
        }
        },
    data() {
      return {
        dialogVisible: false,
        editForm: {
          roomName: '',
          location: '',
          capacity: ''
        },
        editIndex: -1 // 用于保存编辑的索引
      }
    },
    methods: {
      handleEdit(index, row) {
      this.editIndex = index;
      this.editForm.roomName = row.roomName;
      this.editForm.location = row.location;
      this.editForm.capacity = row.capacity;
      this.dialogVisible = true;
    },
    handleSave() {
      // 创建编辑后的数据对象
      const updatedRow = {
        roomName: this.editForm.roomName,
        location: this.editForm.location,
        capacity: this.editForm.capacity
      };
      
      // 通过事件通知父组件更新数据
      this.$emit('update-table', { index: this.editIndex, data: updatedRow });

      this.dialogVisible = false;
      this.$message({
        type: 'success',
        message: '编辑成功!'
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
      handleDelete(index, row) {
        MessageBox.confirm('确认删除此会议室吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 通过事件通知父组件删除数据
          this.$emit('delete-table', index);
          
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
  </script>
  
  