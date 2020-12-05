import * as types from './types'

export const isSmsRouter = name => {
  return Object.keys(types).some(key => types[key] === name)
}

export default [{
  path: 'home',
  name: types.INDEX,
  component: resolve => require(['@/pages/sms/home'], resolve)
}, {
  path: 'oem',
  name: types.OEM,
  component: resolve => require(['@/pages/sms/oem'], resolve)
}, {
  path: 'regional_agent',
  name: types.REGIONAL_AGENT,
  component: resolve => require(['@/pages/sms/regionalAgent'], resolve)
}, {
  path: 'agent',
  name: types.AGENT,
  component: resolve => require(['@/pages/sms/agent'], resolve)
}, {
  path: 'enterprise',
  name: types.ENTERPRISE,
  component: resolve => require(['@/pages/sms/enterprise'], resolve)
}, {
  path: 'enterprise_apply',
  name: types.ENTERPRISE_APPLY,
  component: resolve => require(['@/pages/sms/enterpriseApply'], resolve)
}, {
  path: 'trace_point',
  name: types.TRACE_POINT,
  component: resolve => require(['@/pages/sms/tracePoint'], resolve)
}, {
  path: 'template',
  name: types.TEMPLATE,
  component: resolve => require(['@/pages/sms/template'], resolve)
}, {
  path: 'staff',
  name: types.STAFF,
  component: resolve => require(['@/pages/sms/staff'], resolve)
}, {
  path: 'setting/price',
  name: types.PRICE_SETTING,
  component: resolve => require(['@/pages/sms/setting/priceSetting/index.vue'], resolve)
}, {
  path: 'web_apply',
  name: types.WEB_APPLY,
  component: resolve => require(['@/pages/sms/webApply/index.vue'], resolve)
}, {
  path: 'recommendCard',
  name: types.RCDCARD,
  component: resolve => require(['@/pages/sms/recommendCard'], resolve)
}]
