<template>
  <div class="modules-container">
    <el-tabs value="complex-modules" type="card">
      <el-tab-pane label="模块组件" name="complex-modules">
        <div class="modules">
          <ul class="items">
            <li v-for="item in groups" title="按住拖拽" @mousedown="drag(item)" class="item">
              <img :src="item.icon"/>
              {{item.alias}}
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="基本组件" name="base-modules">

        <div class="modules" v-for="moduleItem in modules">
          <div class="title">{{moduleItem.title}}</div>
          <ul class="items">
            <li v-for="item in moduleItem.items" title="按住拖拽" @mousedown="drag(item)" class="item">
              <img :src="item.icon"/>
              {{item.alias}}
            </li>
          </ul>
        </div>

      </el-tab-pane>
    </el-tabs>
    <drag-drop></drag-drop>
  </div>

</template>
<script>
  import _ from 'lodash'
  import { mapGetters, mapActions } from 'vuex'
  import {
    modules
  } from '../modules'
  import {
      groups
  } from '../modules/group'
  import dragDrop from './drag-drop.vue'

  export default {
    components: {
      dragDrop
    },

    computed: {
      ...mapGetters({
        renderData: 'render',
        items: 'renderItems',
        currentModule: 'currentModule'
      }),
      currentNodeKey(){
        return this.currentModule._timestamp ? this.currentModule._timestamp : 0
      }
    },

    methods: {
      ...mapActions([
        'editDragModule',
        'editRenderItem'
      ]),
      drag(item) {
        if (this.onlyCanAddOneVideo(item)){
          return;
        }

        this.editDragModule(item)
      },
      onlyCanAddOneVideo(item){
        // if(item.type=="playVideo"){
        //   for (let i=0;i<this.renderData.items.length;i++){
        //     let node = this.renderData.items[i];
        //     if (node.type == "playVideo"){
        //       this.$message({
        //         message: '抱歉，只允许上传一个视频',
        //         type: 'warning'
        //       });
        //       return true;
        //     }
        //   }
        // }
        return false;
      },
      handleNodeClick(node) {
        this.editRenderItem(node);
      }
    },
    data() {
      return {
        modules,
        groups,
        defaultProps: {
          children: 'children',
          label: 'alias'
        }
      }
    }
  }
</script>


<style lang="less">
  .modules-container {
    background-color: white;
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs--border-card {
      box-shadow: none;
      border: none;
      .el-tabs__content {
        padding: 1px 0;
      }
    }
    .el-tree {
      border: none;
    }
    .title {
      font-size: 15px;
      padding: 5px 10px;
      color: #8492a6;
      border-top: 1px solid #d3dce6;
      border-bottom: 1px solid #d3dce6;
    }
    .items {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      .item {
        color: #8492A6;
        user-select: none;
        width: 50%;
        height: 85px;
        border-top: 0.5px solid #EFF2F7;
        border-right: 1px solid #EFF2F7;
        border-bottom: 1px solid #EFF2F7;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        cursor: move;
        font-size: 13px;
        &:nth-child(2n){
          border-right: 0;
        }
        &:hover {
          color: #475669;
          background: #EFF2F7;
        }
        i {
          margin-bottom: 10px;
        }
      }
    }
  }

  .text-center {
    text-align: center;
  }

  .ivu-tabs-bar {
    margin-bottom: 0px;
  }
</style>
