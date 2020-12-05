<style>
  .login-ent {
    overflow: hidden;
  }
  .choose-title {
    margin-top: 59px;
    font-size: 18px;
    color: #323232;
    text-align: center;
  }
  .choose-ent-list {
    margin: 48px auto 0;
    width: 83%;
  }
  .choose-ent {
    position: relative;
    margin-top: 21px;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: left;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    background: #ffffff;
  }
  .choose-ent-logo {
    position: relative;
    top: 9px;
    margin-left: 5.5%;
    width: 30px;
    height: 30px;
    vertical-align: top;
    border-radius: 100%;
  }
  .choose-ent-name {
    display: inline-block;
    position: relative;
    margin-left: 3.5%;
    width: 70%;
    font-size: 15px;
    color: #323232;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .choose-ent-arrow {
    position: relative;
    top: 16px;
    margin-left: 0.5%;
    vertical-align: top;
  }
</style>
<template>
  <div class="login-ent" v-if="entList.length>1">
    <p class="choose-title">选择已有组织</p>
    <div class="choose-ent-list">
      <div
        class="choose-ent"
        v-for="(item,index) in entList"
        :key="`entList_${index}`"
        @click="goIndex(item.enterpriseId)"
      >
        <img :src="item.logo" class="choose-ent-logo">
        <span class="choose-ent-name">{{item.name}}</span>
        <!-- <img src="@/resource/images/ai/arrow.png" class="choose-ent-arrow"> -->
      </div>
    </div>
  </div>

  <div class="login-ent" v-else-if="entList.length==0 && inited==true">
    <p class="choose-title">您没有有效组织,请通过小程序创建组织</p>
  </div>
</template>

<script>
import { enterpriseApi } from '@/api/common'
import {adminInfoSession, getSessionPhone} from '@/storage'
export default {
  name: 'chooseEnt',
  data() {
    return {
      inited: false,
      entList: [],
      phone: ''
    }
  },
  mounted() {
    this.getEntList()
  },
  methods: {
    // 获取已有企业列表
    getEntList() {
      let phone = getSessionPhone()
      enterpriseApi.entList(phone).then((data) => {
        this.entList = data
        this.inited = true
        if (this.entList.length === 1) {
          this.goIndex(this.entList[0].enterpriseId)
        }
      })
    },
    // 选择已有企业
    goIndex(enterpriseId) {
      enterpriseApi.chooseLogin(enterpriseId).then((data) => {
        adminInfoSession.setJSON(data)
        this.$router.push({
          name: 'EMS/INDEX'
        })
      })
    }
  }
}
</script>
