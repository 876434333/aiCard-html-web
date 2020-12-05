<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Form class="panel-form mb-20"
              inline
              :label-width="60">
          <FormItem label="类别"
                    :label-width="60">
            <RadioGroup class="home-radio"
                        v-model="params.type"
                        @on-change="search"
                        type="button">
              <Radio label="">全部</Radio>
              <Radio label="1">免费试用</Radio>
              <Radio label="2">申请合作</Radio>
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
import Digit from '../home/components/digit'
import { webApplyApi } from '@/api/sms'

export default {
  mixins: [indexMixin],
  components: {
    Digit
  },
  data() {
    return {
      params: {
        type: ''
      },
      table: {
        columns: [{
          title: '申请人昵称',
          key: 'name'
        }, {
          title: '手机号',
          key: 'mobile'
        }, {
          title: '公司名',
          key: 'companyName'
        }, {
          title: '事项',
          key: 'applyType',
          value: row => {
            return `${['', '免费试用', '合作申请'][row.applyType]}`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '申请时间',
          key: 'createTime',
          value: row => {
            return `${this.fmt.date(row.createTime)}`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '备注',
          key: 'remarks'
        }]
      },
      dateRange: []
    }
  },
  methods: {
    getApi() {
      return webApplyApi
    }
  }
}
</script>
