import axios from 'axios'

const MODULE = '/v4.0/common/message'

export default {
  /**
   * 获取短信验证码
   * http://120.77.82.251:9001/push/swagger-ui.html#!/MessageController/sendUsingGET
   * @param {*} phone
   */
  sendCode(phone) {
    return axios({
      url: `${MODULE}/${phone}`,
      method: 'GET',
      responseType: 'json'
    })
  }
}
