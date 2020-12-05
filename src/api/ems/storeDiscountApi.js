import axios from 'axios'
const MODULE = '/V1.0/company'
const removeEmpty = true
export default {
  list(data) {
    return axios({
      url: `${MODULE}/discount/list`,
      method: 'POST',
      data,
      removeEmpty,
      responseType: 'json'
    })
  },
  /**
   * 修改企业基本特权
   * @param {*} id
   * @param {*}
   */
  updateDiscount(id) {
    console.log(id)
    return axios({
      url: `${MODULE}/discount/enterprise?count=${id}`,
      method: 'put'
    })
  },
  discountStaff(data) {
    return axios({
      url: `${MODULE}/discount/staff`,
      method: 'PUT',
      data,
      removeEmpty,
      responseType: 'json'
    })
  }
}
