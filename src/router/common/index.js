import * as types from './types'

/**
 * 是否为公共页面的路由
 */
export const isCommonRouter = name => {
  return Object.keys(types).some(key => types[key] === name)
}

export default [{
  path: '/find_password',
  name: types.FIND_PASSWORD,
  component: resolve => require(['@/pages/common/findPassword'], resolve)
}, {
  path: '*',
  name: types.PAGE404,
  component: resolve => require(['@/pages/common/404'], resolve)
}, {
  path: '/chooseEnt',
  name: types.CHOOSEENT,
  component: resolve => require(['@/pages/common/chooseEnt'], resolve)
}]
