import * as types from './types'

export const isEmsRouter = name => {
  return Object.keys(types).some(key => types[key] === name)
}

export default [{
  path: 'home',
  name: types.INDEX,
  component: resolve => require(['@/pages/ems/home'], resolve)
}, {
  path: 'store_offer',
  name: types.STORE_OFFER,
  component: resolve => require(['@/pages/ems/storeOffer'], resolve)
}, {
  path: 'store_order',
  name: types.STORE_ORDER,
  component: resolve => require(['@/pages/ems/storeOrder'], resolve)
}, {
  path: 'staff_order',
  name: types.STAFF_ORDER,
  component: resolve => require(['@/pages/ems/staffOrder'], resolve)
}, {
  path: 'circle',
  name: types.CIRCLE,
  component: resolve => require(['@/pages/ems/circle'], resolve)
}, {
  path: 'store_discount',
  name: types.STORE_DISCOUNT,
  component: resolve => require(['@/pages/ems/storeDiscount'], resolve)
}, {
  path: 'adv',
  name: types.ADV,
  component: resolve => require(['@/pages/ems/adv'], resolve)
}, {
  path: 'weixin_permisson',
  name: types.WEIXIN_PERMISSON,
  component: resolve => require(['@/pages/ems/weixinPermisson'], resolve)
}, {
  path: 'handover',
  name: types.HANDOVER,
  component: resolve => require(['@/pages/ems/handover'], resolve)
}, {
  path: 'radar',
  name: types.RADAR,
  component: resolve => require(['@/pages/ems/radar'], resolve)
}, {
  path: 'org',
  name: types.ORG,
  component: resolve => require(['@/pages/ems/org'], resolve)
},
{
  path: 'dept',
  name: types.DEPT,
  component: resolve => require(['@/pages/ems/department'], resolve)
},
{
  path: 'file',
  name: types.FILE,
  component: resolve => require(['@/pages/ems/file'], resolve)
}

// , {
//   path: 'website',
//   name: types.WEBSTIE,
//   component: resolve => require(['@/pages/ems/website'], resolve)
// }, {
//   path: 'product',
//   name: types.PRODUCT,
//   component: resolve => require(['@/pages/ems/product'], resolve)
// }, {
//   path: 'circle',
//   name: types.CIRCLE,
//   component: resolve => require(['@/pages/ems/circle'], resolve)
// }, {
//   path: 'org',
//   name: types.ORG,
//   component: resolve => require(['@/pages/ems/org'], resolve)
// }, {
//   path: 'radar',
//   name: types.RADAR,
//   component: resolve => require(['@/pages/ems/radar'], resolve)
// }, {
//   path: 'handover',
//   name: types.HANDOVER,
//   component: resolve => require(['@/pages/ems/handover'], resolve)
// }, {
//   path: 'order_list',
//   name: types.ORDER_LIST,
//   component: resolve => require(['@/pages/ems/orderList'], resolve)
// }, {
//   path: 'advert_list',
//   name: types.ADVERT_LIST,
//   component: resolve => require(['@/pages/ems/advertList'], resolve)
// }, {
//   path: 'advert_edit',
//   name: types.ADVERT_EDIT,
//   component: resolve => require(['@/pages/ems/advertEdit'], resolve)
// }, {
//   path: 'miniprogram_permisson',
//   name: types.MINIPROGRAM_PERMISSON,
//   component: resolve => require(['@/pages/ems/miniprogramPermisson'], resolve)
// }, {
//   path: 'weixin_permisson',
//   name: types.WEIXIN_PERMISSON,
//   component: resolve => require(['@/pages/ems/weixinPermisson'], resolve)
// }
]
