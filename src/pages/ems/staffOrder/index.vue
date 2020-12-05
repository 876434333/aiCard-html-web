<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Form class="panel-form"
              inline>
          <FormItem>
            <i-input type="text"
                     v-model="params.staffName"
                     placeholder="输入姓名查询"></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="search">查询</Button>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="selectDepartment">选择部门</Button>
          </FormItem>
          <div class="fr">
            <FormItem label="统计时间"
                      :label-width="100">
              <DatePicker type="daterange"
                          v-model="dateRange"
                          :options="pickerOptions"
                          placement="bottom-end"
                          format="yyyy-MM-dd"
                          placeholder="请选择日期范围"
                          style="width: 240px"
                          @on-change="delaySearch" />
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <Table :columns="table.columns"
               :data="table.list"
               ref="table" />
        <vma-pagination :pageNum="params.pageNum"
                        :pageSize="params.pageSize"
                        :total="page.totalNum"
                        @change="list" />
      </div>
    </div>
    <!-- 查看详情 -->
    <department-tree v-model="departmentVisible"></department-tree>
    <!-- 查看详情 -->
    <vma-panel v-model="detailVisible"
               title="详情">
      <staff-order-list v-model="detailVisible"></staff-order-list>
    </vma-panel>
  </div>
</template>

<script>

import { indexMixin } from '@/mixins'
import Digit from '../home/components/digit'
import { watchDateRangeToTimestamp, getDatePickerShortcuts } from '@/utils'
import { staffOrderApi } from '@/api/ems'
import DepartmentTree from './components/departmentTree'
import StaffOrderList from './components/staffOrderList'

export default {
  mixins: [indexMixin],
  components: {
    StaffOrderList,
    DepartmentTree,
    Digit
  },
  data() {
    return {
      params: {
        beginTime: '',
        endTime: '',
        staffName: '',
        departmentId: ''
      },
      table: {
        columns: [{
          title: '头像',
          align: 'center',
          render: (h, { row, column, index }) => {
            return (<div class='img-space-del-table'><img src={row.headIcon} width="60px" height="60px" /></div>)
          }
        }, {
          title: '业务员',
          align: 'center',
          key: 'name'
        }, {
          title: '手机',
          align: 'center',
          key: 'phone'
        }, {
          title: '部门',
          align: 'center',
          key: 'departmentName'
        }, {
          title: '成交订单数',
          align: 'center',
          key: 'orderNum',
          sortable: true
        }, {
          title: '成交金额',
          align: 'center',
          key: 'totalPrice',
          sortable: true
        }, {
          title: '操作',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$emitBus('staffChange', row.name)
                    this.detailVisible = true
                  }
                }
              }, '详情')
            ])
          }
        }]
      },
      dateRange: [],
      pickerOptions: {
        shortcuts: getDatePickerShortcuts([7, 30, 90])
      },
      paramType: '',
      paramContent: '',
      departmentVisible: false,
      detailVisible: false
    }
  },
  created() {
    this.$watch('dateRange', watchDateRangeToTimestamp(this.params, 'beginTime', 'endTime'))
    this.$onBus('departmentId', target => {
      this.params.departmentId = target
      this.search()
    })
  },
  methods: {
    getApi() {
      return staffOrderApi
    },
    // search() {
    //   this.table.selection = []
    //   // 切换筛选条件时，默认获取第一页
    //   this.params.pageNum = 1
    //   this.listAndDetail(0)
    // },
    selectDepartment() {
      this.departmentVisible = true
    }
  }
}
</script>
