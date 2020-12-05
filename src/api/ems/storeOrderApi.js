import axios from 'axios'

const MODULE = '/V1.0/company/store'
const removeEmpty = true

export default {
  /**
   * 商品条件查询列表
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#/StoreManageController
   * @param {*} data
   */
  list(data) {
    return axios({
      url: `${MODULE}/order/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 订单发货
   * @param {*} id
   */
  updateStatus (id) {
    return axios({
      url: `${MODULE}/update_status/${id}`,
      method: 'PUT'
    })
  }
}
