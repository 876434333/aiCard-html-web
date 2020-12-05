<template>
  <div class="task-detail">
    <Row>
      <i-col span="5" class-name="row-left">
        <img :src="entity.headIcon" class="pane-detail-logo">
      </i-col>
      <i-col span="19" class-name="row-right">
        <Row :gutter="10">
          <i-col span="8" class="mb10">企业名称：{{entity.enterpriseName}}</i-col>
          <i-col span="8" class="mb10">上级代理商：{{entity.parentEnterprise}}</i-col>
          <i-col span="8" class="mb10">联系电话：{{entity.enterprisePhone}}</i-col>
        </Row>
        <Row :gutter="10">
          <i-col span="8" class="mb10">编号：{{entity.id}}</i-col>
          <i-col span="8" class="mb10">企业状态：{{statusMap[entity.status]}}</i-col>
          <i-col span="8" class="mb10">地址：{{entity.address}}</i-col>
        </Row>
        <Row :gutter="10">
          <i-col span="8" class="mb10">账号：{{entity.managerPhone}}</i-col>
          <i-col span="8" class="mb10">创建时间：{{entity.createTime | date}}</i-col>
          <i-col span="8" class="mb10 auto-word-break-wrap">备注：{{entity.remark || '无'}}</i-col>
        </Row>
        <Row :gutter="10">
          <i-col span="8" class="mb10">初始名片：{{entity.saleCardNum}}</i-col>
          <i-col span="8" class="mb10">创建人：{{entity.createName}}</i-col>
        </Row>
      </i-col>
    </Row>
    <hr class="mt-20">
    <div class="mt-20">
      <mini-program-form :data="entity"
                          @change="changeMpForm"
                          :edit="entity.isDeploy === 0"
                          :ruleFlag="entity.isDeploy === 0"
                          ref="mpForm"></mini-program-form>
    </div>
  </div>
</template>
<script>
import { detailMixin } from '@/mixins'
import MiniProgramForm from '@/components/packages/enterpriseConfigForm/miniProgramForm.vue'
import {ENTERRISE_STATUS_MAP} from '@/constants'
import smsEnterpriseApi from '@/api/sms/enterprise'

export default {
  mixins: [detailMixin],
  components: {
    miniProgramForm: MiniProgramForm
  },
  data() {
    return {
      statusMap: ENTERRISE_STATUS_MAP
    }
  },
  created() {
    this.$on('checkMpForm', (cb) => {
      this.$refs.mpForm.$emit('checkMpForm', cb)
    })
  },
  methods: {
    // 更改小程序资料时触发更新
    changeMpForm(data) {
      this.$emit('change', data)
    },
    afterEntity(entity) {
      if (entity.id) {
        this.getDetail(entity.id, entity.type).then(data => {
          this.entity = data
          this.changeMpForm(data)
        })
      }
    },
    getDetail(id) {
      return smsEnterpriseApi.getEnterpriseApplyDetail(id)
    }
  }
}
</script>

<style>
@import '@/assets/css/theme/default/style/pages/enterprise.scss'
.row-left {
  min-width: 120px;
}
.row-right {
  min-width: 380px;
}
</style>
