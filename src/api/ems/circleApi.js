import axios from 'axios'

const MODULE = '/V1.0/company/mini'
const removeEmpty = true

export default {
  /**
   * 朋友圈条件查询列表
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#/StoreManageController
   * @param {*} data
   */
  list(data) {
    return axios({
      url: `${MODULE}/circle/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /*
   * 朋友圈详情
   */
  get(id) {
    return axios({
      url: `${MODULE}/circle/${id}`,
      method: 'GET',
      removeEmpty
    })
  },
  commentList(data) {
    return axios({
      url: `${MODULE}/circle/comment`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  delCircle(id) {
    return axios({
      url: `${MODULE}/circle/${id}`,
      method: 'DELETE',
      // data,
      removeEmpty,
      responseType: 'json'
    })
  },
  delComment(id) {
    return axios({
      url: `${MODULE}/Comment/${id}`,
      method: 'DELETE',
      // data,
      removeEmpty,
      responseType: 'json'
    })
  },
  addCircle(data) {
    return axios({
      url: `${MODULE}/circle`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  }
}
