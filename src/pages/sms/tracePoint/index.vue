<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <digit />
      </div>
    </div>

    <div class="panel">
      <div class="panel-body">
        <Form class="panel-form mb-20"
              inline
              :label-width="60">
          <div class="fr">
            <FormItem>
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
          <FormItem label="分配状态"
                    :label-width="60">
            <RadioGroup class="home-radio"
                        v-model="params.operation"
                        @on-change="search"
                        type="button">
              <Radio label="">全部</Radio>
              <Radio label="1">增加</Radio>
              <Radio label="2">扣减</Radio>
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
    <vma-panel v-model="oemDetail.show"
               title="贴牌商详情">
      <oem-detail :id="oemDetail.id"
                  v-if="oemDetail.show" />
    </vma-panel>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import Digit from '../home/components/digit'
import { watchDateRangeToTimestamp, getDatePickerShortcuts } from '@/utils'
import { pointApi } from '@/api/sms'
import OemDetail from '@/components/packages/oemDetail'

export default {
  mixins: [indexMixin],
  components: {
    Digit,
    OemDetail
  },
  data() {
    return {
      params: {
        createTimeStart: '',
        createTimeEnd: '',
        operation: ''
      },
      table: {
        columns: [{
          title: '贴牌商名称',
          key: 'customName',
          render: (h, { row }) => {
            return h('a', {
              on: {
                click: () => {
                  this.showOemDetail(row.customId)
                }
              }
            }, row.customName)
          }
        }, {
          title: '贴牌商编号',
          key: 'customCode'
        }, {
          title: '联系电话',
          key: 'phone'
        }, {
          title: '事项',
          key: 'content'
        }, {
          title: '迹点',
          key: 'operationPoint',
          value: row => {
            return `${['', '+', '-'][row.operation]}${row.operationPoint}点`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '剩余迹点',
          key: 'remainPoint',
          value: row => {
            return `${row.remainPoint}点`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '操作时间',
          key: 'createTime',
          value: row => {
            return `${this.fmt.date(row.createTime)}`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }]
      },
      dateRange: [],
      pickerOptions: {
        shortcuts: getDatePickerShortcuts([7, 30, 90])
      },
      oemDetail: {
        show: false,
        id: ''
      }
    }
  },
  created() {
    this.$watch('dateRange', watchDateRangeToTimestamp(this.params, 'createTimeStart', 'createTimeEnd'))
  },
  methods: {
    getApi() {
      return pointApi
    },
    showOemDetail(id) {
      this.oemDetail.id = id
      this.oemDetail.show = true
    }
  }
}
</script>
