<template>
  <div class="circle">
    <div class="panel">
      <div class="panel-body">
        <div class='circle-search cf-all'>
          <section class="search-item">
            <RadioGroup v-model="params.flag"
                        type="button"
                        @on-change='search'>
              <Radio v-for='(item) in typeTabsList'
                     :label="item.value"
                     :key="item.name">{{item.name}}</Radio>
            </RadioGroup>
          </section>
          <section class="search-item">
            <DatePicker transfer
                        type="daterange"
                        placement="bottom-end"
                        placeholder="开始时间  -  结束时间"
                        style="width:rem(300px)"
                        @on-change='changeDate'></DatePicker>
          </section>
          <section class="search-item">
            <Input v-model="params.name"
                   placeholder="请输入姓名"
                   style="width: rem(120px)"
                   @on-enter='search' />
          </section>
          <section class="search-item">
            <Button type="primary"
                    @click.native="addCircle">发布企业动态</Button>
          </section>
        </div>
      </div>
    </div>
    <div class="circle-list circle-content">
      <Card v-for="(item) in circleList"
            :key="item.id"
            @click.native="detailCircle(item.id)">
        <div>
          <div class="item-headder cf-all">
            <div>
              <img :src="item.headIcon"
                   alt="">
            </div>
            <div class="header-msg">
              <p>{{item.name}}</p>
              <span class="header-time">{{item.createTime | date}}</span>
              <section>
                <!-- 企业 -->
                <p v-if="item.flag==1 && item.cover!=null"
                   class="multi-row-ellipsis">{{item.title}}</p>
                <p v-if="item.flag==1 && item.circleImgs!=null && item.cover==null"
                   class="multi-row-ellipsis" v-html="item.content"></p>
                <!-- 个人 -->
                <p v-if="item.flag==0"
                   class="multi-row-ellipsis" v-html="item.content"></p>
                <!-- 企业 -->
                <img class="company circle-img"
                     v-if="item.flag==1 && item.cover!=null"
                     :src="item.cover"
                     alt="">
                <span class="personal circle-img"
                      v-if="item.flag==1 && item.circleImgs!=null && item.cover==null"
                      v-for="(jtem,jndex) in item.circleImgs"
                      :key="`circleImgs_${jndex}`"
                      :style="jtem | backgroundImg"></span>
                <!-- 个人 -->
                <span class="personal circle-img"
                      v-if="item.flag==0"
                      v-for="(jtem,jndex) in item.circleImgs"
                      :key="`circleImgs_${jndex}`"
                      :style="jtem | backgroundImg"></span>
              </section>
            </div>
          </div>
          <Row class="item-action">
            <i-col span="8">
              <i class="iconfont icon-xihuan"></i>
              <span>{{item.zanNum}}</span>
            </i-col>
            <i-col span="8">
              <i class="iconfont icon-pinglun1"></i>
              <span>{{item.pingNum}}</span>
            </i-col>
            <i-col span="8"
                   @click.stop.native="clickDel(item)">
              <i class="iconfont icon-shanchu"></i>
              <span>删除</span>
            </i-col>
          </Row>
        </div>
      </Card>
    </div>
    <vma-pagination :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :total="page.totalNum"
                    @change="changePage" />
    <SimpleModal v-model='isDel'
                 :content='delContent'
                 @on-click='delCircle' />
    <AddCircle v-model="isAddCircle"
               v-if="cropperReset"
               @on-addsuccess='addSuccess'></AddCircle>
    <DetailCircle v-model="detail.show"
                  :circleId='currCircleId'></DetailCircle>
  </div>
</template>

<script>
import {
  indexMixin
} from '@/mixins'
import localApi from '../src'
import {
  circleApi
} from '@/api/ems'
import SimpleModal from '@/components/common/simpleModal/index'
import AddCircle from './addCircle'
import DetailCircle from './detailCircle'

export default {
  mixins: [indexMixin],
  components: {
    SimpleModal,
    AddCircle,
    DetailCircle
  },
  data() {
    return {
      cropperReset: true,
      typeTabsList: localApi.typeTabsList,
      isDel: false,
      currCircleId: '',
      delContent: '是否删除该条动态',
      params: {
        beginTime: '',
        endTime: '',
        flag: '',
        name: ''
      },
      circleList: [],
      isAddCircle: false
    }
  },
  filters: {
    contentFil(val) {
      return localApi.contentFil(val)
    },
    backgroundImg(url) {
      let background = {
        'background-image': `url(${url})`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'display': 'inline-block'
      }
      return background
    }
  },
  mounted() {
    this.afterList()
  },
  methods: {
    getApi() {
      return circleApi
    },
    afterList(list) {
      this.circleList = list
    },
    changeDate(val) {
      this.params.beginTime = val[0]
      this.params.endTime = val[1]
      this.search()
    },
    clickDel(item) {
      this.isDel = true
      this.currCircleId = item.id
    },
    async delCircle() {
      await circleApi.delCircle(this.currCircleId)
      this.success('删除成功')
      this.search()
    },
    addCircle() {
      this.isAddCircle = true
    },
    detailCircle(id) {
      this.detail.show = true
      this.currCircleId = id
    },
    addSuccess() {
      this.search()
      /*
      *cropperReset,强制重置子组件,因为v-if 在切换时，元素及它的绑定数据和组件都会被销毁并重建
      */
      this.cropperReset = false
      this.$nextTick(() => {
        this.cropperReset = true
      })
    },
    changePage(page) {
      this.params.pageNum = page
      this.list(page)
      let scroller = document.getElementsByClassName('frame-main')[0]
      scroller.scrollTop = 0
    }
  }
}
</script>
