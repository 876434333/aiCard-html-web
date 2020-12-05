<template>
  <div>
    <div class="panel">
      <div class="panel-body">
        <div class='circle-search cf-all'>
          <section class="search-item">
            <RadioGroup v-model="queryType"
                        type="button"
                        @on-change='changeFlag'>
              <Radio v-for='(item) in typeTabsList'
                     :label="item.name"
                     :key="item.value" />
            </RadioGroup>
          </section>
          <section class="search-item">
            <DatePicker transfer
                        type="daterange"
                        placement="bottom-end"
                        placeholder="开始时间  -  结束时间"
                        style="width:300px"
                        @on-change='changeDate'></DatePicker>
          </section>
          <section class="search-item">
            <Input v-model="params.related"
                   placeholder="请输入内容关键字"
                   style="width: 180px" />
            <Button icon="ios-search"
                    @click.native="search" />
          </section>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <div class='circle-search cf-all'>
          <div class="circle-list">
            <Table ref="selection"
                   :columns="columns"
                   :data="commentList" />
          </div>
          <vma-pagination :pageNum="params.pageNum"
                          :pageSize="params.pageSize"
                          :total="page.totalNum"
                          @change="list" />
          <SimpleModal v-model='isDel'
                       :content='delContent'
                       @on-click='delComment' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  circleApi
} from '@/api/ems'
import {
  indexMixin
} from '@/mixins'
import {
  msToDate
} from '@/utils'
import localApi from '../src'
import SimpleModal from '@/components/common/simpleModal/index'
export default {
  mixins: [indexMixin],
  components: {
    SimpleModal
  },
  data() {
    return {
      typeTabsList: localApi.typeTabsList,
      isDel: false,
      delContent: '是否删除这条动态',
      queryType: '全部',
      params: {
        beginTime: '',
        endTime: '',
        queryType: 0,
        related: ''
      },
      commentList: [],
      isComment: false,
      currId: '',
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '评论日期',
          sortable: true,
          align: 'center',
          render: (h, { row, index, column }) => {
            return (
              <div>
                {msToDate(row.createTime)}
              </div>
            )
          }
        },
        {
          title: '评论',
          align: 'center',
          render: (h, { row, index, column }) => {
            return (
              <div class='circle-row circle-row-comment'>
                <div class='headIcon'>
                  <img src={row.headIcon} alt="" />
                </div>
                <div>
                  <p>{row.userName}</p>
                  <p>{row.commentContent}</p>
                </div>
              </div>
            )
          }
        },
        {
          title: '来源',
          align: 'center',
          render: (h, { row, index, column }) => {
            return (
              <div>
                <p>{row.staffName}</p>
                <p>{row.station}</p>
              </div>
            )
          }
        },
        {
          title: '动态内容',
          key: 'circleContent',
          align: 'center',
          render: (h, { row, index, column }) => {
            return (
              <div class='start-flex circle-row-dynamic'>
                <div class='headIcon'>
                  <img src={row.headIcon} alt="" />
                </div>
                <div>
                  <p>{localApi.contentFil(row.circleContent)}</p>
                </div>
              </div>
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 150,
          render: (h, { row, index, column }) => {
            return (
              <div class='circle-row-action'>
                <span onClick={() => {
                  this.isDel = true
                  this.currId = row.id
                }}>删除</span>
              </div>
            )
          }
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    getApi() {
      return circleApi
    },
    getListApi(params) {
      return this.getApi().commentList(params)
    },
    afterList(page) {
      this.commentList = page
    },
    changeFlag(val) {
      switch (val) {
        case '全部':
          this.params.queryType = 0
          break
        case '公司':
          this.params.queryType = 1
          break
        case '个人':
          this.params.queryType = 2
          break
      }
      this.search()
    },
    changeDate(val) {
      this.params.beginTime = val[0]
      this.params.endTime = val[1]
      this.search()
    },
    async delComment() {
      await circleApi.delComment(this.currId)
      this.success('删除成功')
      this.search()
    }
  }
}
</script>
