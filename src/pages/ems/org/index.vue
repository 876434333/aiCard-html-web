<template>
  <div>
    <!-- 部门tree -->
    <div class="panel">
      <div class="panel-body">
        <tree></tree>
      </div>
    </div>
    <!-- 表格 -->
    <div class="panel">
      <div class="panel-body">
        <staffList></staffList>
      </div>
    </div>
  </div>
</template>

<script>
// 列表
import staffList from './components/staffList'
// 部门树
import tree from './components/departTree'
export default {
  // 注册组件
  components: {
    tree,
    staffList
  },
  data() {
    return {
    }
  }
}
</script>

<style></style>
