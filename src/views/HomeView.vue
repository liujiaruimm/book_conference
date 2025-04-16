<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero-section" :style="{ backgroundImage: `url(${require('@/assets/hero-bg.png')})` }">
      <div class="hero-content">
        <h1>智能会议室</h1>
        <p>让每一次会议都高效、舒适、无忧</p>
        <el-button type="primary" size="large" @click="$router.push('/booking')">立即预订</el-button>
      </div>
    </div>

    <!-- Core Advantages -->
    <div class="advantages-section">
      <h2>核心优势</h2>
      <div class="advantages-grid">
        <div class="advantage-card">
          <i class="el-icon-date"></i>
          <h3>一键预约，实时掌控</h3>
          <p>查看会议室空闲状态，在线秒速预约，冲突自动提醒</p>
        </div>
        <div class="advantage-card">
          <i class="el-icon-view"></i>
          <h3>身临其境，3D选房</h3>
          <p>360°预览会议室布局，直观选择最适合的会议空间</p>
        </div>
        <div class="advantage-card">
          <i class="el-icon-setting"></i>
          <h3>智能环境，舒适无忧</h3>
          <p>自动调节灯光、温度，告别手动操作，专注会议内容</p>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section">
      <h2>功能亮点</h2>
      <div class="features-list">
        <div class="feature-item">
          <div class="feature-image">
            <img :src="require('@/assets/feature-signin.png')" alt="智能签到">
          </div>
          <div class="feature-content">
            <h3>智能签到</h3>
            <p>刷脸秒进，无需繁琐登记，安全又便捷</p>
            <div class="feature-details">
              <p>• AI人脸识别，准确率达99.9%</p>
              <p>• 支持多人同时签到，效率提升300%</p>
              <p>• 自动记录签到数据，统计分析一目了然</p>
            </div>
          </div>
        </div>
        <div class="feature-item reverse">
          <div class="feature-image">
            <img :src="require('@/assets/feature-data.png')" alt="数据看板">
          </div>
          <div class="feature-content">
            <h3>数据看板</h3>
            <p>实时数据助力高效管理，资源利用率提升30%</p>
            <div class="feature-details">
              <p>• 会议室使用率实时监控</p>
              <p>• 智能预测热门时段，合理分配资源</p>
              <p>• 自动生成周报月报，管理决策更轻松</p>
            </div>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-image">
            <img :src="require('@/assets/feature-remote.png')" alt="远程控制">
          </div>
          <div class="feature-content">
            <h3>远程控制设备</h3>
            <p>远程控制会议室设备，方便高效快捷</p>
            <div class="feature-details">
              <p>• 一键控制灯光、空调、投影等设备</p>
              <p>• 支持设备状态实时监控和故障预警</p>
              <p>• 智能场景联动，会议开始自动调节环境</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scenarios Section -->
    <div class="scenarios-section">
      <h2>应用场景</h2>
      <div class="scenarios-grid">
        <div class="scenario-card">
          <div class="scenario-icon">🏢</div>
          <h3>企业办公</h3>
          <div class="scenario-content">
            <p>• 各部门快速预约会议室，避免时间冲突</p>
            <p>• 自动释放超时未使用的会议室，提高利用率</p>
          </div>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🎓</div>
          <h3>高效教研</h3>
          <div class="scenario-content">
            <p>• 教师预约多媒体教室进行公开课</p>
            <p>• 教务人员统一管理设备使用</p>
          </div>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🏘️</div>
          <h3>社区活动中心</h3>
          <div class="scenario-content">
            <p>• 居民线上预约活动室</p>
            <p>• 管理员审核活动资质</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero-section {
  height: 500px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 20px;
}

.hero-content h1 {
  font-size: 3.5em;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.8em;
  margin-bottom: 30px;
}

/* Core Advantages Section */
.advantages-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.advantage-card {
  background: white;
  padding: 40px 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-5px);
}

.advantage-card i {
  font-size: 48px;
  color: #2D5C9E;
  margin-bottom: 20px;
}

/* Features Section */
.features-section {
  padding: 60px 20px;
  background: white;
  position: relative;
}

.features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #2D5C9E, #4CAF50, #2D5C9E);
}

.features-list {
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  gap: 40px;
  background: #f8f9fa;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: #c7d9f1;
  border-radius: 3px;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-item.reverse {
  flex-direction: row-reverse;
}

.feature-item.reverse::before {
  left: auto;
  right: 0;
}

.feature-image {
  flex: 1;
  max-width: 450px;
  position: relative;
}

.feature-image::after {
  content: '';
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  background: url('@/assets/feature-data.png') no-repeat center;
  background-size: contain;
  opacity: 0.1;
}

.feature-image img {
  width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-image img:hover {
  transform: scale(1.02);
}

.feature-content {
  flex: 1;
  padding: 20px 30px;
}

.feature-content h3 {
  font-size: 28px;
  color: #2D5C9E;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  align-items: center;
}

.feature-content h3::before {
  content: '★';
  margin-right: 10px;
  color: #4CAF50;
  font-size: 20px;
}

.feature-content h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #2D5C9E, #4CAF50);
  border-radius: 2px;
}

.feature-content p {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 15px;
  padding-left: 25px;
  position: relative;
}

.feature-content p::before {
  content: '•';
  position: absolute;
  left: 10px;
  color: #2D5C9E;
}

.feature-content .feature-details {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px dashed #ddd;
  font-size: 14px;
  color: #888;
}

/* Scenarios Section */
.scenarios-section {
  padding: 40px 20px;
  background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.scenario-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;
  position: relative;
  overflow: hidden;
}

.scenario-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #2D5C9E, #4CAF50);
}

.scenario-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.scenario-icon {
  font-size: 2.5em;
  margin-bottom: 15px;
  display: inline-block;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 12px;
}

.scenario-card h3 {
  font-size: 20px;
  color: #2D5C9E;
  margin-bottom: 15px;
  position: relative;
}

.scenario-content {
  color: #666;
}

.scenario-content p {
  margin: 10px 0;
  padding-left: 20px;
  position: relative;
  line-height: 1.6;
}

.scenario-content p::before {
  content: '•';
  position: absolute;
  left: 5px;
  color: #4CAF50;
}

@media (max-width: 768px) {
  .scenarios-grid {
    grid-template-columns: 1fr;
    padding: 0 10px;
  }
  
  .scenario-card {
    padding: 25px;
  }
}
</style>
