import {
  pointApi as omsPointApi
} from '@/api/oms'
import {
  pointApi as ramsPointApi
} from '@/api/rams'
import {
  pointApi as pmsPointApi
} from '@/api/pms'
import {
  loginTypeLocal
} from '@/storage'
import {
  OMS,
  RAMS,
  PMS
} from '@/constants/src/loginType'

export const getPointApi = () => {
  return {
    [OMS]: omsPointApi,
    [RAMS]: ramsPointApi,
    [PMS]: pmsPointApi
  }[loginTypeLocal.getOrDefault()]
}
