<template>
  <div class="phone">
    <item-title v-bind:data="data.title" v-bind:customStyle="data.textAlign"></item-title>
    <div class="info">
      <div class="phone-txt" id="phone-number">
        {{data.phone.value}}
      </div>
    </div>
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
  .phone{
    .info {
      background: #fff;
      font-size: 14px;
      text-align: left;
      line-height: 26px;
      .phone-txt {
        font-size: 24px;
        line-height: 45px;
        color: #333;
        overflow: hidden;
        margin: 10px;
        border: 1px solid #1aad19;
        padding: 0 5px;
        text-align: center;
        color: #1aad19;
      }
    }
  }
</style>
