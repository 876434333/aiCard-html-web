// AreaController : 省市区API
import axios from 'axios'
const MODULE = '/V1.0/common/area'

let provinceList = []
let cityCache = {}
let areaCache = {}

export default {
  /**
   * 获取省份列表
   */
  getProvinceList () {
    if (provinceList && provinceList.length) {
      return Promise.resolve(provinceList)
    }
    return axios({
      url: `${MODULE}/province`
    }).then(data => {
      provinceList = data.list
      return data.list
    })
  },
  /**
   * 获取城市列表
   */
  getCityList (provinceCode) {
    if (cityCache[provinceCode]) {
      return Promise.resolve(cityCache[provinceCode])
    }
    return axios({
      url: `${MODULE}/city/${provinceCode}`
    }).then(data => {
      cityCache[provinceCode] = data.list
      return data.list
    })
  },
  /**
   * 获取地区列表
   */
  getAreaList (cityCode) {
    if (areaCache[cityCode]) {
      return Promise.resolve(areaCache[cityCode])
    }
    return axios({
      url: `${MODULE}/area/${cityCode}`
    }).then(data => {
      areaCache[cityCode] = data.list
      return data.list
    })
  }
}
