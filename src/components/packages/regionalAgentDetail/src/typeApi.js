import { loginTypeLocal } from '@/storage'
import { regionalAgentApi as smsRegionalAgentApi } from '@/api/sms'
import { regionalAgentApi as omsRegionalAgentApi } from '@/api/oms'

const SMS = '1'
const OMS = '2'
const RAMS = '3'
const PMS = '4'

let noop = () => {
  return Promise.resolve({})
}
const INCLUDE_TYPE = [ SMS, OMS ]
const apiMap = {
  [SMS]: {
    getDetail: smsRegionalAgentApi.getAgentDetail,
    getSubAgentList: smsRegionalAgentApi.getSubAgentList
  },
  [OMS]: {
    getDetail: omsRegionalAgentApi.getAgentDetail,
    getSubAgentList: omsRegionalAgentApi.getSubAgentList
  },
  [RAMS]: {
  },
  [PMS]: {
  }
}

const getDetail = (value = loginTypeLocal.getOrDefault()) => {
  if (!INCLUDE_TYPE.includes(value)) {
    return noop
  }
  return apiMap[value].getDetail
}
const getSubAgentList = (value = loginTypeLocal.getOrDefault()) => {
  if (!INCLUDE_TYPE.includes(value)) {
    return noop
  }
  return apiMap[value].getSubAgentList
}

export {
  getDetail,
  getSubAgentList
}
