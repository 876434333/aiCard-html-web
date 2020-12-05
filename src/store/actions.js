import * as types from './mutation-types'

// 设置当前登录用户数据
export const setAdminInfo = ({
  commit
}, payload) => {
  commit(types.SET_ADMIN_INFO, payload)
}

// 设置当前激活的菜单
export const setCurrentMenuUrl = ({
  commit
}, payload) => {
  commit(types.SET_CURRENT_URL, payload)
}

// 添加新打开的control到记录中
export const addControlMap = ({
  commit
}, payload) => {
  commit(types.ADD_CONTROL_MAP, payload)
}

// 根据那么移除control
export const removeControlMap = ({
  commit
}, name) => {
  commit(types.REMOVE_CONTROL_MAP, name)
}

// 登出时清理数据
export const logoutClear = ({
  commit
}) => {
  commit(types.LOGOUT_CLEAR)
}
