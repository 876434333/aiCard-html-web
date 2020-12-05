import axios from 'axios'

const MODULE = '/V1.0/company/enterprise'
const removeEmpty = true

export default {
  /**
   * 账号管理
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/AccountManageController/getEnterpriseByIdUsingGET_1
   * @param {*} data
   */
  detail() {
    return axios({
      url: `${MODULE}`,
      method: 'GET',
      removeEmpty,
      responseType: 'json'
    })
  }
}
