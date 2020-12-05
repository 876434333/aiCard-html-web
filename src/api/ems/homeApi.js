import axios from 'axios'

const MODULE = '/V1.0/company/index'
const removeEmpty = true

export default {
  /**
   * 名片账号状态
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#/IndexController
   * @param {*} data
   */
  cardOrAccount(data) {
    return axios({
      url: `${MODULE}/main`,
      method: 'GET',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 查询总览数据
   * @param {*} data
   */
  viewAccount(data) {
    return axios({
      url: `${MODULE}/view`,
      method: 'GET',
      params: data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 查询用户新增情况
   * @param {*} data
   */
  userAccount(data) {
    return axios({
      url: `${MODULE}/kpi_view`,
      method: 'GET',
      params: data,
      removeEmpty,
      responseType: 'json'
    })
  }
}
