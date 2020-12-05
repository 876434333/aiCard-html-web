<template>
  <div class="panel weixinPermisson">
    <div class="panel-body float-layout ">
      <div class="weixinName">
        <img :src="headIcon" alt="">
        <span>企业微信：{{name}}</span>
      </div>
      <ul class="cf-all">
        <li v-for="(item) in list"
            :key="item.name"
            class="cf-all">
          <div>
            <img :src="item.img"
                 alt="">
          </div>
          <div>
            <span>{{item.name}}</span>
          </div>
          <div class="accredited">
            <!-- <Icon type="ios-checkmark-circle-outline" :size='14'/> -->
            <span>已授权</span>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import bossImg from './assets/images/boss.png'
import leiImg from './assets/images/lei.png'
import touImg from './assets/images/tou.png'
import weixinImg from './assets/images/weixin.png'
import { accountApi } from '@/api/ems'

export default {
  components: {

  },
  data() {
    return {
      weixinImg: weixinImg,
      list: [
        { img: bossImg, name: '通讯录' },
        { img: leiImg, name: 'AI雷达' },
        { img: touImg, name: 'Boss雷达' }
      ],
      name: '',
      headIcon: ''
    }
  },
  created() {
    accountApi.detail().then((data) => {
      this.name = data.name
      this.headIcon = data.headIcon
    })
  }
}
</script>
