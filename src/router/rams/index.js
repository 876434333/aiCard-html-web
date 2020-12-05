import * as types from './types'

export const isRamsRouter = name => {
  return Object.keys(types).some(key => types[key] === name)
}

export default [{
  path: 'home',
  name: types.INDEX,
  component: resolve => require(['@/pages/rams/home'], resolve)
}, {
  path: 'agent',
  name: types.AGENT,
  component: resolve => require(['@/pages/rams/agent'], resolve)
}, {
  path: 'enterprise',
  name: types.ENTERPRISE,
  component: resolve => require(['@/pages/rams/enterprise'], resolve)
}, {
  path: 'trace_point',
  name: types.TRACE_POINT,
  component: resolve => require(['@/pages/rams/tracePoint'], resolve)
}, {
  path: 'trace_point_mine',
  name: types.TRACE_POINT_MINE,
  component: resolve => require(['@/pages/rams/tracePoint/mine'], resolve)
}, {
  path: 'staff',
  name: types.STAFF,
  component: resolve => require(['@/pages/rams/staff'], resolve)
}]
