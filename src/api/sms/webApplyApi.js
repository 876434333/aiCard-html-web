import axios from 'axios'

const MODULE = '/v3.0/web_apply'
const removeEmpty = true

export default {
  /**
   * 条件查询列表
   * http://120.77.82.251:9001/push/swagger-ui.html#!/KjPointLogController/piontPageUsingPOST_3
   * @param {*} data
   */
  list(data) {
    return axios({
      url: `${MODULE}/page`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  }
}
