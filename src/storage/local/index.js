import {
  storage
} from 'vma-vue-assist'
import * as names from './names'
import * as LOGIN_TYPE from '@/constants/src/loginType'

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

export const loginTypeLocal = new storage.LocalItem({
  name: names.LOGIN_TYPE
})
loginTypeLocal.getOrDefault = function (defaultValue = LOGIN_TYPE.OMS) {
  return this.get() || defaultValue
}
