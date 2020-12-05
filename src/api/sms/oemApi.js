// oemCustomerController : 超级后台--贴牌商管理
import axios from 'axios'
const MODULE = '/V1.0/super/oem'

export default {
  /**
   * 新增贴牌商
   * @param {*} data
      "acount": "string",
      "address": "string",
      "area_code": "string",
      "city_code": "string",
      "head_icon": "string",
      "money_init": 0,
      "name": "string",
      "password": "string",
      "phone": "string",
      "province_code": "string",
      "remark": "string"
   */
  addOem(data) {
    return axios({
      url: `${MODULE}`,
      data,
      method: 'POST'
    })
  },
  /**
   * 编辑贴牌商
   * @param {*} data
      "address": "string",
      "area_code": "string",
      "city_code": "string",
      "head_icon": "string",
      "id": "string",
      "login": "string",
      "login_old": "string",
      "money_init": 0,
      "name": "string",
      "phone": "string",
      "province_code": "string",
      "remark": "string"
   */
  updateOem(data) {
    return axios({
      url: `${MODULE}`,
      data,
      method: 'PUT'
    })
  },
  /**
   * 下级代理商列表
   * @param {*} data
      "name_or_phone": "string",
      "page_num": 0,
      "page_size": 0,
      "parent_id": "string"
   */
  getSubAgentList(data) {
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
  getSubAgentDetail(id) {
    return axios({
      url: `${MODULE}/agent/${id}`
    })
  },
  /**
   * 下级地区总代列表
   * @param {*} data
      "name_or_phone": "string",
      "page_num": 0,
      "page_size": 0,
      "parent_id": "string"
   */
  getSubAreaAgentList(data) {
    return axios({
      url: `${MODULE}/area/list`,
      data,
      method: 'POST'
    })
  },
  /**
   * 下级地区总代信息
   * @param {*} id
   */
  getSubAreaAgentDetail(id) {
    return axios({
      url: `${MODULE}/area/${id}`
    })
  },
  /**
   * 贴牌商列表
   * @param {*} data
      "begin_time": "2018-06-19T01:10:25.041Z",
      "city_code": "string",
      "end_time": "2018-06-19T01:10:25.041Z",
      "name_or_phone": "string",
      "page_num": 0,
      "page_size": 0,
      "province_code": "string"
   */
  getOemList(data) {
    return axios({
      url: `${MODULE}/list`,
      data,
      method: 'POST'
    })
  },
  /**
   * 贴牌商信息
   * @param {*} id
   */
  getOemDetail (id) {
    return axios({
      url: `${MODULE}/${id}`
    })
  }
}
