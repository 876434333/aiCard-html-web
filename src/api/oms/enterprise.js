//  enterCustomerController : 企业相关接口
import axios from 'axios'

const MODULE = '/V1.0/oem'

export default {
  /**
   * 获取企业列表口
   *
   * @param {*} params
   *         page_num: integer, 当前页
   *         page_size: integer, 分页数
   *         begin_time: integer, 开始时间
   *         end_time: integer, 结束时间
   *         name_or_phone: string, 电话或者名称
   */
  getEnterpriseList(params) {
    return axios({
      url: `${MODULE}/enterprise/list`,
      method: 'POST',
      data: params
    })
  },
  /**
   * 获取企业列表-详情接口
   *
   * @param {*} params
   *         id: string
   */
  getEnterpriseDetail(id) {
    return axios({
      url: `${MODULE}/enterprise/${id}`,
      method: 'GET'
    })
  }
}
