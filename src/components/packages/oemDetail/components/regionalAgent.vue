<template>
  <div>
    <Form inline class="cf">
      <FormItem>
        <i-input v-model="query.nameOrPhone" class="w200" type="text" placeholder="地区代理名称／联系号码"></i-input>
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
      <regional-agent-detail v-if="showDetailVisible" :id="showDetailId"></regional-agent-detail>
    </vma-panel>
  </div>
</template>

<script>
import { fmt } from '@/utils'
import { tableMixin } from '@/mixins'
import { getRegionalAgentList } from '../src/typeApi'
import regionalAgentDetail from '@/components/packages/regionalAgentDetail'

export default {
  props: {
    id: ''
  },
  data () {
    return {
      query: {
        nameOrPhone: '',
        parentId: ''
      },
      columns: [
        { key: 'enterpriseNo', title: '编号', width: 110 },
        { key: 'name', title: '地区总代理名称' },
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
            return (<span>{fmt.date(params.row.createTime)}</span>)
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
  mixins: [tableMixin],
  components: {
    regionalAgentDetail
  },
  watch: {
    id: {
      handler (n) {
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
      getRegionalAgentList().call(this, query).then(data => {
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
    console.log(this)
  }
}
</script>

<style>

</style>
