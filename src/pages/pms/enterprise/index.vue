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
                       v-model.trim="params.nameOrPhone"
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
              <Select style="width: 120px;"
                      v-model="params.status"
                      placeholder="选择状态"
                      @on-change="search">
                <Option value="">全部</Option>
                <Option v-for="(item, index) in statusMap" :value="index" :key="index">{{statusMap[index]}}</Option>
              </Select>
            </FormItem>
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
            <div class="panel-header-tools">
              <Button type="primary"
                      icon="plus"
                      @click="showForm()">添加企业</Button>
            </div>
          </div>
          <div class="panel-body">
            <p class="nodata"
               v-show="!table.list.length">暂无数据</p>
            <ul class="list" v-if="table.list.length > 0">
              <li v-for="(item, index) in table.list"
                  :key="item.id"
                  :class="{active: detail.entity && detail.entity.id === item.id}"
                  @click="showDetail(item.id, index)">
                <div class="list-item">
                  <div class="list-item-ext">
                    <div class="list-item-ext-text list-ext-text-right">
                      <p>{{item.templateName}}</p>
                      <p>{{deployMap[item.isDeploy]}}</p>
                    </div>
                  </div>
                  <div class="list-item-main">
                    <p class="list-item-title">{{item.name}}</p>
                    <div class="list-item-info">{{item.phone}}</div>
                  </div>
                </div>
              </li>
            </ul>
            <vma-pagination :pageNum="params.pageNum"
                           :pageSize="params.pageSize"
                           :total="page.totalNum"
                           @change="list"
                           simple
                           v-if="table.list.length > 0" />
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
    <!-- 弹窗 -->
    <vma-panel v-model="form.show"
              :title="form.entity.id ? '编辑企业' : '添加企业'">
      <template v-if="form.show">
        <mod-form :data="form.entity"
                  @cancel="closeForm"
                  @after-submit="closeForm" />
      </template>
    </vma-panel>
  </div>
</template>

<script>
import { indexMixin } from '@/mixins'
import enterpriseApi from '@/api/pms/enterprise'
import enterpriseEventBus from './src/enterpriseEventBus'
import ModDetail from './detail'
import ModForm from './form'
import { watchDateRangeToTimestamp } from '@/utils'
import {ENTERRISE_STATUS_MAP, ENTERRISE_DEPLOY_MAP, PMS} from '@/constants'

export default {
  mixins: [indexMixin],
  components: {
    ModForm,
    ModDetail
  },
  data() {
    return {
      statusMap: ENTERRISE_STATUS_MAP,
      deployMap: ENTERRISE_DEPLOY_MAP,
      fullScreen: false,
      dateRange: ''
    }
  },
  created() {
    this.$watch('dateRange', watchDateRangeToTimestamp(this.params, 'beginTime', 'endTime'))

    // 更新列表，并重新读取当前的详情
    // 更新任务时使用
    enterpriseEventBus.$on('list.update', id => {
      this.listAndDetail()
    })
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
      this.form.entity = entityOrId || {}
      this.form.show = true
    },
    /**
     * 显示详情
     * @param {any} entity
     */
    showDetail(id, index) {
      this.detail.entity = {
        id: id,
        type: PMS,
        status: this.table.list[index].status,
        isDeploy: this.table.list[index].isDeploy
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
<style>
@import '../../../assets/css/theme/default/style/pages/enterprise.scss'
</style>
