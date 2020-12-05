<template>
  <div>
    <Form inline class="cf">
      <div class="fr">
        <FormItem>
          <DatePicker type="daterange"
                      v-model="dateRange"
                      :options="pickerOptions"
                      placement="bottom-end"
                      format="yyyy-MM-dd"
                      placeholder="请选择结束时间"
                      style="width: 160px"
                      @on-change="delaySearch" />
        </FormItem>
      </div>
    </Form>

    <Table class="table"
            :columns="columns"
            :data="tableData" ></Table>
    <Page class="pagination"
            simple show-sizer
            :total="pageItemTotal"
            :current="currentPage"
            @on-change="onPageChange" />
  </div>
</template>

<script>
import pointApi from '@/api/common/pointApi'
import { tableMixin } from '@/mixins'
import { watchDateRangeToTimestamp, fmt } from '@/utils'

export default {
  props: {
    id: ''
  },
  data () {
    return {
      query: {
        createTimeStart: '',
        createTimeEnd: '',
        enterpriseId: '',
        operation: ''
      },
      columns: [
        { key: 'createTime',
          title: '时间',
          width: 160,
          render: (h, params) => {
            return (<span>{fmt.date(params.row.createTime)}</span>)
          }
        },
        { key: 'content', title: '事项' },
        { key: 'operationPoint',
          title: '迹点',
          render: (h, params) => {
            return <span>{params.row.operation === '1' ? `+${params.row.operationPoint}` : `-${params.row.operationPoint}` }</span>
          }
        },
        { key: 'remainPoint', title: '剩余迹点' }
      ],
      dateRange: [],
      pickerOptions: {
        shortcuts: [{
          text: '近7天',
          value() {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          }
        }, {
          text: '近30天',
          value() {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          }
        }, {
          text: '近90天',
          value() {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          }
        }]
      }
    }
  },
  mixins: [tableMixin],
  watch: {
    id: {
      handler (n) {
        this.query.enterpriseId = n
        this.loadList()
      },
      immediate: true
    }
  },
  methods: {
    loadList () {
      if (!this.id) { return }
      let query = this.assignQuery(this.query)
      pointApi.getPointList(query).then(data => {
        this.tableData = data.dataList
        this.pageItemTotal = data.totalNum
      })
    },
    refresh () {
      this.loadList()
    },
    delaySearch () {
      setTimeout(() => {
        this.onSearch()
      }, 0)
    }
  },
  created () {
    this.$watch('dateRange', watchDateRangeToTimestamp(this.query, 'createTimeStart', 'createTimeEnd', 'yyyy-MM-dd'))
  }
}
</script>

<style>

</style>
