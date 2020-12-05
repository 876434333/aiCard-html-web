<template>
  <div>
    <vma-panel v-model="computedValue"
               title="企业动态">
      <Tabs value="name1">
        <TabPane label="动态详情"
                 name="name1">
          <div class="circle-content">
            <Card>
              <div>
                <div class="item-headder cf-all">
                  <div>
                    <img :src="detailData.headIcon"
                         alt="">
                  </div>
                  <div class="header-msg">
                    <p>{{detailData.name}}</p>
                    <span class="header-time">{{detailData.createTime | date}}</span>
                    <section>
                      <!-- 个人 -->
                      <div v-if="detailData.flag===0">
                        <p class="circle-detail-image-show"
                           v-html="detailData.content"></p>
                        <p class="circle-detail-image-show"
                           v-for="img in detailData.circleImgs"
                           :key="img">
                          <img :src="img"
                               alt=" ">
                        </p>
                      </div>
                      <!-- 企业 -->
                      <div v-if="detailData.flag===1">
                        <p v-if="detailData.type!==0" class="circle-detail-image-show"
                           v-html="detailData.content"></p>
                        <p v-if="detailData.type===0" v-html="detailData.content"></p>
                        <p v-if="detailData.type===0" class="circle-detail-image-show"
                           v-for="img in detailData.circleImgs"
                           :key="img">
                          <img :src="img"
                               alt=" ">
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <Tabs value="name1"
                class="circle-detail-zanOrPing">
            <TabPane :label="`评论 ${detailData.circleCommentLogs.length}`"
                     name="name1">
              <section class="ping"
                       v-for="(item) in detailData.circleCommentLogs"
                       :key="item.id">
                <div class='circle-row circle-row-comment cf-all'>
                  <div class='headIcon'>
                    <img :src='item.headIcon'
                         alt="" />
                  </div>
                  <div>
                    <p class="name">{{item.userName}}</p>
                    <p>{{item.content}}</p>
                  </div>
                </div>
                <div class="action cf-all">
                  <section class="time">{{item.modifyTime | date}}</section>
                  <section class="del"
                           @click="clickShowDel(item.id)">
                    <i class="iconfont icon-shanchu"></i>
                    <span>删除</span>
                  </section>
                </div>
              </section>
            </TabPane>
            <TabPane class="zan"
                     :label="`点赞 ${detailData.circleZanLogs.length}`"
                     name="name2">
              <i v-if="detailData.circleZanLogs.length>0"
                 class="iconfont icon-xihuan"></i>
              <span v-for="(item,index) in detailData.circleZanLogs"
                    :key='item.userId'>{{item.userName}}
                <i v-if="index<detailData.circleZanLogs.length-1"> ,</i>
              </span>
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </vma-panel>
    <SimpleModal v-model='isDel'
                 :content='delContent'
                 @on-click='delComment' />
  </div>
</template>

<script>
import {
  circleApi
} from '@/api/ems'
import localApi from '../src'
import SimpleModal from '@/components/common/simpleModal/index'

export default {
  model: {
    prop: 'value',
    event: 'model'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    circleId: {
      type: String,
      default: ''
    }
  },
  components: {
    SimpleModal
  },
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('model', val)
      }
    }
  },
  data() {
    return {
      detailData: {
        circleZanLogs: [],
        circleCommentLogs: []
      },
      isDel: false,
      delContent: '是否删除此条评论',
      currId: ''
    }
  },
  filters: {
    contentFil(val) {
      return localApi.contentFil(val)
    }
  },
  watch: {
    circleId(val) {
      this.get()
    }
  },
  methods: {
    async get() {
      const data = await circleApi.get(this.circleId)
      this.detailData = data
    },
    async delComment() {
      await circleApi.delComment(this.currId)
      this.detailData.circleCommentLogs.forEach((o, i) => {
        if (o.id === this.currId) {
          this.detailData.circleCommentLogs.splice(i, 1)
        }
      })
      this.success('删除成功')
    },
    clickShowDel(id) {
      this.currId = id
      this.isDel = true
    }
  }
}
</script>
