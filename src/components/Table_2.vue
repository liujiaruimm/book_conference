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
    dialogVisible: false,
    data() {
      return {
        tableData: [
          {
            roomName: '会议室一',
            location: '101',
            capacity: 20
          },
          {
            roomName: '会议室二',
            location: '102',
            capacity: 15
          },
          {
            roomName: '会议室三',
            location: '103',
            capacity: 30
          },
          {
            roomName: '会议室四',
            location: '104',
            capacity: 10
          }
        ],
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
      // 保存编辑后的数据
      this.tableData[this.editIndex].roomName = this.editForm.roomName;
      this.tableData[this.editIndex].location = this.editForm.location;
      this.tableData[this.editIndex].capacity = this.editForm.capacity;

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
          // 执行删除操作
          this.tableData.splice(index, 1); // 从表格中删除会议室
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
  
  