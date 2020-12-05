<template>
  <div>
    <div class="panel store-order">
      <div class="panel-body">
        <Form class="panel-form"
              inline
              :label-width="100">
          <Row>
            <i-col span="12">
              <FormItem :label-width="24">
                <Select v-model="paramType"
                        style="width:120px">
                  <Option value="orderNbr">订单编号</Option>
                  <Option value="linkMan">收货人姓名</Option>
                  <Option value="linkPhone">收货人手机</Option>
                </Select>
              </FormItem>
              <FormItem :label-width="1">
                <i-input type="text"
                         v-model="paramContent"
                         @on-change='selectParamType'
                         clearable
                         style="width:172px"
                         placeholder="请输入内容"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="下单时间"
                        :label-width="100">
                <DatePicker type="daterange"
                            v-model="createDateRange"
                            :options="pickerOptions"
                            placement="bottom-end"
                            format="yyyy-MM-dd"
                            placeholder="请选择日期范围"
                            style="width:300px"
                            @on-change="delaySearch" />
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <FormItem label="商品名称">
                <i-input type="text"
                         v-model="params.offerName"
                         style="width:231px"
                         @on-change='search'
                         clearable
                         placeholder="商品名称"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="完成时间"
                        :label-width="100">
                <DatePicker type="daterange"
                            v-model="finishedDateRange"
                            :options="pickerOptions"
                            placement="bottom-end"
                            format="yyyy-MM-dd"
                            placeholder="请选择日期范围"
                            style="width: 300px"
                            @on-change="delaySearch" />
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <FormItem :label-width="1">
                <Button type="primary"
                        @click.native="search">查询</Button>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <Form class="panel-form mb-20"
              inline>
          <FormItem>
            <RadioGroup class="home-radio"
                        v-model="params.status"
                        @on-change="search"
                        type="button">
              <Radio label="">全部订单({{ page.totalNum }})</Radio>
              <Radio label="0">未支付</Radio>
              <Radio label="1">已支付</Radio>
              <Radio label="2">已关闭</Radio>
              <Radio label="3">超时取消</Radio>
              <Radio label="5">已发货</Radio>
              <Radio label="6">完成</Radio>
            </RadioGroup>
          </FormItem>
        </Form>

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
    <Modal v-model="detailVisible"
           title="订单信息"
           :width='800'
           footer-hide>
      <detail v-model="detailVisible"
              :orderDetail="detail"></detail>
    </Modal>
  </div>
</template>

<script>
import detail from './detail'
import { indexMixin } from '@/mixins'
import Digit from '../../home/components/digit'
import { watchDateRangeToTimestamp, getDatePickerShortcuts } from '@/utils'
import { storeOrderApi } from '@/api/ems'

export default {
  props: {
    value: false
  },
  mixins: [indexMixin],
  components: {
    indexMixin,
    Digit,
    storeOrderApi,
    detail
  },
  data() {
    return {
      params: {
        status: '',
        createTimeBegin: '',
        createTimeEnd: '',
        finishedTimeBegin: '',
        finishedTimeEnd: '',
        linkMan: '',
        linkPhone: '',
        offerName: '',
        orderNbr: '',
        staffName: ''
      },
      table: {
        columns: [ {
          title: '商品名称',
          align: 'center',
          key: 'orderNbr'
        }, {
          title: '总价',
          align: 'center',
          key: 'totalPrice',
          render: (h, { row, column, index }) => {
            return h('span', (row.totalPrice ? ' ￥ ' + row.totalPrice : ' ￥ ' + 0))
          }
        }, {
          title: '应付',
          align: 'center',
          key: 'totalPriceDiscount',
          render: (h, { row, column, index }) => {
            return h('span', (row.totalPriceDiscount ? ' ￥ ' + row.totalPriceDiscount : ' ￥ ' + 0))
          }
        }, {
          title: '优惠',
          align: 'center',
          key: 'priceDiscount',
          render: (h, { row, column, index }) => {
            return h('span', (row.priceDiscount ? '- ￥ ' + row.priceDiscount : ' ￥ ' + 0))
          }
        }, {
          title: '业务员',
          align: 'center',
          key: 'staffName'
        }, {
          title: '佣金',
          align: 'center',
          key: 'extractValue',
          render: (h, { row, column, index }) => {
            return h('span', (row.extractValue ? ' ￥ ' + row.extractValue : ' ￥ ' + 0))
          }
        }, {
          title: '配送费',
          align: 'center',
          key: 'expressFee',
          render: (h, { row, column, index }) => {
            return h('span', (row.expressFee ? ' ￥ ' + row.expressFee : '-'))
          }
        }, {
          title: '收货人',
          align: 'center',
          render: (h, { row, column, index }) => {
            return (
              <div>
                <span>{row.linkMan}</span>
                <br />
                <span>{row.linkPhone}</span>
              </div>
            )
          }
        }, {
          title: '状态',
          align: 'center',
          key: 'status',
          value: row => {
            switch (row.status) {
              case 0: {
                return '未支付'
              }
              case 1: {
                return '已支付'
              }
              case 2: {
                return '已关闭'
              }
              case 3: {
                return '超时取消'
              }
              case 4: {
                return '未发货'
              }
              case 5: {
                return '已发货'
              }
              case 6: {
                return '完成'
              }
            }
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '操作',
          align: 'center',
          width: 160,
          render: (h, params) => {
            let dom = null
            if (params.row.status === 1 || params.row.status === 4) {
              dom = (<div><i-button type="primary" style="margin-right:5px" on-click={() => { this.detailOne(params.row) }}>{this.message}查看</i-button>
                <i-button on-click={() => { this.editStatus(params.row.id) }}>{this.message}发货</i-button></div>)
            } else {
              dom = (<div><i-button type="primary" on-click={() => { this.detailOne(params.row) }}>{this.message}查看</i-button></div>)
            }
            return dom
          }
        }]
      },
      createDateRange: [],
      finishedDateRange: [],
      pickerOptions: {
        shortcuts: getDatePickerShortcuts([7, 30, 90])
      },
      paramType: '',
      paramContent: '',
      // 查看详情
      detailVisible: false,
      detail: {}
    }
  },
  created() {
    this.$watch('createDateRange', watchDateRangeToTimestamp(this.params, 'createTimeBegin', 'createTimeEnd'))
    this.$watch('finishedDateRange', watchDateRangeToTimestamp(this.params, 'finishedTimeBegin', 'finishedTimeEnd'))
    this.$onBus('staffChange', target => {
      this.params.staffName = target
      this.search()
    })
  },
  methods: {
    getApi() {
      return storeOrderApi
    },
    selectParamType() {
      switch (this.paramType) {
        case 'orderNbr': {
          this.params.orderNbr = this.paramContent
          this.params.linkMan = ''
          this.params.linkPhone = ''
          break
        }
        case 'linkMan': {
          this.params.linkMan = this.paramContent
          this.params.orderNbr = ''
          this.params.linkPhone = ''
          break
        }
        case 'linkPhone': {
          this.params.linkPhone = this.paramContent
          this.params.orderNbr = ''
          this.params.linkMan = ''
          break
        }
      }
      this.search()
    },
    detailOne(row) {
      this.detail = row
      this.detailVisible = true
    },
    editStatus(id) {
      storeOrderApi.updateStatus(id).then(() => {
        this.success('发货成功！')
        this.listAndDetail(this.params.pageNum)
      })
    }
  }
}
</script>
