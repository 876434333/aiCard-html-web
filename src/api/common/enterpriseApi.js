// EnterCustomerController : 超级后台--企业管理
import axios from 'axios'

const MODULE = '/V1.0/common/account'

export default {
  /**
   *
   * @param {*} data
      id (string, optional): id ,
      passwrod (string, optional): 重置密码
   */
  updatePassword (data) {
    return axios({
      url: `${MODULE}/password/reset`,
      method: 'PUT',
      data
    })
  },
  /**
   *
   * @param {*} data
      id (string, optional): id ,
      status (string, optional): 0 禁用，2 启用
   */
  updateStatus (data) {
    return axios({
      url: `${MODULE}/status`,
      method: 'PUT',
      data
    })
  },
  // 获取已有企业数据
  entList(phone, data) {
    return axios({
      url: `V1.0/company/index/chooseCompany/${phone}`,
      method: 'GET',
      data: data
    })
  },
  // 获取验证码
  getCode(phone, data) {
    return axios({
      url: `V1.0/company/index/getMsm/${phone}`,
      method: 'GET',
      data: data
    })
  },
  // 选择企业登录
  chooseLogin(enterpriseId, data) {
    return axios({
      url: `V1.0/common/account/chooseLogin/${enterpriseId}`,
      method: 'GET',
      data: data
    })
  }
}
