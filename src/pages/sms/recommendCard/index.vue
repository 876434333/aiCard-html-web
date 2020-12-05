<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <div class="mb10">
          <Button type="primary" @click="handlerAdd" @after-save="loadList">新增</Button>
        </div>
        <Table class="table"
            stripe
            :columns="columns"
            :data="tableData" ></Table>
        <!-- 分页 -->
        <!-- <Page class="pagination"
                show-sizer
                :total="pageItemTotal"
                :current="currentPage"
                @on-change="onPageChange" /> -->
      </div>
    </div>
    <!-- 新增 -->
    <add  v-model="addVisible" @listenModalIsClose="refreshData" ref="refresh"></add>
  </div>
</template>

<script>
import { recommendCardApi } from '@/api/sms'
import { tableMixin } from '@/mixins'
import add from './components/add'
export default {
  data() {
    return {
      columns: [
        {type: 'index', key: 'index', title: '序号', width: 100},
        {
          key: 'headIcon',
          title: '头像',
          align: 'center',
          width: 100,
          render: (h, { row, column, index }) => {
            return (<div class='img-space-del-table'><img src={row.headIcon} width="40px" height="40px" /></div>)
          }
        },
        { key: 'name', title: '名片名' },
        { key: 'enterpriseName', title: '所属组织' },
        { key: 'createTime', title: '注册日期' },
        { key: 'viewNum', title: '查看次数' },
        { title: '操作',
          render: (h, params) => {
            let dom = null
            dom = (<div>
              <span class="text-link mr10" on-click={ () => { this.handlerDelete(params.row.recommendId) } }>删除</span>
            </div>)
            return dom
          }
        }
      ],
      // 新增
      addVisible: false
    }
  },
  mixins: [tableMixin],
  components: {
    add
  },
  methods: {
    loadList () {
      recommendCardApi.getRecommendCardList().then(data => {
        console.log('getRecommendCardList', data)
        this.tableData = data
        // this.pageItemTotal = data.totalNum
      })
    },
    // 点击新增
    handlerAdd () {
      this.addVisible = true
      let params = {
        phone: '',
        enterpriseName: ''
      }
      this.$refs.refresh.getStaff(params)
    },
    // 点击删除
    handlerDelete (recommendId) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>删除后不可恢复，确认删除！</p>',
        onOk: () => {
          recommendCardApi.deleteRecommendCard(recommendId).then(() => {
            this.loadList()
            this.success('删除成功！')
          })
        },
        onCancel: () => {}
      })
    },
    refreshData (data) {
      // 刷新数据
      if (data === 'true') {
        this.loadList()
      }
    }
  },
  created () {
    this.loadList()
  }
}
</script>
