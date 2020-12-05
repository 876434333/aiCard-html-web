<template>
  <div>
    <div class="handover-title">工作交接</div>
    <div class="panel">
      <div class="panel-body handover-content">
        <div class="center-flex">
          <section class="handover-selecteble">
            <p>
              <span>选择交出方：</span>
              <Button type="primary"
                      @click.native="selectRemovedDtaffs">选择</Button>
            </p>
            <p class="staff-info"
               v-if="JSON.stringify(currRemovedStaff) != '{}'">
              <strong>{{currRemovedStaff.name}}</strong>客户数
              <span class="blue-color">{{currRemovedStaff.customNum}}</span>人
            </p>
          </section>
          <section class="handover-jiantou">
            <img src="./assets/images/jiantou.png"
                 alt="">
          </section>
          <section class="handover-selecteble handover-selecteble-accept">
            <p>
              <span>选择接收方：</span>
              <Button type="primary"
                      @click.native="selectAcceptDtaffs">选择</Button>
            </p>
            <p class="staff-info"
               v-if="JSON.stringify(currAcceptStaff) != '{}'">
              <strong>{{currAcceptStaff.name}}</strong>客户数
              <span class="blue-color">{{currAcceptStaff.customNum}}</span>人
            </p>
          </section>
        </div>
        <p v-if="isShowDandoverInfo"
           class="handover-info">目标交接客户数
          <span class="blue-color">{{dandoverInfo.fromCustom}}</span>人，重合客户数
          <span class="blue-color">{{dandoverInfo.repeatCustom }}</span>人，实际交接客户数
          <span class="blue-color">{{dandoverInfo.actualCustom }}</span>人</p>
        <p class="handover-submit">
          <Button @click="showSubmit"
                  :type="isShowDandoverInfo?'primary':'default'"
                  class="submit">工作交接</Button>
        </p>
      </div>
      <Dtaffs v-model="showRemovedDtaffs"
              :title='removedStaffsTitle'
              @on-select='removedStaff'></Dtaffs>
      <Dtaffs v-model="showAcceptDtaffs"
              :title='acceptStaffsTitle'
              @on-select='acceptStaff'></Dtaffs>
    </div>
    <SimpleModal v-model='isSame'
                 :content='sameContent' />
    <Modal v-model="isSubmit"
           title="交接确认"
           ok-text='确认交接'
           @on-ok="handover">
      <p>正在将{{currRemovedStaff.name}}的{{currRemovedStaff.customNum}}个客户的备注和跟进转移到{{currAcceptStaff.name}}的AI雷达中</p>
      <p style="color:red;margin-top:5px">交接后，{{currRemovedStaff.name}}将从组织结构中删除，不可恢复</p>
    </Modal>
  </div>
</template>

<script>
import {
  handoverApi, personApi
} from '@/api/ems'
import Dtaffs from './components/staffs'
import SimpleModal from '@/components/common/simpleModal/index'
export default {
  components: {
    Dtaffs,
    SimpleModal
  },
  data() {
    return {
      showRemovedDtaffs: false,
      showAcceptDtaffs: false,
      isSame: false,
      isShowDandoverInfo: false,
      isSubmit: false,
      sameContent: '工作交出方和接受方不能是同一个人',
      removedStaffsTitle: '选择交出方',
      acceptStaffsTitle: '选择接收方',
      currRemovedStaff: {},
      currAcceptStaff: {},
      dandoverInfo: {}
    }
  },
  methods: {
    selectRemovedDtaffs() {
      this.showRemovedDtaffs = true
    },
    selectAcceptDtaffs() {
      this.showAcceptDtaffs = true
    },
    removedStaff(val) {
      personApi.get(val.id).then(data => {
        if ((data.openAi + data.openBoss) <= 0) {
          if (val.id === this.currAcceptStaff.id) {
            this.isSame = true
            this.currRemovedStaff = {}
          } else {
            this.currRemovedStaff = val
            this.handoverInfo()
          }
        } else {
          this.$Message.info({
            content: '请先关闭员工' + data.name + '的雷达权限'
          })
        }
      })
    },
    acceptStaff(val) {
      if (this.currRemovedStaff.id === val.id) {
        this.isSame = true
        this.currAcceptStaff = {}
      } else {
        this.currAcceptStaff = val
        this.handoverInfo()
      }
    },
    /*
   *如果交接双方都有值，用id来判定，因为id一定有
   */
    handoverInfo() {
      if (this.currRemovedStaff.id && this.currAcceptStaff.id) {
        this.isShowDandoverInfo = true
        this.customCount()
      }
    },
    showSubmit() {
      if (this.isShowDandoverInfo) {
        this.isSubmit = true
      } else {
        this.$Message.info({
          content: '请先选择人员'
        })
      }
    },
    async handover() {
      let params = {
        fromid: this.currRemovedStaff.id,
        toid: this.currAcceptStaff.id
      }
      await handoverApi.handover(params)
      this.$Message.info({
        content: '交接成功'
      })
      // this.$router.push({ name: 'EMS/INDEX' })
    },
    async customCount() {
      let params = {
        fromId: this.currRemovedStaff.id,
        toId: this.currAcceptStaff.id
      }
      const data = await handoverApi.customCount(params)
      this.dandoverInfo = data
    }
  }
}
</script>
