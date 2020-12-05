import * as types from './types'

import demoRouter from './demo'
import loginRouter from './login'
import commonRouter from './common'
import omsRouter from './oms'
import pmsRouter from './pms'
import ramsRouter from './rams'
import smsRouter from './sms'
import emsRouter from './ems'
import pageRouter from './page'

let frame = {
  path: '/',
  name: types.SYSTEM,
  component: resolve => require(['@/pages/main'], resolve),
  children: [{
    path: '/empty',
    name: types.EMPTY,
    component: null
  }, {
    path: '/oms',
    component: resolve => require(['@/pages/oms/main'], resolve),
    children: [
      ...omsRouter
    ]
  }, {
    path: '/pms',
    component: resolve => require(['@/pages/pms/main'], resolve),
    children: [
      ...pmsRouter
    ]
  }, {
    path: '/rams',
    component: resolve => require(['@/pages/rams/main'], resolve),
    children: [
      ...ramsRouter
    ]
  }, {
    path: '/sms',
    component: resolve => require(['@/pages/sms/main'], resolve),
    children: [
      ...smsRouter
    ]
  }, {
    path: '/ems',
    component: resolve => require(['@/pages/ems/main'], resolve),
    children: [
      ...emsRouter
    ]
  }]
}

export default [
  ...loginRouter,
  frame,
  ...demoRouter,
  ...commonRouter,
  ...pageRouter
]
