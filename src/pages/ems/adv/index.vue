<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Form class="panel-form"
              inline>
          <FormItem>
            <i-input type="text"
                     v-model="params.title"
                     placeholder="广告名称"></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="search">查询</Button>
          </FormItem>
          <div class="fr">
            <FormItem label="到期时间"
                      :label-width="100">
              <DatePicker type="daterange"
                          v-model="finishedDateRange"
                          :options="pickerOptions"
                          placement="bottom-end"
                          format="yyyy-MM-dd"
                          placeholder="请选择日期范围"
                          style="width: 240px"
                          @on-change="delaySearch" />
            </FormItem>
            <FormItem>
              <Button type="primary"
                      @click="handlerAdd">添加</Button>
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
    <edit v-model="detailVisible"
          :id="id"
          :total_num="page.totalNum"
          @after-save="loadList"></edit>
  </div>
</template>

<script>

import { editOrder } from './src/funcs.js'
import edit from './components/edit'
import { indexMixin } from '@/mixins'
import Digit from '../home/components/digit'
import { watchDateRangeToTimestamp, getDatePickerShortcuts } from '@/utils'
import { advApi } from '@/api/ems'

export default {
  mixins: [indexMixin],
  components: {
    Digit,
    edit
  },
  data() {
    return {
      params: {
        title: '',
        finishBeginTime: '',
        finishEndTime: ''
      },
      table: {
        columns: [{
          title: '广告名称',
          key: 'title',
          align: 'center'
        }, {
          title: '广告图片',
          align: 'center',
          render: (h, { row, column, index }) => {
            return (<div class='img-space-del-table'><img src={row.imgUrl} width="60px" height="60px" /></div>)
          }
        }, {
          title: '开始时间',
          key: 'beginTime',
          align: 'center',
          render: (h, { row, column, index }) => {
            return (
              <div>
                <span>{this.fmt.date(row.beginTime)}</span>
              </div>)
          }
        }, {
          title: '到期时间',
          key: 'finishTime',
          align: 'center',
          render: (h, { row, column, index }) => {
            return (
              <div>
                <span>{this.fmt.date(row.finishTime)}</span>
              </div>)
          }
        }, {
          title: '上线/下线',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('i-switch', {
              props: {
                type: 'primary',
                value: row.status === 1
              },
              style: {
                marginRight: '5px'
              },
              on: {
                'on-change': (value) => {
                  if (row.status === 1) {
                    row.status = 0
                  } else {
                    row.status = 1
                  }
                  advApi.updateAdv({
                    id: row.id,
                    status: row.status
                  })
                  this.listAndDetail(this.params.pageNum)
                }
              }
            })
          }
        }, {
          title: '排序',
          key: 'aOrder',
          align: 'center',
          render: (h, { row, column, index }) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '10px',
                    display: 'inline-block'
                  },
                  attrs: {
                    title: row.aOrder,
                    id: 'span' + row.id
                  }
                },
                row.aOrder
              ),
              h(
                'Input',
                {
                  props: {
                    value: row.aOrder,
                    ref: row.id
                  },
                  style: {
                    display: 'none',
                    width: '60px'
                  },
                  attrs: {
                    id: 'input' + row.id
                  }
                }
              ),
              h('Button', {
                props: {
                  type: 'text',
                  icon: 'ios-redo'
                },
                style: {
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    editOrder(row.id)
                  }
                }
              })
            ])
          }
        }, {
          title: '操作',
          width: 200,
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
                    this.detailVisible = true
                    this.id = row.id
                  }
                }
              }, '编辑'),
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
                    advApi.upToOne(row.id).then(() => {
                      this.listAndDetail(this.params.pageNum)
                    })
                  }
                }
              }, '置顶'),
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
                    this.$Modal.confirm({
                      title: '提示',
                      content: '<p>删除后不可恢复，确认删除！</p>',
                      onOk: () => {
                        advApi.deleteAdv(row.id).then(() => {
                          this.success('删除成功！')
                          this.listAndDetail(0)
                        })
                      },
                      onCancel: () => { }
                    })
                  }
                }
              }, '删除')
            ])
          }
        }]
      },
      // createDateRange: [],
      finishedDateRange: [],
      pickerOptions: {
        shortcuts: getDatePickerShortcuts([7, 30, 90])
      },
      // 查看详情
      detailVisible: false,
      id: '',
      status: false
    }
  },
  created() {
    // this.$watch('createDateRange', watchDateRangeToTimestamp(this.params, 'createTimeBegin', 'createTimeEnd'))
    this.$watch('finishedDateRange', watchDateRangeToTimestamp(this.params, 'finishBeginTime', 'finishEndTime'))
  },
  methods: {
    getApi() {
      return advApi
    },
    // search() {
    //   this.table.selection = []
    //   // 切换筛选条件时，默认获取第一页
    //   this.params.pageNum = 1
    //   this.listAndDetail(0)
    // },
    handlerAdd() {
      this.detailVisible = true
      this.id = ''
    },
    loadList() {
      this.listAndDetail(0)
    }
  }
}
</script>
