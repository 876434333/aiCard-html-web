<template>
  <div class="task-detail">
    <div v-if="id">
      <div class="cf">
        <img :src="detail.headIcon" alt="logo" width="80px" height="80px" class="fl mr10 bd" />
        <div>贴牌商名称：{{detail.name}}</div>
        <div>编号：{{detail.enterpriseNo}}</div>
        <div>账号：{{detail.login}}</div>
      </div>
      <Row :gutter="60"
            class="mt-20 nail nail-f-lg">
        <i-col span="4" v-for="(item,i) in dataList" :key="i" class="mb-10">
          <div class="nail-item"
                style="width: 100%;">
            <h3>{{item.value}}</h3>
            <p>{{item.label}}</p>
          </div>
        </i-col>
      </Row>

      <hr class="mt-20">
      <div class="mt-20">
        <div class="mb10">联系电话：{{detail.phone}}</div>
        <div class="mb10">贴牌商状态：{{detail.status | statusFilter}}</div>
        <div class="mb10">地址：{{detail.provinceName}} {{detail.cityName}} {{detail.areaName}} {{detail.address}}</div>
        <div class="mb10">创建时间：{{detail.createTime | date}}</div>
        <div class="mb10">创建人：{{detail.createStaffName}}</div>
        <div class="mb10">备注：{{detail.remark}}</div>
      </div>
    </div>
    <div v-else>
      <div class="ptb50">暂无数据</div>
    </div>
  </div>
</template>

<script>
import { statusFilter } from '../src/funcs.js'
import { getDetail } from '../src/typeApi'
export default {
  props: {
    id: ''
  },
  data () {
    return {
      detail: {}
    }
  },
  filters: {
    statusFilter
  },
  computed: {
    dataList () {
      let {moneyInit, moneySum, moneyLeave, agentCount, areaCount} = this.detail
      let item1 = {label: '初始迹点', value: moneyInit}
      let item2 = {label: '累计迹点', value: moneySum}
      let item3 = {label: '剩余迹点', value: moneyLeave}
      let item4 = {label: '下级地区总代理', value: areaCount}
      let item5 = {label: '下级代理商', value: agentCount}
      return [item1, item2, item3, item4, item5]
    }
  },
  watch: {
    id: {
      handler () {
        this.loadDetail()
      },
      immediate: true
    }
  },
  methods: {
    loadDetail () {
      if (!this.id) {
        this.detail = {}
        return
      }
      getDetail().call(this, this.id).then(data => {
        this.detail = data
      })
    },
    refresh () {
      this.loadDetail()
    }
  },
  created () {
  }
}
</script>

<style>

</style>
