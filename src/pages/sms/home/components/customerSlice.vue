<template>
  <div class="home-todo-list">
    <div class="home-todo-item pointer"
         @click="goOem">
      <p>{{ (number.firstNumber || 0) | numberLabel }}</p>
      <p class="ellipsis">贴牌商数量</p>
    </div>
    <div class="home-todo-item pointer"
         @click="goRegionalAgent">
      <p>{{ (number.secondNumber || 0) | numberLabel }}</p>
      <p class="ellipsis">地区总代理数量</p>
    </div>
    <div class="home-todo-item pointer"
         @click="goAgent">
      <p>{{ (number.thirdNumber || 0) | numberLabel }}</p>
      <p class="ellipsis">代理商数量</p>
    </div>
    <div class="home-todo-item pointer"
         @click="goEnterprise">
      <p>{{ (number.enterpriseNumber || 0) | numberLabel }}</p>
      <p class="ellipsis">企业数量</p>
    </div>
  </div>
</template>

<script>
import { homeApi } from '@/api/sms'
import * as smsTypes from '@/router/sms/types'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      number: {
        enterpriseNumber: 0,
        firstNumber: 0,
        secondNumber: 0,
        thirdNumber: 0
      }
    }
  },
  created() {
    homeApi.getEnterpriseNumber().then(data => {
      this.number = Object.assign({}, this.number, data)
    })
  },
  methods: {
    ...mapActions(['setCurrentMenuUrl']),
    goOem() {
      this.setCurrentMenuUrl(smsTypes.OEM)
    },
    goRegionalAgent() {
      this.setCurrentMenuUrl(smsTypes.REGIONAL_AGENT)
    },
    goAgent() {
      this.setCurrentMenuUrl(smsTypes.AGENT)
    },
    goEnterprise() {
      this.setCurrentMenuUrl(smsTypes.ENTERPRISE)
    }
  }
}
</script>
