<template>
  <div>
    <Form inline class="cf">
      <FormItem>
        <i-input v-model="query.nameOrPhone" class="w200" type="text" placeholder="代理商名称／联系号码"></i-input>
      </FormItem>
      <div class="fr">
        <FormItem>
          <Button type="primary" @click="handlerSearch">查询</Button>
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

    <vma-panel v-model="showDetailVisible" title="详情">
      <agent-detail v-if="showDetailVisible" :id="showDetailId"></agent-detail>
    </vma-panel>
  </div>
</template>

<script>
import { tableMixin } from '@/mixins'
import { fmt } from '@/utils'
import { getSubAgentList } from '../src/typeApi'
import agentDetail from '@/components/packages/agentDetail'
export default {
  props: {
    id: '',
    getSubAgentList: {
      type: Function,
      require: true
    }
  },
  data () {
    return {
      query: {
        nameOrPhone: '',
        parentId: ''
      },
      columns: [
        { key: 'enterpriseNo', title: '编号', width: 80 },
        { key: 'name', title: '代理商名称' },
        { key: '',
          title: 'LOGO',
          render: (h, params) => {
            return (<img src={params.row.headIcon} width="60px" height="60px" />)
          }
        },
        { key: 'phone', title: '联系电话' },
        { key: 'createTime',
          title: '创建时间',
          render: (h, params) => {
            return (<span>{ fmt.date(params.row.createTime) }</span>)
          }
        },
        { key: 'moneySum', title: '累计迹点' },
        { key: 'moneyLeave', title: '剩余迹点' },
        { title: '操作',
          render: (h, params) => {
            return (<span class="text-link" on-click={() => { this.handerShowDetail(params.row.id) }}>查看</span>)
          }
        }
      ],
      showDetailVisible: false,
      showDetailId: ''
    }
  },
  components: {
    agentDetail
  },
  mixins: [tableMixin],
  watch: {
    id: {
      handler(n) {
        this.query.parentId = n
        this.loadList()
      },
      immediate: true
    }
  },
  methods: {
    loadList () {
      if (!this.id) { return }
      let query = this.assignQuery(this.query)
      getSubAgentList().call(this, query).then(data => {
        this.tableData = data.dataList
        this.pageItemTotal = data.totalNum
      })
    },
    refresh () {
      this.loadList()
    },
    handlerSearch () {
      this.onSearch()
    },
    handerShowDetail(id) {
      this.showDetailVisible = true
      this.showDetailId = id
    }
  },
  created () {

  }
}
</script>

<style>

</style>
