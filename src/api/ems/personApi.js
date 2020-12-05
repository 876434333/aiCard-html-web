import axios from 'axios'

const MODULE = '/V1.0/company'
const removeEmpty = true

export default {
  /**
   * 部门树
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/DepartmentPageUsingPOST_3
   * @param {*} data
   */
  tree() {
    return axios({
      url: `${MODULE}/person/department/tree`,
      method: 'POST',
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 查询员工
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#!/personManageController/getStaffUsingGET_1
   * @param {*} data
   */
  get(id) {
    return axios({
      url: `${MODULE}/person/staff/${id}`,
      method: 'GET',
      removeEmpty,
      responseType: 'json'
    })
  }
}
