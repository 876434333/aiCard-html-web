<template>
  <div class="company-info">
    <item-title v-bind:data="data.title" v-bind:customStyle="data.textAlign"></item-title>
    <item-content v-bind:data="data.content"></item-content>
  </div>
</template>
<script>
  import itemTitle from '../../components/item-title.vue'
  import itemContent from '../../components/item-content.vue'
  export default {
    props: ['data'],
    components:{
      itemTitle,
      itemContent
    },
    data() {
      return {

      }
    }
  }
</script>
<style lang="less" scoped>

</style>
