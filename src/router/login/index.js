import * as types from './types'

/**
 * 是否为登录页面的路由
 */
export const isLoginRouter = name => {
  return Object.keys(types).some(key => types[key] === name)
}

export default [{
  path: '/login',
  name: types.LOGIN,
  component: resolve => require(['@/pages/login/index'], resolve)
}, {
  path: '/ems/login',
  name: types.LOGIN_EMS,
  component: resolve => require(['@/pages/login/emsLogin'], resolve)
}, {
  path: '/pms/login',
  name: types.LOGIN_PMS,
  component: resolve => require(['@/pages/login/pmsLogin'], resolve)
}, {
  path: '/rams/login',
  name: types.LOGIN_RAMS,
  component: resolve => require(['@/pages/login/ramsLogin'], resolve)
}, {
  path: '/oms/login',
  name: types.LOGIN_OMS,
  component: resolve => require(['@/pages/login/omsLogin'], resolve)
}, {
  path: '/sms/login',
  name: types.LOGIN_SMS,
  component: resolve => require(['@/pages/login/smsLogin'], resolve)
}]
