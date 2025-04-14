<template>
  <div class="Stauts">
    <Status_table/>
  </div>
</template>

<script>
import Status_table from '../components/Status_table.vue';

export default {
  name: 'StatusTablePage',
  components: {
    Status_table
  }
}
</script>

<style>
.Stauts {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  padding: 20px;
}

.grid-content {
  font-size: 15px; /* 设置字体大小为 15px */
  margin: 10px; /* 设置外边距，增加间隔 */
  padding: 10px; /* 设置内边距，增加内容的舒适度 */
  border-radius: 4px; /* 圆角边框 */
}

body > .home {
  margin-bottom: 40px;
}
</style>
