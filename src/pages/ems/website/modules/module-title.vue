<template>
  <div>

    <item-title v-bind:data="data.title" v-bind:customStyle="data.textAlign"></item-title>
  </div>
</template>
<script>
  import itemTitle from '../components/item-title.vue'

  export default {
    props: ['data'],
    components:{
      itemTitle
    },
    data() {
      return {

      }
    },


  }
</script>
<style lang="less" scoped>

</style>
