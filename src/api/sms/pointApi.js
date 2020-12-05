import axios from 'axios'

const MODULE = '/V1.0/super/point'
const removeEmpty = true

export default {
  /**
   * 条件查询列表
   * http://120.77.82.251:9001/push/swagger-ui.html#!/KjPointLogController/piontPageUsingPOST_3
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
  /**
   * 操作迹点（添加/扣减）
   * @param {*} data
      content (string, optional): 事项 ,
      custom_id (string, optional): 贴牌商id ,
      enterprise_id (string, optional),
      operation (string, optional): 操作（1 增加/2 扣减） ,
      operation_point (number, optional): 操作迹点数
   */
  operate(data) {
    return axios({
      url: `${MODULE}/operate`,
      method: 'POST',
      data,
      removeEmpty
    })
  }
}
