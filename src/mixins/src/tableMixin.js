const table = {
  data() {
    return {
      tableData: [],
      tableSelectList: [],
      pageNum: 1, // 页码
      pageSize: 10, // 每页数量
      pageItemTotal: 0
    }
  },
  watch: {},
  computed: {
    hasSelect() {
      return !!this.tableData.length
    },
    tableSelectListLength() {
      return this.tableSelectList.length
    },
    currentPage() {
      return this.pageNum
    }
  },
  methods: {
    loadList() {
      this.$Message.info('请在页面实例重写loadList')
    },
    onSearch() {
      this.tableSelectList = []
      this.pageNum = 1
      this.loadList()
    },
    initialTableData(total, list) {
      this.pageItemTotal = total
      this.tableData = list
    },
    // 表单重置
    onReset() {
      if (this.$refs.searchForm) {
        this.$refs.searchForm.resetFields()
        this.onRangeChange([])
      }
    },
    onSelectionChange(selection) {
      this.tableSelectList = Object.freeze(selection)
    },
    onPageChange(p) {
      this.pageNum = p
      this.loadList()
    },
    onPageSizeChange(pz) {
      this.pageSize = pz
      this.onSearch()
    },
    assignQuery(query) {
      return { pageNum: this.pageNum, pageSize: this.pageSize, ...query }
    }
  }
}

export default table
