<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="avatar" />
          <div class="userinfo">
            <p class="name">lt</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2020-9-16</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 522px; margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(value, key) in tableLabel"
            :key="key"
            show-overflow-tooltip
            :prop="key"
            :label="value"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="(item, index) in countData"
          :key="index"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="'el-icon-' + item.icon"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="count">{{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echart style="height: 280px" :chartData="echartData.order"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart style="height: 260px" :chartData="echartData.user"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart
            style="height: 260px"
            :chartData="echartData.video"
            :isAxisEchart="false"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from '../../components/Echarts'
export default {
  data() {
    return {
      avatar: require('@/assets/image/user.png'),
      countData: [
        {
          name: '今日支付订单',
          value: '234',
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: '134',
          icon: 'star-on',
          color: '#ff89b0'
        },
        {
          name: '今日未支付订单',
          value: '174',
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: '5284',
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: '1354',
          icon: 'star-on',
          color: '#ff89b0'
        },
        {
          name: '本月未支付订单',
          value: '1734',
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      echartData: {
        order: {
          xAxis: [],
          series: []
        },
        user: {
          xAxis: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    getTableData() {
      this.$http.get('/home/getData').then(res => {
        res = res.data
        this.tableData = res.data.tableData
        // 折线图
        const order = res.data.orderData
        this.echartData.order.xData = order.date
        // 取出sereis中的name部分——键名
        let keyArray = Object.keys(order.data[0])
        keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key === 'wechat' ? '小程序' : key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        // 用户柱状图
        const user = res.data.userData
        this.echartData.user.xData = user.map(item => item.date)
        this.echartData.user.series.push({
          name: '新增用户',
          data: user.map(item => item.new),
          type: 'bar'
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: user.map(item => item.active),
          type: 'bar'
        })
        // 饼图
        this.echartData.video.series.push({
          type: 'pie',
          data: res.data.videoData
        })
      })
    }
  },
  created() {
    this.getTableData()
  },
  components: {
    Echart
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/home.scss';
</style>
