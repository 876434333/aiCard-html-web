// AgentCustomerController : 超级后台--代理商管理
import axios from 'axios'
const MODULE = '/V1.0/super/agent'

export default {
  /**
   *
   * 企业列表
   * @param {*} data
        name_or_phone
        page_num
        page_size
        parent_id
   */
  getEnterpriseList (data) {
    return axios({
      url: `${MODULE}/enterprise/list`,
      data,
      method: 'POST'
    })
  },
  /**
   * 企业信息
   * @param {*} id
   */
  getEnterpriseDetail (id) {
    return axios({
      url: `${MODULE}/enterprise/${id}`
    })
  },
  /**
   *代理商列表
   * @param {*} data
        "begin_time": "2018-06-19T01:10:24.897Z",
        "city_code": "string",
        "end_time": "2018-06-19T01:10:24.897Z",
        "name_or_phone": "string",
        "page_num": 0,
        "page_size": 0,
        "province_code": "string"
   */
  getAgentList (data) {
    return axios({
      url: `${MODULE}/list`,
      data,
      method: 'POST'
    })
  },
  /**
   * 代理商信息
   * @param {*} id
   */
  getAgentDetail (id) {
    return axios({
      url: `${MODULE}/${id}`
    })
  }

}
