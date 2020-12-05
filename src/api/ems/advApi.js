import axios from 'axios'

const MODULE = '/V1.0/company/adv'
const removeEmpty = true

export default {
  /**
   * 广告条件查询列表
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/AdvertController/findProductBySelectUsingPOST_3
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
   * 广告修改
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/AdvertController/updateProductUsingPUT_2
   * @param {*} data
   */
  updateAdv(data) {
    return axios({
      url: `${MODULE}`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 广告详情
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/AdvertController/updateProductUsingPUT_2
   * @param {*} data
   */
  getAdvDetail(id) {
    return axios({
      url: `${MODULE}/${id}`
    })
  },
  /**
   *添加广告
   * @param {*} data
   "title": "string",
   "imgUrl": "string",
   "href": "string",
   "aOrder": "string"
   */
  addAdv(data) {
    return axios({
      url: `${MODULE}`,
      data,
      method: 'POST'
    })
  },
  /**
   * 广告删除
   * http://localhost:9001/push/swagger-ui.html#!/AdvertController/deleteByIdUsingDELETE
   * @param {*} data
   */
  deleteAdv(id) {
    return axios({
      url: `${MODULE}/${id}`,
      method: 'DELETE'
    })
  },
  /**
   * 广告修改
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/AdvertController/updateProductUsingPUT_2
   * @param {*} data
   */
  upToOne(id) {
    return axios({
      url: `${MODULE}/${id}`,
      method: 'POST',
      removeEmpty,
      responseType: 'json'
    })
  }
}
