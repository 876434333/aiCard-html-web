<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <div class="home-todo-list">
          <div class="home-todo-item">
            <p>{{ (number.moneyInit || 0) | numberLabel }}</p>
            <p>初始迹点数</p>
          </div>
          <div class="home-todo-item">
            <p>{{ (number.moneySum || 0) | numberLabel }}</p>
            <p>累积迹点数</p>
          </div>
          <div class="home-todo-item">
            <p>{{ (number.moneyLeave || 0) | numberLabel }}</p>
            <p>剩余迹点数</p>
          </div>
        </div>
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
                          transfer
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

  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import { watchDateRangeToTimestamp, getDatePickerShortcuts } from '@/utils'
import { getPointApi } from './src/api'

export default {
  mixins: [indexMixin],
  data() {
    let pointApi = getPointApi()
    return {
      params: {
        createTimeStart: '',
        createTimeEnd: '',
        operation: ''
      },
      table: {
        columns: [{
          title: '操作时间',
          key: 'createTime',
          value: row => {
            return `${this.fmt.date(row.createTime)}`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
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
        }]
      },
      dateRange: [],
      pickerOptions: {
        shortcuts: getDatePickerShortcuts([7, 30, 90])
      },
      number: {
        moneyInit: 0,
        moneySum: 0,
        moneyLeave: 0
      },
      pointApi
    }
  },
  created() {
    this.$watch('dateRange', watchDateRangeToTimestamp(this.params, 'createTimeStart', 'createTimeEnd'))

    this.pointApi.getpointDetail().then(data => {
      this.number = data
    })
  },
  methods: {
    getApi() {
      return this.pointApi
    }
  }
}
</script>
