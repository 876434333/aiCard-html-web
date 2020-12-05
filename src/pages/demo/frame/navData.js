import * as types from '@/router/demo/types'

let index = 1
export default [{
  id: index++,
  icon: 'icon-nav-home',
  title: '首页',
  children: [{
    id: index++,
    title: '文件上传',
    name: types.EXAMPLE
  }, {
    id: index++,
    title: '微信用户',
    name: types.WECHAT
  }]
}, {
  id: index++,
  icon: 'icon-nav-marketing',
  title: '营销管理',
  children: [{
    id: index++,
    title: '营销任务',
    name: types.MARKETING.TASK
  }, {
    id: index++,
    title: '呼叫记录',
    name: types.MARKETING.CALL
  }, {
    id: index++,
    title: '通话详情',
    name: types.MARKETING.CALL_DETAIL
  }, {
    id: index++,
    title: '创建营销任务',
    name: types.MARKETING.TASK_FORM
  }]
}, {
  id: index++,
  icon: 'icon-nav-customer',
  title: '客户中心',
  children: [{
    id: index++,
    title: '我的客户',
    name: types.CLIENT.MINE
  }, {
    id: index++,
    title: '编辑客户',
    name: types.CLIENT.FORM
  }]
}, {
  id: index++,
  icon: 'icon-nav-robot',
  title: '销售人员管理',
  name: types.SELLER.MANAGER,
  children: []
}, {
  id: index++,
  icon: 'icon-nav-robot',
  title: '代理设置',
  name: types.PROXY.INDEX,
  children: []
}, {
  id: index++,
  icon: 'icon-nav-robot',
  title: '开通坐席申请',
  name: types.ROBOT,
  children: []
}, {
  id: index++,
  icon: 'icon-nav-robot',
  title: '代理基础信息',
  name: types.PROXY.INFO,
  children: []
}, {
  id: index++,
  icon: 'icon-nav-robot',
  title: '话术管理',
  children: [{
    id: index++,
    title: '新增话术',
    name: types.WHISPERING.FORM
  }]
}]
