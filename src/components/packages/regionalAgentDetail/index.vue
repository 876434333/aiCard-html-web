<template>
  <Tabs value="1">
    <TabPane label="基础信息" name="1">
      <base-info :id="id" vma-lazy ref="baseInfo"></base-info>
    </TabPane>
    <TabPane label="下级代理商" name="3">
      <agent :id="id" vma-lazy ref="agent"></agent>
    </TabPane>
    <TabPane label="迹点明细" name="4">
      <point-detail :id="id" vma-lazy ref="pointDetail"></point-detail>
    </TabPane>

  </Tabs>
</template>

<script>
import baseInfo from './components/baseInfo'
import agent from './components/agent'
import pointDetail from '@/components/packages/pointDetail'
export default {
  props: {
    id: ''
  },
  data() {
    return {}
  },
  components: {
    baseInfo,
    agent,
    pointDetail
  },
  computed: {},
  watch: {},
  methods: {
    refresh () {
      this.$refs.baseInfo.refresh()
      this.$refs.agent.refresh()
      this.$refs.pointDetail.refresh()
    }
  },
  create() {}
}
</script>

<style>
</style>
