<template>
  <div>
    <item-content v-bind:data="data.content"></item-content>
  </div>
</template>
<script>
  import itemContent from '../components/item-content.vue'
  export default {
    props: ['data'],
    components:{
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
