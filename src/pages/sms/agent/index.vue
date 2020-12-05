<template>
<div>
  <index-layout>
    <div slot="topTools">
      <FormItem>
        <Button type="primary" @click="handlerSearch">查询</Button>
      </FormItem>
    </div>
    <div slot="topContain">
      <FormItem label="代理商"
                :label-width="100">
        <i-input v-model="query.nameOrPhone" type="text" placeholder="代理商名称/联系号码"></i-input>
      </FormItem>
      <FormItem label="创建时间"
                :label-width="80">
        <DatePicker type="daterange"
                v-model="dateRange"
                placement="bottom-end"
                format="yyyy-MM-dd"
                placeholder="请选择创建时间"
                style="width: 240px"/>
      </FormItem>
      <FormItem label="省份"
                :label-width="60">
        <Select v-model="query.provinceCode" style="width:160px" clearable>
          <Option v-for="item in provinceList" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="城市"
                :label-width="60">
        <Select v-model="query.cityCode" style="width:160px" :disabled="!cityList.length" clearable>
          <Option v-for="item in cityList" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
    </div>
    <div slot="sideTitle">代理商列表</div>
    <div slot="sideTools"></div>
    <div slot="sideContain">
      <index-side-list v-model="current" :list="list"></index-side-list>
      <Page class="pagination" show-sizer simple :total="total" :current="currentPage" @on-change="onPageChange" />
    </div>
    <span slot="mainTitle">代理商详情</span>
    <div slot="mainTools"></div>
    <div slot="mainContain">
      <detail :id="currentId" ></detail>
    </div>
  </index-layout>
</div>
</template>

<script>
import indexLayout from '@/components/packages/indexLayout'
import detail from '@/components/packages/agentDetail'
import indexSideList from './components/indexSideList'
import { watchDateRangeToTimestamp } from '@/utils'
import { agentApi } from '@/api/sms'
import { areaApi } from '@/api/common'
import { indexMixin2 } from '@/mixins'
export default {
  data() {
    return {
      query: {
        nameOrPhone: '',
        beginTime: '',
        endTime: '',
        cityCode: '',
        provinceCode: '',
        pageNum: 1,
        pageSize: 10
      },
      dateRange: [],
      provinceList: [],
      cityList: []
    }
  },
  components: {
    indexLayout,
    detail,
    indexSideList
  },
  mixins: [ indexMixin2 ],
  computed: {
  },
  watch: {
    'query.provinceCode' (n) {
      this.cityList = []
      this.query.cityCode = ''
      if (n) {
        this.getCityList()
      }
    }
  },
  methods: {
    getApi () {
      return agentApi.getAgentList
    },
    getProvinceList () {
      areaApi.getProvinceList().then(list => {
        this.provinceList = list
      })
    },
    getCityList () {
      areaApi.getCityList(this.query.provinceCode).then(list => {
        this.cityList = list
      })
    }
  },
  created () {
    this.$watch('dateRange', watchDateRangeToTimestamp(this.query, 'beginTime', 'endTime', 'yyyy-MM-dd'))
    this.getProvinceList()
    this.init()
  }
}
</script>
