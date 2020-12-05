// enterCustomerController : 企业相关接口
import axios from 'axios'

const MODULE = '/V1.0/agent'

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
  },
  /**
   * 获取企业小程序资料
   *
   * @param {*} params
   *         id: string
   */
  getEnterpriseMp(id) {
    return axios({
      url: `${MODULE}/enterprise_all_id/${id}`,
      method: 'GET'
    })
  },
  /**
   * 修改企业使用状态
   *
   * @param {*} params
   *         status: integer, 状态
   *         id: string, ai雷达密钥
   */
  updateStatus(params) {
    return axios({
      url: `${MODULE}/update_status`,
      method: 'PUT',
      data: params
    })
  },
  /**
   * 修改企业部署状态
   *
   * @param {*} params
   *         is_deploy: integer, 状态
   *         enterprise_id: string, 企业id
   */
  updateDeploy(params) {
    return axios({
      url: `${MODULE}/update_deploy`,
      method: 'PUT',
      data: params
    })
  },
  /**
   * 增加名片
   *
   * @param {*} params
   *         car_num: integer, 数量
   *         id: string, 企业id
   */
  addCard(params) {
    return axios({
      url: `${MODULE}/add_card`,
      method: 'PUT',
      data: params
    })
  },
  /**
   * 重置密码
   *
   * @param {*} params
   *         passwrod: string, 密码
   *         id: string, 企业id
   */
  updatePassword(params) {
    return axios({
      url: `${MODULE}/update_password`,
      method: 'PUT',
      data: params
    })
  },
  /**
   * 获取模板列表
   *
   */
  getTemplateList(params) {
    return axios({
      url: `${MODULE}/template/list`,
      method: 'GET'
    })
  },
  /**
   * 新增企业
   *
   * @param {*} params
   *         acount: string, 账号
   *         address: string, 地址
   *         area_code: integer, 区
   *         city_code: integer, 市
   *         province_code: integer, 省
   *         head_icon: string, logo
   *         money_init: string, 名片
   *         name: string, 名称
   *         password: string, 密码
   *         phone: integer, 联系电话
   *         remark : string, 备注
   */
  newEnterprise(params) {
    return axios({
      url: `${MODULE}/enterprise`,
      method: 'POST',
      data: params
    })
  },
  /**
   * 更改企业详情
   *
   * @param {*} params
   *         acount: string, 账号
   *         address: string, 地址
   *         area_code: integer, 区
   *         city_code: integer, 市
   *         province_code: integer, 省
   *         head_icon: string, logo
   *         money_init: string, 名片
   *         name: string, 名称
   *         password: string, 密码
   *         phone: integer, 联系电话
   *         remark : string, 备注
   */
  updateEnterprise(params) {
    return axios({
      url: `${MODULE}/enterprise`,
      method: 'PUT',
      data: params
    })
  },
  /**
   * 更改小程序配置
   *
   * @param {*} params
   *         aiAgentId: string, 账号
   *         address: string, 地址
   *         area_code: integer, 区
   *         city_code: integer, 市
   *         province_code: integer, 省
   *         head_icon: string, logo
   *         money_init: string, 名片
   *         name: string, 名称
   *         password: string, 密码
   *         phone: integer, 联系电话
   *         remark : string, 备注
   */
  updateConfig(params) {
    return axios({
      url: `${MODULE}/update_all_id`,
      method: 'PUT',
      data: params
    })
  }
}
