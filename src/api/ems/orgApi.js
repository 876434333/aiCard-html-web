import axios from 'axios'

const MODULE = '/V1.0/company'
const removeEmpty = true

export default {
  /**
   * 商品条件查询列表
   * http://keji-api-dev.h5h5h5.cn/push/swagger-ui.html#/StoreManageController
   * @param {*} data
   */
  list(data) {
    return axios({
      url: `${MODULE}/person/staff/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 部门树
   * @param data
   * @returns {AxiosPromise}
   */
  tree(data) {
    return axios({
      url: `${MODULE}/person/department/tree`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 获取员工信息
   * @param id
   * @returns {AxiosPromise}
   */
  staffInfo(id) {
    return axios({
      url: `${MODULE}/person/staff/${id}`,
      method: 'GET'
    })
  },

  /**
   * 获取部门名称
   * @param id
   * @returns {AxiosPromise}
   */
  deptName(id) {
    return axios({
      url: `${MODULE}/person/departname/${id}`,
      method: 'GET'
    })
  },
  /**
   * 修改员工信息
   * @param id
   * @returns {AxiosPromise}
   */
  updateStaffInfo(data) {
    return axios({
      url: `${MODULE}/person/staff`,
      method: 'PUT',
      data
    })
  },
  /**
   * 添加员工信息
   * @param id
   * @returns {AxiosPromise}
   */
  addStaffInfo(data) {
    return axios({
      url: `${MODULE}/person/staff`,
      method: 'POST',
      data
    })
  },

  /**
   * 删除员工
   * @param id
   * @returns {AxiosPromise}
   */
  delStaffInfo(data) {
    return axios({
      url: `${MODULE}/person/staff`,
      method: 'DELETE',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 增加部门
   * @param data
   * @returns {AxiosPromise}
   */
  addDept(data) {
    return axios({
      url: `${MODULE}/person/department`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 修改部门
   * @param data
   * @returns {AxiosPromise}
   */
  editDept(data) {
    return axios({
      url: `${MODULE}/person/department`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 删除部门
   * @param data
   * @returns {AxiosPromise}
   */
  delDept(id) {
    return axios({
      url: `${MODULE}/person/department/${id}`,
      method: 'DELETE'
    })
  }
}
