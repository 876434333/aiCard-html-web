// enterCustomerController : 企业相关接口
import axios from 'axios'

const MODULE = '/V1.0/super'

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
   *         id: integer, 企业id
   */
  getEnterpriseDetail(id) {
    return axios({
      url: `${MODULE}/enterprise/${id}`,
      method: 'GET'
    })
  },
  /**
   * 获取企业申请列表口
   *
   * @param {*} params
   *         page_num: integer, 当前页
   *         page_size: integer, 分页数
   *         begin_time: integer, 开始时间
   *         is_deploy : integer, 是否部署
   *         end_time: integer, 结束时间
   *         name_or_phone: string, 电话或者名称
   */
  getEnterpriseApplyList(params) {
    return axios({
      url: `${MODULE}/apply/list`,
      method: 'POST',
      data: params
    })
  },
  /**
   * 获取企业申请列表-详情接口
   *
   * @param {*} params
   *         id: integer, id
   */
  getEnterpriseApplyDetail(id) {
    return axios({
      url: `${MODULE}/apply/${id}`,
      method: 'GET'
    })
  },
  /**
   * 修改企业接口-部署按钮
   *
   * @param {*} params
   *         ai_agent_id: string, ai雷达应用id
   *         ai_secret : string, ai雷达密钥
   *         app_id: string, 小程序id
   *         boss_agent_id: string, boss雷达应用id
   *         boss_secret: string, 雷达密钥
   *         contacts_secret: string, 通讯录密钥
   *         corp_id: string, 公司的CropID
   *         id: string,  企业id
   *         mch_id: string, 用户商id
   *         pay_key: string, 支付密钥
   *         secret: string, 小程序密钥
   *         message_template,留言回复通知
   *         pay_template,支付成功通知
   */
  updateListInfo(params) {
    return axios({
      url: `${MODULE}/update`,
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
  }
}
