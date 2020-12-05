<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <Form class="panel-form"
              inline>
          <FormItem>
            <i-input type="text" v-model="query.loginName" placeholder="账号/姓名"></i-input>
          </FormItem>
          <div class="fr">
            <FormItem>
              <Button type="primary" @click="handlerSearch">查询</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <div class="mb10">
          <Button type="primary" @click="handlerAdd">添加</Button>
        </div>
        <Table class="table"
            :columns="columns"
            :data="tableData" ></Table>
        <Page class="pagination"
                show-sizer
                :total="pageItemTotal"
                :current="currentPage"
                @on-change="onPageChange" />
      </div>
    </div>

    <!-- 查看详情 -->
    <detail v-model="detailVisible" :id="detailId"></detail>
    <!-- 编辑 -->
    <edit v-model="editVisible" :id="editId" @after-save="loadList"></edit>
    <!-- 分配权限 -->
    <grant v-model="addGrantVisible" :id="addGrantId"></grant>
  </div>
</template>

<script>
import detail from './components/detail'
import edit from './components/edit'
import grant from './components/grant'
import { staffApi } from '@/api/common'
import { tableMixin } from '@/mixins'
import { fmt } from '@/utils'
import { STATUS } from './src/const'

export default {
  data() {
    return {
      query: {
        'customId': '',
        'loginName': ''
      },
      columns: [
        { key: 'login', title: '员工账号' },
        { key: 'name', title: '姓名' },
        { key: 'createTime',
          title: '添加时间',
          render: (h, params) => {
            return (<span>{ fmt.date(params.row.createTime) }</span>)
          }
        },
        { key: 'loginTime',
          title: '最后登录',
          render: (h, params) => {
            return (<span>{ fmt.date(params.row.loginTime) }</span>)
          }
        },
        { key: 'status',
          title: '是否启用',
          render: (h, params) => {
            return (<span>{ STATUS[params.row.status] }</span>)
          }
        },
        { title: '操作',
          render: (h, params) => {
            let dom = null
            if (params.row.role === '1') {
              dom = (<div>
                <span class="text-link mr10" on-click={ () => { this.handlerDetail(params.row.id) } }>查看</span>
              </div>)
            } else {
              dom = (<div>
                <span class="text-link mr10" on-click={ () => { this.handlerAddGrant(params.row.id) } }>权限设置</span>
                <span class="text-link mr10" on-click={ () => { this.handlerDetail(params.row.id) } }>查看</span>
                <span class="text-link mr10" on-click={ () => { this.handlerEdit(params.row.id) } }>编辑</span>
                <span class="text-link mr10" on-click={ () => { this.handlerDelete(params.row.id) } }>删除</span>
              </div>)
            }
            return dom
          }
        }
      ],
      // 设置权限
      addGrantVisible: false,
      addGrantId: '',
      // 查看详情
      detailVisible: false,
      detailId: '',
      // 编辑
      editVisible: false,
      editId: ''

    }
  },
  components: {
    detail,
    edit,
    grant
  },
  mixins: [tableMixin],
  methods: {
    loadList () {
      let query = this.assignQuery(this.query)
      staffApi.getStaffList(query).then(data => {
        this.tableData = data.dataList
        this.pageItemTotal = data.totalNum
      })
    },
    handlerSearch () {
      this.onSearch()
    },
    handlerAdd () {
      this.editVisible = true
      this.editId = ''
    },
    handlerAddGrant (id) {
      this.addGrantVisible = true
      this.addGrantId = id
    },
    handlerDetail (id) {
      this.detailVisible = true
      this.detailId = id
    },
    handlerEdit (id) {
      this.editVisible = true
      this.editId = id
    },
    handlerDelete (id) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>删除后不可恢复，确认删除！</p>',
        onOk: () => {
          staffApi.deleteStaff(id).then(() => {
            if (this.tableData.length === 1 && this.pageNum > 1) {
              --this.pageNum
            }
            this.loadList()
            this.success('删除成功！')
          })
        },
        onCancel: () => {}
      })
    }
  },
  created () {
    this.loadList()
  }
}
</script>
