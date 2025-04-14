<template>
   <div class="smalltitle">
    <el-dropdown>
  <el-button type="primary">
    会议室选择<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>会议室一</el-dropdown-item>
    <el-dropdown-item>会议室二</el-dropdown-item>
    <el-dropdown-item>会议室三</el-dropdown-item>
    <el-dropdown-item>会议室四</el-dropdown-item>
    <el-dropdown-item>会议室五</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

   </div>
</template>
<style>
.smalltitle {
    display: flex;
    justify-content: space-between;
  }
  .dropdown-wrapper {
    flex: 1;
  }
 
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
  export default {
    methods: {
      handleClick() {
        alert('button click');
      }
    }
  }
</script>