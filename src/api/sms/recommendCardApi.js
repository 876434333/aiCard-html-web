// oemCustomerController : 超级后台--贴牌商管理
import axios from 'axios'
const MODULE = '/V1.0/super/recommend'

export default {
  // 获取推荐名片列表
  getRecommendCardList(data) {
    return axios({
      url: `${MODULE}/getRecommendCardList`,
      data: data,
      method: 'GET'
    })
  },
  // 获取需要推荐的名片(也可以查询)
  getStaff(data) {
    return axios({
      url: `${MODULE}/getStaff`,
      data: data,
      method: 'POST'
    })
  },
  // 新增推荐的名片
  addRecommendCard(data) {
    return axios({
      url: `${MODULE}/addRecommendCard`,
      data: data,
      method: 'POST'
    })
  },
  // 删除推荐的名片
  deleteRecommendCard(recommendId, data) {
    return axios({
      url: `${MODULE}/deleteRecommendCard/${recommendId}`,
      data: data,
      method: 'GET'
    })
  }
}
