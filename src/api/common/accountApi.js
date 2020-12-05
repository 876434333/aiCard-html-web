import axios from 'axios'

const MODULE = '/V1.0/common/account'

export default {
  /**
   * 登录
   * http://120.77.82.251:9001/push/swagger-ui.html#!/SuperLoginController/loginUsingPOST_1
   * @param {*} data
   */
  login(data) {
    return axios({
      url: `${MODULE}/login`,
      method: 'POST',
      data
    })
  },
  /**
   * 登出
   */
  logout() {
    return axios({
      url: `${MODULE}/logout`,
      method: 'POST'
    })
  },
  /**
   * 获取用户信息
   * http://120.77.82.251:9001/push/swagger-ui.html#!/SuperLoginController/loginUsingGET
   */
  getAdminInfo() {
    return axios({
      url: `${MODULE}/user`,
      method: 'GET',
      responseType: 'json'
    })
  },
  /**
   * 找回密码
   * http://120.77.82.251:9001/push/swagger-ui.html#!/SuperLoginController/updatePwdUsingPUT
   * @param {*} data
   */
  findPWD(data) {
    return axios({
      url: `${MODULE}/pwd/find`,
      method: 'PUT',
      data
    })
  },
  /**
   * 修改密码
   * http://120.77.82.251:9001/push/swagger-ui.html#!/SuperLoginController/modifyPwdUsingPUT
   * @param {*} data
   * @returns
   */
  modifyPWD(data) {
    return axios({
      url: `${MODULE}/pwd`,
      method: 'PUT',
      data
    })
  }
}
