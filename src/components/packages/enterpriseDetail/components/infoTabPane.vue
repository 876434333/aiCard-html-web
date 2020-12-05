<template>
  <div class="task-detail">
    <div class="cf">
      <img :src="entity.headIcon" class="fl mr10 bd pane-detail-logo">
      <div>
        <p>企业名称：{{entity.name}}</p>
        <p>编号：{{entity.enterpriseNo}}</p>
        <p>账号：{{entity.login}}</p>
      </div>
    </div>
    <Row :gutter="60"
         class="mt-20 nail nail-f-lg"
         type="flex"
         justify="center">
      <i-col span="6">
        <div class="nail-item"
             style="width: 100%;">
          <h3>{{entity.moneyInit}}张</h3>
          <p>初始名片</p>
        </div>
      </i-col>
      <i-col span="6" v-if="entity.isDeploy">
        <div class="nail-item"
             style="width: 100%;">
          <h3>{{entity.moneySum}}张</h3>
          <p>累计名片</p>
        </div>
      </i-col>
      <i-col span="6" v-if="entity.isDeploy">
        <div class="nail-item"
             style="width: 100%;">
          <h3>{{entity.moneyLeave}}张</h3>
          <p>剩余名片</p>
        </div>
      </i-col>
    </Row>
    <hr class="mt-20">
    <div class="mt-20">
      <Row>
        <i-col>
          <p>联系电话：{{entity.phone}}</p>
          <p>上级代理商：{{entity.parentName}}</p>
          <p>企业状态：{{statusMap[entity.status]}}</p>
          <p>地址：{{entity.provinceName}} {{entity.cityName}} {{entity.areaName}} {{entity.address}}</p>
          <p>创建时间：{{entity.createTime | date}}</p>
          <p>到期时间：{{entity.expireTime | date}}</p>
          <p>创建人：{{entity.createStaffName}}</p>
          <p>备注：{{entity.remark}}</p>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
import { detailMixin } from '@/mixins'
import {ENTERRISE_STATUS_MAP, SMS, OMS, RAMS, PMS} from '@/constants'
import smsApi from '@/api/sms/enterprise'
import pmsApi from '@/api/pms/enterprise'
import omsApi from '@/api/oms/enterprise'
import ramsApi from '@/api/rams/enterprise'
import {loginTypeLocal} from '@/storage/local'

export default {
  mixins: [detailMixin],
  data() {
    return {
      statusMap: ENTERRISE_STATUS_MAP
    }
  },
  methods: {
    afterEntity(entity) {
      if (entity.id) {
        this.getDetail(entity.id).then(data => {
          this.entity = data
        })
      }
    },
    getDetail(id) {
      let type = loginTypeLocal.getOrDefault()
      type = parseInt(type)
      switch (type) {
        case SMS:
          return smsApi.getEnterpriseDetail(id)
        case OMS:
          return omsApi.getEnterpriseDetail(id)
        case RAMS:
          return ramsApi.getEnterpriseDetail(id)
        case PMS:
          return pmsApi.getEnterpriseDetail(id)
      }
    }
  }
}
</script>

<style>
  .pane-detail-logo {
    width: 100px;
    height: 80px;
  }
</style>
