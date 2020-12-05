import axios from 'axios'

const MODULE = 'V1.0/company/person'
const removeEmpty = true

export default {
  /**
   * 获取所有的员工
   * @param {*} data
   */
  list(data) {
    return axios({
      url: `${MODULE}/staff/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 工作交接
   * @param {*} data
   */
  handover(data) {
    return axios({
      url: `${MODULE}/handover`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /*
   * 客户数
   * @param {*} data
   */
  customCount(data) {
    return axios({
      url: `${MODULE}/handover/custom_count`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  }
}
