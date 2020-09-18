import Mock from 'mockjs'
import homeApi from './home'

// 设置200-2000毫秒的数据请求延迟
Mock.setup({
  timeout: '200-2000'
})

// 首页相关
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)
