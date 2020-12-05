<template>
  <Tabs value="1">
    <TabPane label="基础信息" name="1">
      <base-info :id="id" vma-lazy ref="baseInfo"></base-info>
    </TabPane>
    <TabPane label="下级企业" name="2">
      <enterprise :id="id" vma-lazy ref="enterprise"></enterprise>
    </TabPane>
    <TabPane label="迹点明细" name="3">
      <point-detail :id="id" vma-lazy ref="pointDetail"></point-detail>
    </TabPane>
  </Tabs>
</template>

<script>
import baseInfo from './components/baseInfo'
import enterprise from './components/enterprise'
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
    enterprise,
    pointDetail
  },
  computed: {
  },
  watch: {
  },
  methods: {
    refresh () {
      this.$refs.baseInfo.refresh()
      this.$refs.enterprise.refresh()
      this.$refs.pointDetail.refresh()
    }
  },
  created () {
  }
}
</script>

<style>
</style>
