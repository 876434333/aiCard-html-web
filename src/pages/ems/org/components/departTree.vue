<template>
  <Tree :data="treeData"
        ref="tree"
        @on-select-change="getlist"></Tree>
</template>
<script>
// api
import { orgApi } from '@/api/ems'
export default {
  data() {
    return {
      treeData: [] // tree的数据
    }
  },
  created() { // 加载组件时触发
    orgApi.tree().then(data => { // 获取树的数据
      this.treeData = data
    })
  },
  methods: {
    /**
       * 切换部门
       * @param root
       */
    getlist(root) {
      this.$emitBus('stafflist', root[0].id) // 发送数据
    }
  }
}
</script>
<style lang='scss'>
.ivu-tree {
  span {
    font-size: 16px;
  }
}
</style>
