<template>
  <div class="components-title"  v-bind:align="alignValue">
    <span>{{data.value}}</span>
  </div>
</template>
<script>
  import { createStyles } from '../utils'
  export default {
    props: ['data','customStyle'],
    watch:{

    },
    computed: {
      alignValue: function () {
        let style = this.customStyle;
        return style == null ?"left":style.value;
      }
    },
    data() {
      return {

      }
    }
  }
</script>
<style lang="less" scoped>
  .components-title{
    font-size: 14px;
    color: #666;
    overflow: hidden;
    padding: 8px 15px 8px 15px;
    background: #eff2f7;
    width: 100%;
    .icon{
      display: inline-block;
      height: 15px;
      width: 15px;

    }

  }
</style>
