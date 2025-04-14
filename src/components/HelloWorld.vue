<template>
  <div class="carousel-container">
    <span class="demonstration"></span>
    <el-carousel height="150px" trigger="hover">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Image" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'CarouselDemo',
  data() {
  return {
    images: [
      require('@/assets/control.png'),
      require('@/assets/book.png'),
      require('@/assets/statistic.png'),
      require('@/assets/status.png')
    ]
  };
}

}
</script>

<style scoped>
.carousel-container {
  text-align: center;
}

.demonstration {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

.carousel-image {
  width: 100%; /* 使图片自适应容器 */
  height: auto; /* 维持图片比例 */
}
</style>
