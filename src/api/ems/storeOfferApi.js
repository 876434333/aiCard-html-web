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
      url: `${MODULE}/offer/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 批量下架商品
   * @param {*} data
   */
  UnderCarriage (data) {
    return axios({
      url: `${MODULE}/offer/down`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 批量上架商品
   * @param {*} data
   */
  HandlerGrounding (data) {
    return axios({
      url: `${MODULE}/offer/up`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 商品详情
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/StoreManageController/offerDetailUsingGET
   * @param {*} data
   */
  getStoreDetail(id) {
    return axios({
      url: `${MODULE}/offer/${id}`
    })
  },
  /**
   * 修改商品
   * @param {*} data
   */
  updateStore (data) {
    return axios({
      url: `${MODULE}/offer`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 添加商品
   * @param {*} data
   */
  addStore (data) {
    return axios({
      url: `${MODULE}/offer`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 商品删除
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/StoreManageController/offerDelUsingDELETE
   * @param {*} data
   */
  deleteStore(id) {
    return axios({
      url: `${MODULE}/offer/${id}`,
      method: 'DELETE'
    })
  }
}
