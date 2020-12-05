<template>
  <div class="panel">
    <div class="panel-header">
      <i class="icon icon-enlarge panel-header-icon"
         :class="fullScreen ? 'icon-narrow' : 'icon-enlarge'"
         @click="toggleFullScreen"></i>
      企业详情
    </div>
    <div class="panel-body">
      <p class="nodata"
         v-show="!data">暂无数据</p>
      <mod-detail v-if="data"
                  :id="entity.id"></mod-detail>
    </div>
  </div>
</template>
<script>
import { detailMixin } from '@/mixins'
import ModDetail from '@/components/packages/enterpriseDetail'

export default {
  mixins: [detailMixin],
  components: {
    ModDetail
  },
  data() {
    return {
      tabName: 'info'
    }
  },
  props: {
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleFullScreen() {
      this.$emit('toggleFullScreen', !this.fullScreen)
    }
  }
}
</script>
