<template>
  <el-carousel :height="bannerHeight" >
    <el-carousel-item v-for="(image, index) in images" :key="index">
      <img :src="image" alt="Image" class="carousel-image" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      bannerHeight: '100px', // 设置默认高度
      images: [
        require('@/assets/status.png'),
        require('@/assets/book.png'),
        require('@/assets/statistic.png'),
        require('@/assets/control.png')
      ]
    };
  },
  mounted() {
    this.setSize(); // 设置初始大小
    window.addEventListener('resize', this.setSize); // 监听窗口大小变化
  },
  methods: {
    setSize() {
      // 根据需要设置高度，这里是将高度设为宽度的四分之一
      this.bannerHeight = window.innerWidth / 4 + 'px';
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setSize); // 清除事件监听
  }
}
</script>

<style>
.el-carousel {
  width: 100%; /* 确保走马灯宽度为100% */
}

.carousel-image {
  width: 100%; /* 图片宽度为100% */
  height: auto; /* 高度自适应 */
  display: block; /* 使图片为块级元素，防止底部出现空白 */
}
</style>
