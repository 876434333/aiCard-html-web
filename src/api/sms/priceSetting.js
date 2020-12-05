// enterCustomerController : 企业相关接口
import axios from 'axios'

const MODULE = '/V1.0/super'

export default {
  /**
   * 查看迹点价格
   */
  getPriceConfig() {
    return axios({
      url: `${MODULE}/point/config`,
      method: 'GET'
    })
  },
  /**
   * 修改迹点配置
   *
   * @param {*} params
   *         agent_rate: number, 代理商
   *         id: string, id
   *         oem_rate: number, 贴牌商汇率
   *         regional_rate: number, 地区总代理
   */
  updatePriceConfig(params) {
    return axios({
      url: `${MODULE}/point/config`,
      method: 'PUT',
      data: params
    })
  }
}
