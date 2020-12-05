// enterCustomerController : 企业相关接口 http://120.77.82.251:9001/push/swagger-ui.html#!/TemplateController/updateTempUsingPUT
import axios from 'axios'

const MODULE = '/V1.0/super'

export default {
  /**
   * 获取模板列表
   */
  list(params) {
    return axios({
      url: `${MODULE}/template/list`,
      method: 'POST',
      data: params
    })
  },
  /**
   * 获取模板详情
   *
   * @id: string, 模板id
   */
  get(id) {
    return axios({
      url: `${MODULE}/template/${id}`,
      method: 'GET'
    })
  },
  /**
   * 编辑模版信息
   *
   * @param {*} params
   *         card_cost: integer, 名片费用
   *         id: integer, 模板id
   *         small_cost: integer, 小程序费用
   *         template_name: integer, 模板名称
   */
  updateTemplate(params) {
    return axios({
      url: `${MODULE}/template`,
      method: 'PUT',
      data: params
    })
  }
}
