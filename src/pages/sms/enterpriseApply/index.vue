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
                       v-model.trim="params.enterpriseName"
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
                      v-model="params.isDeploy"
                      placeholder="选择状态"
                      @on-change="search">
                <Option value="">全部</Option>
                <Option v-for="(item, index) in statusMap"
                        :value="index"
                        :key="index">{{statusMap[index]}}</Option>
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
          </div>
          <div class="panel-body">
            <p class="nodata"
               v-show="!table.list.length">暂无数据</p>
            <ul class="list" v-if="table.list.length > 0">
              <!-- {{table.list[0]['id']}} -->
              <li v-for="(item, index) in table.list"
                  :key="item.id"
                  :class="{active: detail.entity && detail.entity.id === item.id}"
                  @click="showDetail(item.id, index)">
                <div class="list-item">
                  <div class="list-item-ext">
                    <div class="list-item-ext-text list-ext-text-right">
                      <p>{{item.templateName}}</p>
                      <p>{{statusMap[item.isDeploy]}}</p>
                    </div>
                  </div>
                  <div class="list-item-main">
                    <p class="list-item-title">{{item.enterpriseName}}</p>
                    <div class="list-item-info">{{item.enterprisePhone}}</div>
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
import enterpriseApi from '@/api/sms/enterprise'
import enterpriseEventBus from './src/enterpriseEventBus'
import ModDetail from './detail'
import { watchDateRangeToTimestamp } from '@/utils'
import {ENTERRISE_DEPLOY_MAP, SMS} from '@/constants'

export default {
  mixins: [indexMixin],
  components: {
    ModDetail
  },
  data() {
    return {
      statusMap: ENTERRISE_DEPLOY_MAP,
      fullScreen: false,
      params: {},
      dateRange: ''
    }
  },
  created() {
    this.$watch('dateRange', watchDateRangeToTimestamp(this.params, 'templateTime', 'templateTimeEnd'))

    // 更新列表，并重新读取当的详情
    // 更新任务时使用
    enterpriseEventBus.$on('list.update', id => {
      this.listAndDetail()
    })

    // 更新列表，并定位到第一个的详情
    // 删除时使用
    enterpriseEventBus.$on('list.delete', id => {
      this.listAndDetail(0)
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
      if (!params['templateTime']) {
        delete params['templateTime']
      }
      if (!params['templateTimeEnd']) {
        delete params['templateTimeEnd']
      }
      if (this.beforeList(params) !== false) {
        return this.getApi().getEnterpriseApplyList(params).then(page => {
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
     * 显示详情
     * @param {any} entity
     */
    showDetail(id, index) {
      this.detail.entity = {
        id: id,
        type: SMS,
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
