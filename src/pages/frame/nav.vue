<template>
  <div>
    <div class="user">
      <img :src="userAvtor"
           class="user-avtor">
      <p>{{adminInfo.name || '&nbsp;'}}</p>
    </div>
    <div class="nav"
         ref="nav">
      <ul v-if="menuList.length">
        <li v-for="(v, i) in menuList"
            :key="i">
          <a href="javascript: void(0)"
             class="nav-title"
             :data-nav-id="v.id">
            <i class="icon"
               :class="v.icon || 'icon-nav-home'"></i>
            <span>{{v.name}}</span>
            <Icon :type="'chevron-down'"
                  class="nav-arrow"
                  v-if="v.child && v.child.length"></Icon>
          </a>
          <ul class="nav-child"
              v-if="v.child && v.child.length"
              style="display: none;">
            <li v-for="(c, j) in v.child"
                :key="j">
              <a href="javascirpt: void(0);"
                 class="nav-title"
                 :data-nav-id="c.id">{{c.name}}</a>
            </li>
          </ul>
        </li>
      </ul>
      <p class="nav-nodata"
         v-else>暂无菜单</p>
    </div>
  </div>
</template>

<script>
import userAvtor from '@/assets/images/avtor.jpg'
import CollapseTransition from '~/iview/src/components/base/collapse-transition'
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'
import { isRouterExists } from '@/router'
import * as types from '@/router/types'

export default {
  components: {
    CollapseTransition
  },
  data() {
    return {
      userAvtor,
      activeMenu: null,
      navReductionTime: 6000
    }
  },
  computed: {
    ...mapGetters(['menuList', 'currentMenuUrl', 'adminInfo']),
    menuMap() {
      // 提供路由ID映射
      let menuIdMap = {}
      // 提供路由name映射
      let menuNameMap = {}
      let loop = (list, parent = null) => {
        list.forEach(v => {
          // 不能缓存parent对象的引用，会导致无限引用
          v.parentId = parent ? parent.id : null
          menuIdMap[v.id] = v
          if (v.url) {
            menuNameMap[v.url] = v
          }
          if (v.child && v.child.length) {
            loop(v.child, v)
          }
        })
      }
      loop(this.menuList)
      return {
        idMap: menuIdMap,
        nameMap: menuNameMap
      }
    }
  },
  watch: {
    // 允许外部更改菜单地址，从而进行菜单和路由的切换
    currentMenuUrl(value) {
      if (value && (!this.activeMenu || this.activeMenu.url !== value)) {
        this.openMenuByName(value)
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.initNavEvts()
      if (!this.currentMenuUrl) {
        this.openFirstMenu()
      } else {
        this.openMenuByName(this.currentMenuUrl)
      }
    }, 0)
  },
  destroyed() {
    let $nav = $(this.$refs.nav)
    $nav.undelegate('.nav-title', 'click', $nav.data('@@nav.clickHandler'))
  },
  methods: {
    ...mapActions(['setCurrentMenuUrl', 'addControlMap']),
    // 初始化菜单点击事件
    initNavEvts() {
      let that = this
      let $nav = $(this.$refs.nav)
      let timer = null
      let clickHandler = function () {
        let $this = $(this)
        let $li = $this.parent('li')
        let $siblingNavChild = $this.siblings('.nav-child')
        let navId = $this.data('nav-id')
        let nav = that.menuMap.idMap[navId]

        function toggleNavArrow($navArrow) {
          $navArrow.toggleClass('ivu-icon-chevron-up ivu-icon-chevron-down')
        }
        if (nav) {
          if ($li.hasClass('active')) {
            $siblingNavChild.stop().slideToggle(200, () => {
              toggleNavArrow($li.find('.nav-arrow'))
            })
          } else {
            $li.siblings('.active').removeClass('active')
              .find('ul').slideUp(200)
              .end()
              .find('.active').removeClass('active')
              .end()
              .find('.nav-arrow.ivu-icon-chevron-up')
              .removeClass('ivu-icon-chevron-up')
              .addClass('ivu-icon-chevron-down')
            if (nav.child && nav.child.length) {
              if ($li.hasClass('active')) {
                $siblingNavChild.stop().slideUp(200, () => {
                  toggleNavArrow($li.removeClass('active').find('.nav-arrow'))
                })
              } else {
                $siblingNavChild.stop().slideDown(200, () => {
                  toggleNavArrow($li.addClass('active').find('.nav-arrow'))
                })
              }
              // 若是未切换到其他子路由，特定时间后回显原来选定的路由页面
              timer = setTimeout(() => {
                clearTimeout(timer)
                that.openMenu(that.activeMenu, true)
              }, that.navReductionTime)
            } else {
              clearTimeout(timer)
              $li.addClass('active')
              that.goMenuById(navId)
            }
          }
        }
        return false
      }

      $nav.delegate('.nav-title', 'click', clickHandler)
        .data('@@nav.clickHandler', clickHandler)
    },
    // 根据菜单id切换路由
    // 注：只切换路由，不会切换菜单选中效果
    goMenuById(id) {
      this.goMenu(this.menuMap.idMap[id])
    },
    // 根据菜单name切换路由
    // 注：只切换路由，不会切换菜单选中效果
    goMenuByName(name) {
      this.goMenu(this.menuMap.nameMap[name])
    },
    // 切换路由，并缓存路由信息
    goMenu(menu) {
      if (isRouterExists(menu.url)) {
        if (this.activeMenu !== menu) {
          this.activeMenu = menu
          if (menu) {
            this.setCurrentMenuUrl(menu.url)
            this.addControlMap(menu)
            // 新页面打开
            if (menu.target === 2) {
              this.$router.push({
                name: types.EMPTY
              })
              const { href } = this.$router.resolve({
                name: menu.url
              })
              window.open(href, '_blank')
            } else {
              this.$router.push({
                name: menu.url
              })
            }
          }
        }
      } else {
        this.warning(`菜单[${menu.name}]不存在`)
      }
    },
    // 打开第一个可用的菜单并切换路由
    openFirstMenu() {
      if (this.$refs.nav && this.menuList && this.menuList.length) {
        // 找到第一个叶子节点
        let getFirstLeaf = (menuList) => {
          for (let menu of menuList) {
            if (Number(menu.isLeaf) === 1) {
              return menu
            } else if (menu.child && menu.child.length) {
              let temp = getFirstLeaf(menu.child)
              if (temp !== null && temp !== undefined) {
                return temp
              }
            }
          }
        }

        let firstLeafMenu = getFirstLeaf(this.menuList)
        if (firstLeafMenu) {
          this.openMenu(firstLeafMenu)
        }
      }
    },
    // 根据菜单name打开菜单并切换路由
    openMenuByName(name) {
      if (isRouterExists(name)) {
        let menu = this.menuMap.nameMap[name]
        // 必须先执行openMenu，再执行goMenu
        // 因为goMenu会记录this.activeMenu = menu，从而导致openMenu的判断失效
        this.openMenu(menu)
        this.goMenuByName(name)
      } else {
        let menu = this.menuMap.nameMap[name]
        this.warning(`菜单[${menu ? menu.name : name}]不存在`)
      }
    },
    // 打开菜单
    openMenu(menu, force = false) {
      if (isRouterExists(name)) {
        if (force || menu !== this.activeMenu) {
          while (menu) {
            let $nav = $(`[data-nav-id='${menu.id}']`)
            if (!$nav.parent('li').hasClass('active')) {
              $nav.click()
            }
            menu = this.menuMap.idMap[menu.parentId]
          }
        }
      } else {
        this.warning(`菜单[${menu.name}]不存在`)
      }
    }
  }
}
</script>
