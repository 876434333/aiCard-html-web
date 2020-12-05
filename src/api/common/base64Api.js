import axios from 'axios'

const MODULE = '/v1.0/file/'

export default {
  /**
   * base64图片上传
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/FileController/uploadUsingPOST
   * @param {*} phone
   */
  uploadImageBase64(data) {
    return axios({
      url: `${MODULE}/base64`,
      method: 'POST',
      data
      // responseType: 'json'
    })
  }
}
