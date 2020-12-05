export const demo = state => state.demo

// 当前登录用户信息
export const adminInfo = state => state.adminInfo || {}

// 当前登录用户菜单
export const menuList = state => state.adminInfo ? (state.adminInfo.menu || []) : []

// 当前菜单地址
export const currentMenuUrl = state => state.currentMenuUrl

// control list
export const controlList = state => Object.keys(state.controlMap).map(key => state.controlMap[key])
