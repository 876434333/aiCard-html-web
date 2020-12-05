import {
  loginTypeLocal
} from '@/storage'

export const SMS = 1
export const OMS = 2
export const RAMS = 3
export const PMS = 4
export const EMS = 5

export const SMS_LABEL = '超级管理后台'
export const OMS_LABEL = '运营商后台'
export const RAMS_LABEL = '地区总代理商后台'
export const PMS_LABEL = '代理商后台'
export const EMS_LABEL = '企业后台'

export const LOGIN_TYPE_MAP = {
  [SMS]: {
    label: SMS_LABEL
  },
  [RAMS]: {
    label: RAMS_LABEL
  },
  [PMS]: {
    label: PMS_LABEL
  },
  [OMS]: {
    label: OMS_LABEL
  },
  [EMS]: {
    label: EMS_LABEL
  }
}

export const LOGIN_TYPE_LIST = [{
  value: SMS,
  label: SMS_LABEL
}, {
  value: OMS,
  label: OMS_LABEL
}, {
  value: RAMS,
  label: RAMS_LABEL
}, {
  value: PMS,
  label: PMS_LABEL
}, {
  value: EMS,
  label: EMS_LABEL
}]

export const getLabel = (value = loginTypeLocal.getOrDefault()) => {
  let obj = LOGIN_TYPE_MAP[value]
  return obj && obj.label
}
