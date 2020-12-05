<template>
  <div>
    <item-title v-bind:data="data.title" v-bind:customStyle="data.textAlign"></item-title>
    <ul class="contact-list">
      <li class="item" v-for="item in data.employee.value">
        <div class="name">
          <p class="s_n">
            {{item.name}}
          </p>
          <p>
            {{item.departmentName}}
          </p>
          <img :src="item.headIcon"/>
        </div>
        <div class="info-list">
          <div class="info-item">
            手机:{{item.phone}}
          </div>
          <div class="info-item">
            邮件:{{item.mail}}
          </div>
        </div>
      </li>

      <li class="item" v-if="data.employee.value.length == 0">
        <div class="name">
          <p class="s_n">
            姓名
          </p>
          <p>
            部门
          </p>
          <img src="../../assets/logo.png"/>
        </div>
        <div class="info-list">
          <div class="info-item">
            手机:
          </div>
          <div class="info-item">
            邮件:
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import itemTitle from '../../components/item-title.vue'
  export default {
    props: ['data'],
    components:{
      itemTitle
    },
    data() {
      return {

      }
    }
  }
</script>
<style lang="less" scoped>
  .item{
    position: relative!important;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 12px;
    box-sizing: border-box;
    overflow: auto;
    .name{
      padding: 12px 0;
      background: #fff;
      padding-bottom: 34px;
      p.s_n{
        color: #333;
        font-size: 14px;
      }
      p{
        margin: 0;
        text-align: left;
        padding-left: 15px;
        color: #666;
        font-size: 14px;
      }
      img{
        display: block;
        position: absolute;
        top: 6px;
        right: 12px;
        width: 60px;
        height: 60px;
        border-radius: 6px;
      }
    }
    .info-list{
      background: #fff;
      font-size: 14px;
      text-align: left;
      padding: 8px 0 5px 15px;
      line-height: 26px;
      .info-item{

      }
    }
  }
</style>
