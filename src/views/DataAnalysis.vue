<template>
  <div class="data-analysis">
    <!-- 会议室预订数据 -->
    <el-card class="section-card">
      <div slot="header">
        <span class="section-title">会议室预订数据</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="chart-wrapper">
            <div class="chart-header">
              <span>预订频率趋势</span>
              <el-radio-group v-model="bookingTimeRange" size="small">
                <el-radio-button label="day">日</el-radio-button>
                <el-radio-button label="week">周</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
              </el-radio-group>
            </div>
            <div class="chart-container" ref="bookingTrendChart"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="chart-wrapper">
            <div class="chart-header">
              <span>预订时长分布</span>
            </div>
            <div class="chart-container" ref="durationChart"></div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="chart-wrapper">
            <div class="chart-header">
              <span>会议室预订占比</span>
            </div>
            <div class="chart-container" ref="roomPieChart"></div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 设备使用数据 -->
    <el-card class="section-card">
      <div slot="header">
        <span class="section-title">设备使用数据</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="chart-wrapper">
            <div class="chart-header">
              <span>设备使用时长统计</span>
            </div>
            <div class="chart-container" ref="deviceUsageChart"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="chart-wrapper">
            <div class="chart-header">
              <span>设备故障分布</span>
            </div>
            <div class="chart-container" ref="deviceFaultChart"></div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 环境数据 -->
    <el-card class="section-card">
      <div slot="header">
        <span class="section-title">环境监测数据</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="chart-wrapper">
            <div class="chart-header">
              <span>温湿度变化趋势</span>
            </div>
            <div class="chart-container" ref="envTrendChart"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="chart-wrapper">
            <div class="chart-header">
              <span>空气质量监测</span>
            </div>
            <div class="gauge-container">
              <div class="gauge-item">
                <div class="gauge-label">空气质量指数(AQI)</div>
                <el-progress type="dashboard" :percentage="airQuality" :color="airQualityColor"></el-progress>
                <div class="gauge-value">{{ airQuality }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 综合数据 -->
    <el-card class="section-card">
      <div slot="header">
        <span class="section-title">综合统计数据</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="chart-wrapper">
            <div class="chart-header">
              <span>会议室使用效率</span>
            </div>
            <div class="gauge-container">
              <div class="gauge-item">
                <div class="gauge-label">使用率</div>
                <el-progress type="dashboard" :percentage="usageRate" :color="usageRateColor"></el-progress>
                <div class="gauge-value">{{ usageRate }}%</div>
              </div>
              <div class="gauge-item">
                <div class="gauge-label">闲置率</div>
                <el-progress type="dashboard" :percentage="100 - usageRate" color="#909399"></el-progress>
                <div class="gauge-value">{{ 100 - usageRate }}%</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="table-wrapper">
            <div class="table-header">
              <span>资源浪费统计</span>
            </div>
            <el-table :data="wasteStats" style="width: 100%" border>
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="room" label="会议室"></el-table-column>
              <el-table-column prop="wasteType" label="浪费类型"></el-table-column>
              <el-table-column prop="duration" label="浪费时长"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'DataAnalysis',
  data() {
    return {
      bookingTimeRange: 'day',
      airQuality: 75,
      usageRate: 75,
      wasteStats: [
        {
          date: '2024-03-20',
          room: '大会议室',
          wasteType: '预订未使用',
          duration: '2小时'
        },
        {
          date: '2024-03-19',
          room: '小会议室B',
          wasteType: '提前结束',
          duration: '1小时'
        },
        {
          date: '2024-03-18',
          room: '培训室',
          wasteType: '迟到',
          duration: '30分钟'
        }
      ],
      charts: {}
    }
  },
  computed: {
    airQualityColor() {
      if (this.airQuality >= 80) return '#67C23A'
      if (this.airQuality >= 60) return '#E6A23C'
      return '#F56C6C'
    },
    usageRateColor() {
      if (this.usageRate >= 80) return '#67C23A'
      if (this.usageRate >= 60) return '#E6A23C'
      return '#F56C6C'
    }
  },
  mounted() {
    this.initCharts()
    window.addEventListener('resize', this.resizeCharts)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCharts)
    Object.values(this.charts).forEach(chart => {
      chart.dispose()
    })
  },
  methods: {
    initCharts() {
      this.initBookingTrendChart()
      this.initDurationChart()
      this.initRoomPieChart()
      this.initDeviceUsageChart()
      this.initDeviceFaultChart()
      this.initEnvTrendChart()
    },
    initBookingTrendChart() {
      const chart = echarts.init(this.$refs.bookingTrendChart)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['预订次数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '预订次数',
          type: 'line',
          smooth: true,
          data: [5, 8, 12, 6, 8, 10, 15, 8, 4],
          areaStyle: {
            opacity: 0.1
          },
          lineStyle: {
            width: 3
          },
          itemStyle: {
            color: '#409EFF'
          }
        }]
      }
      chart.setOption(option)
      this.charts.bookingTrend = chart
    },
    initDurationChart() {
      const chart = echarts.init(this.$refs.durationChart)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['0-1小时', '1-2小时', '2-3小时', '3-4小时', '4小时以上']
        },
        yAxis: {
          type: 'value',
          name: '预订数量'
        },
        series: [{
          type: 'bar',
          data: [10, 25, 15, 8, 5],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          }
        }]
      }
      chart.setOption(option)
      this.charts.duration = chart
    },
    initRoomPieChart() {
      const chart = echarts.init(this.$refs.roomPieChart)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 'bottom'
        },
        series: [{
          name: '会议室预订',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 35, name: '大会议室' },
            { value: 25, name: '小会议室A' },
            { value: 20, name: '小会议室B' },
            { value: 15, name: '培训室' },
            { value: 5, name: '洽谈室' }
          ]
        }]
      }
      chart.setOption(option)
      this.charts.roomPie = chart
    },
    initUserGrowthChart() {
      const chart = echarts.init(this.$refs.userGrowthChart)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
          type: 'value',
          name: '新增用户数'
        },
        series: [{
          type: 'line',
          smooth: true,
          data: [30, 40, 35, 50, 45, 65],
          symbolSize: 8,
          itemStyle: {
            color: '#67C23A'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(103,194,58,0.3)' },
              { offset: 1, color: 'rgba(103,194,58,0.1)' }
            ])
          }
        }]
      }
      chart.setOption(option)
      this.charts.userGrowth = chart
    },
    initDeviceUsageChart() {
      const chart = echarts.init(this.$refs.deviceUsageChart)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['使用时长（小时）']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: '使用时长（小时）'
        },
        yAxis: {
          type: 'category',
          data: ['投影仪', '音响', '空调', '照明', '电子白板']
        },
        series: [{
          name: '使用时长（小时）',
          type: 'bar',
          data: [120, 80, 150, 200, 70],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          }
        }]
      }
      chart.setOption(option)
      this.charts.deviceUsage = chart
    },
    initDeviceFaultChart() {
      const chart = echarts.init(this.$refs.deviceFaultChart)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center'
        },
        series: [{
          name: '故障分布',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 8, name: '投影仪' },
            { value: 5, name: '音响' },
            { value: 3, name: '空调' },
            { value: 2, name: '照明' },
            { value: 4, name: '电子白板' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      chart.setOption(option)
      this.charts.deviceFault = chart
    },
    initEnvTrendChart() {
      const chart = echarts.init(this.$refs.envTrendChart)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['温度', '湿度']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
        },
        yAxis: [
          {
            type: 'value',
            name: '温度(°C)',
            min: 16,
            max: 30,
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FF4500'
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          {
            type: 'value',
            name: '湿度(%)',
            min: 0,
            max: 100,
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#4169E1'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '温度',
            type: 'line',
            smooth: true,
            data: [22, 23, 24, 25, 26, 25, 24, 23, 22, 21],
            itemStyle: {
              color: '#FF4500'
            }
          },
          {
            name: '湿度',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: [55, 58, 60, 65, 63, 60, 58, 55, 53, 50],
            itemStyle: {
              color: '#4169E1'
            }
          }
        ]
      }
      chart.setOption(option)
      this.charts.envTrend = chart
    },
    resizeCharts() {
      Object.values(this.charts).forEach(chart => {
        chart.resize()
      })
    },
    handleTimeRangeChange() {
      this.initBookingTrendChart()
    },
    updateEnvData() {
      setInterval(() => {
        this.airQuality = Math.floor(Math.random() * (100 - 60) + 60)
        this.temperature = Math.floor(Math.random() * (30 - 20) + 20)
        this.humidity = Math.floor(Math.random() * (80 - 40) + 40)
      }, 5000)
    }
  }
}
</script>

<style scoped>
.data-analysis {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 60px);
}

.overview-cards {
  margin-bottom: 20px;
}

.overview-card {
  height: 160px;
  background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
  color: white;
}

.section-card {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.chart-wrapper {
  margin-bottom: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 15px;
}

.chart-container {
  height: 300px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.table-header {
  margin-bottom: 15px;
  padding: 0 15px;
  font-weight: bold;
}

.gauge-container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.gauge-item {
  text-align: center;
}

.gauge-label {
  margin-bottom: 10px;
  font-size: 16px;
  color: #606266;
}

.gauge-value {
  margin-top: 10px;
  font-size: 20px;
  color: #303133;
}

/* 其他样式保持不变... */
</style>