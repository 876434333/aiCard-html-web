<template>
  <div class="divide"
        :class="{full: fullScreen}">
    <div class="divide-item">
      <div class="panel">
        <!-- 上方,搜索 -->
        <div class="panel-body"
              style="overflow: hidden;">
          <Form class="panel-form"
                inline>
            <div class="fr">
              <FormItem>
                <i-input type="text"
                       placeholder="模板名称"
                       v-model.trim="params.templateName"
                       @keyup.enter="search">
                  <Icon type="search"
                        slot="prepend"></Icon>
                </i-input>
              </FormItem>
              <FormItem :label-width="1">
                <Button type="primary"
                        @click="search">查询</Button>
              </FormItem>
            </div>
          </Form>
        </div>
      </div>
    </div>
    <div class="pannel">
      <div class="pannel-body">
        <Table :columns="table.columns"
               :data="table.list"
               ref="table"
               @on-selection-change="handleTableSelection"
               stripe />
        <div class="page-wrapper">
        <Page :current="params.pageNum"
              :pageSize="params.pageSize"
              :total="page.totalNum"
              @on-change="list"
              @on-page-size-change="onPageSizeChange"
              show-sizer
              show-elevator
              style="float:right;margin:15px 0;"
              v-if="table.list.length > 0" />
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <mod-form v-if="form.show"
              :data="form.entity"
              @after-submit="afterSubmit"
              @on-cancel="closeForm"></mod-form>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import templateApi from '@/api/sms/template'
import ModForm from './components/form/edit'
import { watchDateRangeToTimestamp } from '@/utils'

export default {
  mixins: [indexMixin],
  components: {
    ModForm
  },
  data() {
    let that = this
    return {
      statusMap: {0: '已部署', 1: '待部署'},
      fullScreen: false,
      params: {},
      dateRange: '',
      table: {
        columns: [{
          title: '编号',
          key: 'code',
          render: (h, { row }) => {
            return h('span', row.id)
          }
        }, {
          title: '模板名称',
          key: 'templateName',
          render: (h, { row }) => {
            return h('span', row.templateName)
          }
        }, {
          title: '企业数',
          key: 'enterpriseNum',
          width: 200,
          render: (h, { row, column, index }) => {
            return h('span', row.enterpriseNum)
          }
        }, {
          title: '小程序费用',
          key: 'smallCost',
          width: 200,
          render: (h, { row, column, index }) => {
            return h('span', row.smallCost + '迹点')
          }
        }, {
          title: '名片费用',
          key: 'cardCost',
          width: 200,
          render: (h, { row, column, index }) => {
            return h('span', row.cardCost + '迹点/张')
          }
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          render(h, { row }) {
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
                    that.showForm(row.id)
                  }
                }
              }, '编辑')
            ])
          }
        }],
        list: [],
        selection: []
      }
    }
  },
  created() {
    this.$watch('dateRange', watchDateRangeToTimestamp(this.params, 'createTimeBegin', 'createTimeEnd'))
  },
  methods: {
    getApi() {
      return templateApi
    },
    /**
     * 显示详情,不显示详情
     * @param {any} entity
     */
    showDetail() {
    },
    search() {
      this.table.selection = []
      // 切换筛选条件时，默认获取第一页
      this.params.pageNum = 1
      this.listAndDetail(0)
    },
    // 更改每页数量
    onPageSizeChange(pz) {
      this.params.pageSize = pz
      this.listAndDetail()
    },
    toggleFullScreen(val) {
      this.fullScreen = val
    },
    closeForm() {
      this.form.show = false
      this.form.entity.id = ''
    },
    afterSubmit() {
      this.closeForm()
      this.listAndDetail()
    }
  }
}
</script>
