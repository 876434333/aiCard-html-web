// 使用通用文档接口
// AdminController : 超级后台--员工管理
import axios from 'axios'
const MODULE = 'V1.0/common/admin'

export default {
  /**
   *添加员工
   * @param {*} data
      "login": "string",
      "name": "string",
      "pass_word": "string",
      "remark": "string"
   */
  addStaff(data) {
    return axios({
      url: `${MODULE}`,
      data,
      method: 'POST'
    })
  },
  /**
   * 修改员工信息
   * @param {*} data
      "id": "string",
      "login": "string",
      "name": "string",
      "remark": "string"
   */
  updateStaff(data) {
    return axios({
      url: `${MODULE}`,
      data,
      method: 'PUT'
    })
  },
  /**
   * 分配权限
   * @param {*} data
      "admin_id": "string",
      "menu_id": "string"
   */
  addGrant(data) {
    return axios({
      url: `${MODULE}/grant`,
      data,
      method: 'POST'
    })
  },
  // 获取用户权限
  getStaffGrant(id) {
    return axios({
      url: `${MODULE}/grant/${id}`
    })
  },

  // 修改用户权限
  updateStaffGrant (id, data) {
    return axios({
      url: `${MODULE}/grant/${id}`,
      method: 'PUT',
      data
    })
  },
  /**
   * 员工列表
   * @param {*} data
      "admin_id": "string",
      "menu_id": "string"
   */
  getStaffList(data) {
    return axios({
      url: `${MODULE}/list`,
      data,
      method: 'POST'
    })
  },
  /**
   * 删除员工
   * @param {*} id
   */
  deleteStaff(id) {
    return axios({
      url: `${MODULE}/${id}`,
      method: 'DELETE'
    })
  },
  /**
   *  员工详情
   * @param {*} id
   */
  getStaffDetail(id) {
    return axios({
      url: `${MODULE}/${id}`
    })
  },
  /**
   * 修改状态
   * @param {*} id
   * @param {*} status
   */
  updateStaffStatus(id, status) {
    return axios({
      url: `${MODULE}/${id}/status/${status}`,
      method: 'POST'
    })
  }

}
