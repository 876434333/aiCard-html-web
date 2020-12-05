import Vue from 'vue'
import Router from 'vue-router'
import iView, {
  Message as iviewMessage
} from 'iview'
import routes from './routes'
import * as types from './types'
import * as loginTypes from './login/types'
import {
  isCommonRouter
} from './common'
import {
  isDemoRouter
} from './demo'
import {
  isEmsRouter
} from './ems'
import {
  isLoginRouter
} from './login'
import {
  isOmsRouter
} from './oms'
import {
  isPageRouter
} from './page'
import {
  isPmsRouter
} from './pms'
import {
  isRamsRouter
} from './rams'
import {
  isSmsRouter
} from './sms'
import {
  adminInfoSession,
  loginTypeLocal
} from '@/storage'
import {
  showRouterAuthorityMsg
} from '@/config'
import {
  accountApi
} from '@/api/common'
import store from '@/store'
import * as LOGIN_TYPE from '@/constants/src/loginType'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  // demo 页面放行
  if (/^\/demo/.test(to.fullPath)) {
    next()
    return
  }

  function redirectToLoignOrPass() {
    // 用户未登录
    if (shouldRedirectToLogin(to.name)) {
      return redirectToLoign()
    } else {
      iView.LoadingBar.start()
      next()
    }
  }

  // 用户已登录
  if (adminInfoSession.isLogin()) {
    let adminInfo = adminInfoSession.getJSON()

    // 需要重定向到后台首页
    // 1、前往的是登录页
    if (isLoginRouter(to.name)) {
      return navigateToSystem()
    }
    // 2、用户没有目标页面的菜单权限
    if (!hasMenuPurview(to.name, adminInfo.menu)) {
      if (showRouterAuthorityMsg) {
        iviewMessage.warning({
          content: '没有当前菜单权限',
          duration: 8,
          closable: true
        })
      }
      return navigateToSystem()
    }
    iView.LoadingBar.start()
    next()
  } else {
    // 接口验证是否登录
    accountApi.getAdminInfo().then(data => {
      if (data && data.id) {
        adminInfoSession.setJSON(data)
        location.reload()
      } else {
        // 用户未登录
        redirectToLoignOrPass()
      }
    }, err => {
      // 用户未登录
      redirectToLoignOrPass()
      Promise.reject(err)
    })
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

/**
 * 根据路由名称是否需要重定向到登录页
 * @param {*} routerName
 */
export const shouldRedirectToLogin = routerName => {
  return routerName &&
    !isLoginRouter(routerName) &&
    !isCommonRouter(routerName)
}

/**
 * 重定向到登录页, 重定向到最后一次登录的后台类型的登录页
 */
const LOGIN_TYPE_ROUTER_MAP = {
  [LOGIN_TYPE.SMS]: loginTypes.LOGIN_SMS,
  [LOGIN_TYPE.OMS]: loginTypes.LOGIN_OMS,
  [LOGIN_TYPE.RAMS]: loginTypes.LOGIN_RAMS,
  [LOGIN_TYPE.PMS]: loginTypes.LOGIN_PMS,
  [LOGIN_TYPE.EMS]: loginTypes.LOGIN_EMS
}
export const redirectToLoign = () => {
  store.dispatch('logoutClear')
  router.push({
    name: LOGIN_TYPE_ROUTER_MAP[Number(loginTypeLocal.getOrDefault())] || loginTypes.LOGIN
  })
}

/**
 * 进入后台首页
 */
export const navigateToSystem = () => {
  router.push({
    name: types.SYSTEM
  })
}

/**
 * 是否拥有菜单权限
 * @param {*} routerName
 * @param {*} menuList
 */
const excludePurviewMenuList = [types.SYSTEM, types.EMPTY]
export const hasMenuPurview = (routerName, menuList) => {
  if (routerName && !isCommonRouter(routerName) && excludePurviewMenuList.indexOf(routerName) === -1 && menuList && menuList.length) {
    return menuList.some(menu => {
      if (menu.url === routerName) {
        return true
      } else if (menu.child && menu.child.length) {
        return menu.child.some(child => child.url === routerName)
      }
    })
  }
  return true
}

/**
 * 路由页面是否存在
 * @param {*} routerName
 */
export const isRouterExists = routerName => {
  return !routerName ||
    (
      isLoginRouter(routerName) ||
      isCommonRouter(routerName) ||
      isDemoRouter(routerName) ||
      isEmsRouter(routerName) ||
      isOmsRouter(routerName) ||
      isPageRouter(routerName) ||
      isPmsRouter(routerName) ||
      isRamsRouter(routerName) ||
      isSmsRouter(routerName)
    )
}

export default router
