import {
  storage
} from 'vma-vue-assist'
import * as names from './names'
import VueCookie from 'vue-cookie'
/**
    property
      name        [String] 名称
      encrypt     [Boolean] 存储时是否加密
      namespace   [String|Function] 命名空间，存储时会添加命名空间
    method
      set(data)             [any] 存储数据
      get()                 [void]  取数据
      setByNamespace(data)  [any] 添加命名空间存储数据
      getByNamespace()      [void]  读取命名空间下的数据
      remove()              [void]  删除存储的数据
 */

export const adminInfoSession = new storage.SessionItem({
  name: names.ADMIN_INFO
})
const ADMIN_INFO_TOKEN = `${names.ADMIN_INFO}/TOKEN`
adminInfoSession.setToken = function (token) {
  VueCookie.set(ADMIN_INFO_TOKEN, token)
}
adminInfoSession.getToken = function () {
  return VueCookie.get(ADMIN_INFO_TOKEN) || ''
}
adminInfoSession.isLogin = function () {
  let adminInfo = this.getJSON()
  return adminInfo && adminInfo.id
}
const adminInfoSessionRemove = adminInfoSession.remove
adminInfoSession.remove = function () {
  adminInfoSessionRemove.call(this)
  VueCookie.delete(ADMIN_INFO_TOKEN)
}

export const currentMenuUrlSession = new storage.SessionItem({
  name: names.CURRENT_MENU_URL
})

export const controlMapSession = new storage.SessionItem({
  name: names.CONTROL_MAP
})

const ADMIN_PHONE = `ADMIN_PHONE`
export const setSessionPhone = function (phone) {
  VueCookie.set(ADMIN_PHONE, phone)
}
export const getSessionPhone = function () {
  return VueCookie.get(ADMIN_PHONE) || ''
}
