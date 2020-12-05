import * as types from './mutation-types'
import {
  adminInfoSession,
  currentMenuUrlSession,
  controlMapSession
} from '@/storage'

export default {
  [types.DEMO](state) {
    console.log('state.demo change')
  },
  /**
   * 设置当前登录用户数据
   * state.adminInfo
   * @param {*} state
   * @param {*} payload
   */
  [types.SET_ADMIN_INFO](state, payload) {
    state.adminInfo = payload
    adminInfoSession.setJSON(payload)
  },
  /**
   * 设置当前激活的菜单
   * @param {*} state
   * @param {*} payload
   */
  [types.SET_CURRENT_URL](state, payload) {
    state.currentMenuUrl = payload
    currentMenuUrlSession.set(payload)
  },
  /**
   * 添加当前打开的control到记录中
   * @param {*} state
   * @param {*} menu
   */
  [types.ADD_CONTROL_MAP](state, menu) {
    let controlMap = Object.assign({}, state.controlMap)
    if (!controlMap[menu.url]) {
      controlMap[menu.url] = menu
      state.controlMap = controlMap
      controlMapSession.setJSON(controlMap)
    }
  },
  /**
   * 根据name移除control
   *
   * @param {*} state
   * @param {*} name
   */
  [types.REMOVE_CONTROL_MAP](state, name) {
    let controlMap = Object.assign({}, state.controlMap)
    if (controlMap[name]) {
      delete controlMap[name]
      state.controlMap = controlMap
      controlMapSession.setJSON(controlMap)
    }
  },
  /**
   * 登出时清理数据
   * @param {*} state
   * @param {*} name
   */
  [types.LOGOUT_CLEAR](state, name) {
    state.adminInfo = {}
    state.currentMenuUrl = ''
    state.controlMap = {}
    adminInfoSession.remove()
    currentMenuUrlSession.remove()
    controlMapSession.remove()
  }
}
