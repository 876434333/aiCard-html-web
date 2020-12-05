<template>
  <div>
    <Form class="panel-form mb-20"
          inline>
      <FormItem>
        <i-input type="text"
                 v-model="params.offerName"
                 placeholder="商品名"></i-input>
      </FormItem>
      <div class="fr">
        <FormItem>
          <Button type="primary"
                  @click="search">查询</Button>
          <Button type="primary"
                  @click="handlerAdd">添加</Button>
        </FormItem>
      </div>
    </Form>
    <Table :columns="table.columns"
           :data="table.list"
           ref="table"
           @on-select="selectRow" />
    <div style="margin-top:20px">
      <Button @click="handlerMoreGrounding">批量上架</Button>
    </div>
    <vma-pagination :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :total="page.totalNum"
                    @change="list" />
    <!-- 查看详情 -->
    <vma-panel v-model="editVisible"
               title="详情"
               :showClose="false">
      <edit v-model="editVisible"
            :editId="id"
            @after-save="refresh"
            @after-cancel="cancel"></edit>
    </vma-panel>
  </div>
</template>

<script>
import edit from '../components/edit'
import { indexMixin } from '@/mixins'
import Digit from '../../home/components/digit'
import { storeOfferApi } from '@/api/ems'

export default {
  mixins: [indexMixin],
  props: {
    offerType: {
      type: String,
      default: '1'
    }
  },
  components: {
    Digit,
    edit
  },
  data() {
    return {
      params: {
        type: 0,
        offerName: ''
      },
      table: {
        columns: [{
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '商品图片',
          key: 'normsPic',
          align: 'center',
          width: 100,
          render: (h, { row, column, index }) => {
            return (<div class='img-space-del-table'><img src={row.normsPic} width="40px" height="40px" /></div>)
          }
        }, {
          title: '商品名称',
          align: 'center',
          key: 'offerName',
          width: 120
        }, {
          title: '商品单价',
          align: 'center',
          key: 'offerPrice'
        }, {
          title: '销量',
          align: 'center',
          key: 'offerSale'
        }, {
          title: '库存',
          align: 'center',
          key: 'offerLeave'
        }, {
          title: '提成方式',
          align: 'center',
          key: 'extractType',
          value: row => {
            return `${['百分比', '固定提成'][row.extractType]}`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '佣金提成',
          align: 'center',
          value: row => {
            return row.extractType === 0 ? `${row.extractPer}%` : `￥${row.extractValue}`
          },
          render: (h, {row, column, index}) => {
            return h('span', column.value(row))
          }
        }, {
          title: '修改时间',
          align: 'center',
          key: 'createTime',
          width: 155,
          value: row => {
            return `${this.fmt.date(row.createTime)}`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '上架时间',
          align: 'center',
          key: 'onsaleTime',
          width: 155,
          value: row => {
            return row.onsaleTime === null ? `` : `${this.fmt.date(row.onsaleTime)}`
          },
          render: (h, { row, column, index }) => {
            return h('span', column.value(row))
          }
        }, {
          title: '操作',
          align: 'center',
          width: 180,
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
                    this.handlerGrounding(row.id)
                  }
                }
              }, '上架'),
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
                    this.editVisible = true
                    this.id = row.id
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '<p>确认删除该商品？</p>',
                      onOk: () => {
                        storeOfferApi.deleteStore(row.id).then(() => {
                          this.success('删除成功！')
                          this.listAndDetail(this.params.pageNum)
                          this.idList = []
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
      idList: [],
      // 添加编辑
      editVisible: false,
      id: ''
    }
  },
  computed: {
  },
  mounted() {
  },
  watch: {
  },
  created() {
    this.$onBus('offerDownedListChange', target => {
      this.listAndDetail(0)
    })
  },
  methods: {
    getApi() {
      return storeOfferApi
    },
    // search() {
    //   this.table.selection = []
    //   // 切换筛选条件时，默认获取第一页
    //   this.params.pageNum = 1
    //   this.listAndDetail(0)
    // },
    handlerAdd() {
      this.editVisible = true
    },
    handlerGrounding(params) {
      this.idList.push(params)
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确认上架该商品？</p>',
        onOk: () => {
          storeOfferApi.HandlerGrounding(this.idList).then(() => {
            this.success('上架成功！')
            this.$emitBus('offerUpListChange', 'offerUpListChange')
            this.listAndDetail(this.params.pageNum)
            this.idList = []
          })
        },
        onCancel: () => { }
      })
    },
    refresh() {
      this.id = ''
      this.listAndDetail(0)
    },
    cancel() {
      this.id = ''
    },
    selectRow(selection, row) {
      this.idList.push(row.id)
    },
    handlerMoreGrounding() {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确认上架这些商品？</p>',
        onOk: () => {
          storeOfferApi.HandlerGrounding(this.idList).then(() => {
            this.success('上架成功！')
            this.$emitBus('offerUpListChange', 'offerUpListChange')
            this.listAndDetail(this.params.pageNum)
            this.idList = []
          })
        },
        onCancel: () => { }
      })
    }
  }
}
</script>

<style scoped>
</style>
