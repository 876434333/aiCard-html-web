<template>
  <div class="home-info-status">
    <Row :gutter="16">
      <i-col span="12">
        <div class="panel">
          <div class="panel-body">
            <div class="home-header">
              <span>名片状态</span>
            </div>
            <div class="card-body identity-body flex-layout">
              <div>
                <p class="text">
                  <img src="./assets/images/card.png" alt="">
                  <span>员工总数</span>
                </p>
                <p class="num">
                  <span>{{statusData.staffNum}}</span>
                </p>
              </div>
              <div>
                <p class="text">
                  <img src="./assets/images/account.png" alt="">
                  <span>已开通/可开通名片数</span>
                </p>
                <p class="num">
                  <span>{{statusData.cardUsedNum}} / {{statusData.cardNum}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </i-col>
      <i-col span="12">
        <div class="panel">
          <div class="panel-body">
            <div class="home-header">
              <span>账号状态</span>
            </div>
            <div class="card-body account-body">
              <div class="flex-layout">
                <p>已使用天数</p>
                <p>
                  <span class="num day">{{statusData.usedDays}}</span>天</p>
                <p class="time">{{statusData.beginDate | dateFormate}}开通</p>
              </div>
              <div class="flex-layout">
                <p>剩余可用天数</p>
                <p>
                  <span class="num day">{{statusData.leaveDays}}</span>天</p>
                <p class="time">{{statusData.endDate | dateFormate}}截止</p>
              </div>
              <div class="flex-layout">
                <p>已获取客户数</p>
                <p>
                  <span class="num day">{{statusData.customerNum}}</span>人</p>
                <p class="time"></p>
              </div>
            </div>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import {
  msToDate
} from '@/utils'
import { homeApi } from '@/api/ems'

export default {
  data() {
    return {
      statusData: {}
    }
  },
  created() {
    this.getData()
  },
  filters: {
    dateFormate(time) {
      return msToDate(time, 'yyyy-MM-dd')
    }
  },
  methods: {
    getData() {
      homeApi.cardOrAccount().then(data => {
        this.statusData = data
      })
    }
  }
}
</script>
