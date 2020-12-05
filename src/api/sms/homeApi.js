import axios from 'axios'

const MODULE = '/V1.0/super/index'

export default {
  /**
   * 名片数量
   * http://120.77.82.251:9001/push/swagger-ui.html#!/SuperIndexController/getCard_numberUsingGET_3
   * @param {*} params
   */
  getCardNumber() {
    return axios({
      url: `${MODULE}/card_number`,
      method: 'GET',
      responseType: 'json'
    })
  },
  /**
   * 前N天每天名片数量
   * http://120.77.82.251:9001/push/swagger-ui.html#!/SuperIndexController/getDays_Card_numberUsingGET_3
   * @param {*} dayNumber
   */
  getDaysCardNumber(dayNumber) {
    return axios({
      url: `${MODULE}/days_card_number/${dayNumber}`,
      method: 'GET',
      responseType: 'json'
    })
  },
  /**
   * 前N天每天迹点数据
   * http://120.77.82.251:9001/push/swagger-ui.html#!/SuperIndexController/getPoint_NumberByDayNumberUsingGET_3
   * @param {*} dayNumber
   */
  getDaysPointNumber(dayNumber) {
    return axios({
      url: `${MODULE}/days_point_number/${dayNumber}`,
      method: 'GET',
      responseType: 'json'
    })
  },
  /**
   * 当前企业下的代理商与企业数量
   * http://120.77.82.251:9001/push/swagger-ui.html#!/SuperIndexController/getEnterpriseNumberUsingGET_3
   */
  getEnterpriseNumber() {
    return axios({
      url: `${MODULE}/enterprise_number`,
      method: 'GET',
      responseType: 'json'
    })
  },
  /**
   * 迹点数据
   * http://120.77.82.251:9001/push/swagger-ui.html#!/SuperIndexController/getPoint_NumberUsingGET_3
   */
  getPointNumber() {
    return axios({
      url: `${MODULE}/point_number`,
      method: 'GET',
      loading: false,
      responseType: 'json'
    })
  }
}
