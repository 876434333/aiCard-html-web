<template>
  <div class="components-content">
    {{data.value}}
  </div>
</template>
<script>
  export default {
    props: ['data'],

    data() {
      return {

      }
    }
  }
</script>
<style lang="less" scoped>
  .components-content {
    background: #fff;
    font-size: 14px;
    text-align: left;
    padding: 8px 0 5px 15px;
    line-height: 26px;
  }
</style>
