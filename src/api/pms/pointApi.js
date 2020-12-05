import axios from 'axios'

const MODULE = '/V1.0/agent/point'
const removeEmpty = true

export default {
  /**
   * 条件查询列表
   * http://120.77.82.251:9001/push/swagger-ui.html#!/KjPointLogController/piontPageUsingPOST
   * @param {*} data
   */
  list(data) {
    return axios({
      url: `${MODULE}/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  listSub(data) {
    return axios({
      url: `${MODULE}/sub/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 查询迹点详情
   */
  getpointDetail() {
    return axios({
      url: `${MODULE}/detail`,
      method: 'GET',
      responseType: 'json'
    })
  }
}
