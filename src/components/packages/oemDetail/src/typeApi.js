import { loginTypeLocal } from '@/storage'
import { oemApi } from '@/api/sms'

const SMS = '1'
const OMS = '2'
const RAMS = '3'
const PMS = '4'

let noop = () => {
  return Promise.resolve({})
}
const INCLUDE_TYPE = [SMS]
const apiMap = {
  [SMS]: {
    getDetail: oemApi.getOemDetail,
    getAgentList: oemApi.getSubAgentList,
    getRegionalAgentList: oemApi.getSubAreaAgentList
  },
  // 将来可能使用
  [RAMS]: {
    getDetail: noop
  },
  [PMS]: {
    getDetail: noop
  },
  [OMS]: {
    getDetail: noop
  }
}

const getDetail = (value = loginTypeLocal.getOrDefault()) => {
  if (!INCLUDE_TYPE.includes(value)) {
    return noop
  }
  return apiMap[value].getDetail
}
const getAgentList = (value = loginTypeLocal.getOrDefault()) => {
  if (!INCLUDE_TYPE.includes(value)) {
    return noop
  }
  return apiMap[value].getAgentList
}
const getRegionalAgentList = (value = loginTypeLocal.getOrDefault()) => {
  if (!INCLUDE_TYPE.includes(value)) {
    return noop
  }
  return apiMap[value].getRegionalAgentList
}

export {
  getDetail,
  getAgentList,
  getRegionalAgentList
}
