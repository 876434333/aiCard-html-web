import { loginTypeLocal } from '@/storage'
import { agentApi as smsAgentApi } from '@/api/sms'
import { agentApi as omsAgentApi } from '@/api/oms'
import { agentApi as ramsAgentApi } from '@/api/rams'

const SMS = '1'
const OMS = '2'
const RAMS = '3'
const PMS = '4'

let noop = () => {
  return Promise.resolve({})
}
const INCLUDE_TYPE = [ SMS, OMS, RAMS ]
const apiMap = {
  [SMS]: {
    getDetail: smsAgentApi.getAgentDetail,
    getEnterpriseList: smsAgentApi.getEnterpriseList
  },
  [OMS]: {
    getDetail: omsAgentApi.getAgentDetail,
    getEnterpriseList: omsAgentApi.getEnterpriseList
  },
  [RAMS]: {
    getDetail: ramsAgentApi.getAgentDetail,
    getEnterpriseList: ramsAgentApi.getEnterpriseList
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
const getEnterpriseList = (value = loginTypeLocal.getOrDefault()) => {
  if (!INCLUDE_TYPE.includes(value)) {
    return noop
  }
  return apiMap[value].getEnterpriseList
}

export {
  getDetail,
  getEnterpriseList
}
