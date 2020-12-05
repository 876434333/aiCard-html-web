import * as types from './types'

export const isPmsRouter = name => {
  return Object.keys(types).some(key => types[key] === name)
}

export default [{
  path: 'home',
  name: types.INDEX,
  component: resolve => require(['@/pages/pms/home'], resolve)
}, {
  path: 'enterprise',
  name: types.ENTERPRISE,
  component: resolve => require(['@/pages/pms/enterprise'], resolve)
}, {
  path: 'trace_point',
  name: types.TRACE_POINT,
  component: resolve => require(['@/pages/pms/tracePoint'], resolve)
}, {
  path: 'trace_point_mine',
  name: types.TRACE_POINT_MINE,
  component: resolve => require(['@/pages/pms/tracePoint/mine'], resolve)
}, {
  path: 'staff',
  name: types.STAFF,
  component: resolve => require(['@/pages/pms/staff'], resolve)
}]
