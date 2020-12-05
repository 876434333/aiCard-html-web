import axios from 'axios'

const MODULE = '/v1.0'

export default {
  /**
   * 一张图片上传
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/FileController/uploadUsingPOST
   * @param {*} phone
   */
  uploadImage(data) {
    return axios({
      url: `${MODULE}/upload`,
      method: 'POST',
      data,
      responseType: 'json'
    })
  }
}
