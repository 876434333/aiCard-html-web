<template>
  <div>
    <index-layout>
      <div slot="topTools">
        <FormItem>
          <Button type="primary" @click="handlerSearch">查询</Button>
        </FormItem>
      </div>
      <div slot="topContain">
        <FormItem label="地区总代理"
                  :label-width="100">
          <i-input v-model="query.nameOrPhone" type="text" placeholder="地区总代理名称/联系号码"></i-input>
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
      <div slot="sideTitle">
        地区总代理列表
      </div>
      <div slot="sideTools">
        <Button type="primary"
                icon="plus"
                @click="handlerAdd">添加</Button>
      </div>
      <div slot="sideContain">
        <index-side-list v-model="current" :list="list"></index-side-list>
        <Page class="pagination" show-sizer simple :total="total" :current="currentPage" @on-change="onPageChange" />
      </div>
      <span slot="mainTitle">地区总代理详情</span>
      <div slot="mainTools">
        <Button type="primary" @click="handlerResetPassword">重置密码</Button>
        <Button :type=" current.status === 0 ? 'primary' : 'error'" @click="handlerUpdateStatus">{{current.status === 0 ? '启用' : '禁用'}}</Button>
        <Button type="primary" @click="handlerEdit">编辑</Button>
        <Button type="primary" @click="handlerAddPoint">分配迹点</Button>
        <Button type="primary" @click="handlerDeductPoint">扣迹点</Button>
      </div>
      <div slot="mainContain">
        <detail :id="currentId" ref="detail"></detail>
      </div>
    </index-layout>
    <!-- 添加 编辑 -->
    <edit v-model="editVisible" :id="editId" @after-save="refresh"></edit>
    <!-- 操作迹点 -->
    <operate-point v-model="operatePointVisible" :id="currentId" :type="operatePointType" @after-save="refresh"></operate-point>
    <!-- 重置密码 -->
    <reset-pswd v-model="resetPasswordVisible" :id="currentId"></reset-pswd>
  </div>
</template>

<script>
import indexLayout from '@/components/packages/indexLayout'
import detail from '@/components/packages/regionalAgentDetail'
import edit from './components/edit'
import operatePoint from './components/operatePoint'
import indexSideList from './components/indexSideList'
import resetPswd from '@/components/common/resetPsw/index.vue'
import { watchDateRangeToTimestamp } from '@/utils'
import { areaApi, enterpriseApi } from '@/api/common'
import { regionalAgentApi } from '@/api/oms'
import { indexMixin2 } from '@/mixins'
export default {
  name: 'smsRegionalAgent',
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
      cityList: [],
      // 新增编辑
      editVisible: false,
      editId: false,
      // 操作迹点
      operatePointVisible: false,
      operatePointType: 1,
      // 重置密码
      resetPasswordVisible: false

    }
  },
  components: {
    indexLayout,
    detail,
    edit,
    operatePoint,
    indexSideList,
    resetPswd
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
      return regionalAgentApi.getAgentList
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
    },
    handlerAdd () {
      this.editVisible = true
      this.editId = ''
    },
    handlerResetPassword () {
      this.resetPasswordVisible = true
    },
    handlerUpdateStatus () {
      if (!this.currentId) {
        return
      }
      let status = this.current.status === 0 ? 1 : 0
      let text = status === 0 ? '禁用' : '启用'
      let data = {
        id: this.currentId,
        status: status
      }
      this.$Modal.confirm({
        title: '提示',
        content: `<p>您确定要${text}此代理商吗？</p>`,
        onOk: () => {
          enterpriseApi.updateStatus(data).then(() => {
            this.current.status = status
            this.refreshDetail()
            this._loadList()
            this.success('操作成功')
          })
        }
      })
    },
    handlerEdit () {
      if (!this.currentId) {
        return
      }
      this.editVisible = true
      this.editId = this.currentId
    },
    afterSaveEdit () {
      this.$refs.detail.$children[0].refresh()
    },
    handlerAddPoint () {
      if (!this.currentId) {
        return
      }
      this.operatePointVisible = true
      this.operatePointType = 1
    },
    handlerDeductPoint () {
      if (!this.currentId) {
        return
      }
      this.operatePointVisible = true
      this.operatePointType = 2
    }
  },
  created () {
    this.$watch('dateRange', watchDateRangeToTimestamp(this.query, 'beginTime', 'endTime', 'yyyy-MM-dd'))
    this.getProvinceList()
    this.init()
  }
}
</script>
