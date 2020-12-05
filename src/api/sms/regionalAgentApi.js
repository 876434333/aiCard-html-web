// AreaCustomerController : 超级后台--地区总代理管理
import axios from 'axios'
const MODULE = '/V1.0/super/area'

export default {
  /**
   *
   * 地区总代列表
   * @param {*} data
   */
  getAgentList (data) {
    return axios({
      url: `${MODULE}/list`,
      data,
      method: 'POST'
    })
  },
  /**
   * 地区总代信息
   * @param {*} id
   */
  getAgentDetail (id) {
    return axios({
      url: `${MODULE}/${id}`
    })
  },
  /**
   * 下级代理商列表
   * @param {*} data
   */
  getSubAgentList (data) {
    return axios({
      url: `${MODULE}/agent/list`,
      data,
      method: 'POST'
    })
  },
  /**
   * 下级代理商信息
   * @param {*} id
   */
  getSubAgentDetail (id) {
    return axios({
      url: `${MODULE}/agent/${id}`
    })
  }

}
