<template>
  <div>
    <ins>
      <i class="icon icon-control"></i>
      控制面板
    </ins>
    <div class="control-container">
      <a href="javascript: void(0)"
         v-for="(v, i) in controlList"
         :key="i"
         :class="{active: v.url === currentMenuUrl}"
         @click="natigateTo(v)">
        {{v.name}}
        <Icon type="close"
              class="control-close"
              v-if="controlList.length > 1"
              @click.native.stop="close(v)"></Icon>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['controlList', 'currentMenuUrl'])
  },
  methods: {
    ...mapActions(['setCurrentMenuUrl', 'removeControlMap']),
    // 关闭control
    close(menu) {
      // 关闭当前control
      this.removeControlMap(menu.url)

      // 打开第一个菜单
      if (this.controlList.length) {
        this.setCurrentMenuUrl(this.controlList[0].url)
      } else {
        this.setCurrentMenuUrl(null)
      }
    },
    // 切换菜单
    natigateTo(menu) {
      this.setCurrentMenuUrl(menu.url)
    }
  }
}
</script>
