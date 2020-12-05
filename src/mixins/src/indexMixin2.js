export default {
  data () {
    return {
      fullScreen: false,
      query: {
        pageNum: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
      current: {}
    }
  },
  computed: {
    currentPage () {
      return this.query.pageNum
    },
    currentId () {
      return this.current ? this.current.id : ''
    }
  },
  methods: {
    init () {
      this._loadList().then(data => {
        this.current = data.dataList && data.dataList.length ? data.dataList[0] : {}
      })
    },
    _loadList() {
      let query = Object.assign({}, this.query)
      return this.getApi().call(this, query).then(data => {
        this.list = data.dataList
        this.total = data.totalNum
        return data
      })
    },
    getApi () {
      throw new Error('请重写getApi提供api')
    },
    handlerSearch() {
      this.onPageChange(1)
    },
    onPageChange(n) {
      this.query.pageNum = n
      this.init()
    },
    handlerChangeCurrent(current) {
      this.current = current
    },
    refresh() {
      this._loadList().then(data => {
        if (data.dataList && data.dataList.length) {
          // 考虑当前选中不是第一个情况
          // 判断current是否在刷新列表后的列表中
          // 在列表中设置current，则手动刷新详情
          // 不在列表中重新设置
          for (let i = 0, l = data.dataList.length; i < l; i++) {
            if (data.dataList[i].id === this.currentId) {
              this.current = data.dataList[i]
              this.refreshDetail()
              return
            }
          }
          this.current = data.dataList[0]
        } else {
          this.current = {}
        }
      })
    },
    refreshDetail() {
      if (this.$refs.detail && typeof this.$refs.detail.refresh === 'function') {
        this.$refs.detail.refresh()
      }
    }
  }
}
