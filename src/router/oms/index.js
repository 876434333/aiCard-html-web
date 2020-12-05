import * as types from './types'

export const isOmsRouter = name => {
  return Object.keys(types).some(key => types[key] === name)
}

export default [{
  path: 'home',
  name: types.INDEX,
  component: resolve => require(['@/pages/oms/home'], resolve)
}, {
  path: 'regionalAgent',
  name: types.REGIONAL_AGENT,
  component: resolve => require(['@/pages/oms/regionalAgent'], resolve)
}, {
  path: 'agent',
  name: types.AGENT,
  component: resolve => require(['@/pages/oms/agent'], resolve)
}, {
  path: 'enterprise',
  name: types.ENTERPRISE,
  component: resolve => require(['@/pages/oms/enterprise'], resolve)
}, {
  path: 'trace_point',
  name: types.TRACE_POINT,
  component: resolve => require(['@/pages/oms/tracePoint'], resolve)
}, {
  path: 'trace_point_mine',
  name: types.TRACE_POINT_MINE,
  component: resolve => require(['@/pages/oms/tracePoint/mine'], resolve)
}, {
  path: 'staff',
  name: types.STAFF,
  component: resolve => require(['@/pages/oms/staff'], resolve)
}]
