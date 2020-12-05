<template>
  <div class="divide"
        :class="{full: fullScreen}">
    <div class="divide-item">
      <div class="panel">
        <!-- 上方,搜索 -->
        <div class="panel-body">
          <Form class="panel-form"
                inline>
            <div class="fr">
              <FormItem>
                <i-input type="text"
                       placeholder="企业名称/联系号码"
                       v-model.trim="params.nameOrPhone "
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
            <FormItem>
              <DatePicker v-model="dateRange"
                          type="daterange"
                          placeholder="选择时间区间"
                          @on-change="delaySearch" ></DatePicker>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
    <div class="task">
      <!-- 左侧 -->
      <div class="task-l divide-item">
        <div class="panel">
          <div class="panel-header">
            企业列表
          </div>
          <div class="panel-body">
            <p class="nodata"
               v-show="!table.list.length">暂无数据</p>
            <ul class="list" v-if="table.list.length > 0">
              <li v-for="item in table.list"
                  :key="item.id"
                  :class="{active: detail.entity && detail.entity.id === item.id}"
                  @click="showDetail(item.id)">
                <div class="list-item">
                  <div class="list-item-ext">
                    <div class="list-item-ext-text">
                      <p>{{item.templateName}}</p>
                    </div>
                  </div>
                  <div class="list-item-main">
                    <p class="list-item-title">{{item.name}}</p>
                    <div class="list-item-info">{{item.phone}}</div>
                  </div>
                </div>
              </li>
            </ul>
            <vma-pagination  v-if="table.list.length > 0"
                             :pageNum="params.pageNum"
                             :pageSize="params.pageSize"
                             :total="page.totalNum"
                             @change="list"
                             simple />
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="task-r divide-main">
        <mod-detail @toggleFullScreen="toggleFullScreen"
                    :fullScreen="fullScreen"
                    :data="detail.entity"
                    @showForm="showForm"></mod-detail>
      </div>
    </div>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import enterpriseApi from '@/api/rams/enterprise'
import { watchDateRangeToTimestamp } from '@/utils'
import ModDetail from '@/pages/sms/enterprise/detail'

export default {
  mixins: [indexMixin],
  components: {
    ModDetail
  },
  data() {
    return {
      fullScreen: false,
      params: {},
      dateRange: ''
    }
  },
  created() {
    this.$watch('dateRange', watchDateRangeToTimestamp(this.params, 'beginTime', 'endTime'))
  },
  methods: {
    getApi() {
      return enterpriseApi
    },
    search() {
      this.table.selection = []
      // 切换筛选条件时，默认获取第一页
      this.params.pageNum = 1
      this.listAndDetail(0)
    },
    /**
     * 查询列表数据
     * @param {any} pageNum
     * @param {any} pageSize
     */
    list(pageNum, pageSize) {
      this.setPageNumSize(pageNum, pageSize)
      let params = Object.assign({}, this.params)
      if (!params['createTimeBegin']) {
        delete params['createTimeBegin']
      }
      if (!params['createTimeEnd']) {
        delete params['createTimeEnd']
      }
      if (this.beforeList(params) !== false) {
        return this.getApi().getEnterpriseList(params).then(page => {
          // 总数据不为0，当前页数据为0，往前跳一页
          if (page.totalNum > 0 && page.dataList.length === 0) {
            // 异步问题，要return
            return this.list(this.params.pageNum - 1, pageSize)
          } else {
            this.afterList(page.dataList)
            this.setTableList(page.dataList)
            this.setPagination(page)
            return page
          }
        })
      } else {
        return Promise.resolve()
      }
    },
    /**
     * 显示新增/编辑
     * @param {any} entity
     */
    showForm(entityOrId) {
      if (!entityOrId || typeof entityOrId === 'object') {
        this.form.entity = entityOrId || {}
        this.form.show = true
      } else {
        this.getApi().get(entityOrId).then(data => {
          this.showForm(data)
        })
      }
    },
    /**
     * 显示详情
     * @param {any} entity
     */
    showDetail(id, data) {
      this.detail.entity = {
        id: id
      }
      this.detail.show = true
    },
    toggleFullScreen(val) {
      this.fullScreen = val
    },
    closeForm() {
      this.form.show = false
      if (this.form.entity.id) {
        this.listAndDetail()
      } else {
        this.listAndDetail(0)
      }
    }
  }
}
</script>
