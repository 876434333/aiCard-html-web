<template>
  <div class="root">
    <header>
      <figure>
        <h1>官网编辑</h1>
      </figure>
      <el-button size="small" type="primary" icon="check" @click="uploadHomePage">保存并发布</el-button>

    </header>
    <div class="edit-container">

      <div class="design">

        <modules-container></modules-container>
        <simulator></simulator>
        <module-meta-property></module-meta-property>

      </div>


    </div>
  </div>

</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import _ from 'lodash'

  import modulesContainer from "./components/modules-container.vue"
  import simulator from "./components/simulator.vue"
  import moduleMetaProperty from "./components/module-meta-property.vue"
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import vPlayBack from 'v-playback';
  import Vue from "vue"
  import filters from './filters'
  import store from './store'

  import moduleTypes from './constants/module-types'
  import api from './api/api'

  Vue.use(ElementUI);
  Vue.use(vPlayBack);

  Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

  export default {
    store,
    data () {
      return {
      }
    },
    components: {
      modulesContainer,
      simulator,
      moduleMetaProperty
    },
    mounted() {
      this.addDataWatcher()
    },
    created: function () {

      api.getHomePage().then(res=>{
        console.log(res)
        let items = [];
        for(let i=0;i<res.length;i++){
            let item = JSON.parse(res[i].textContent);
            if (item.type == "companyPhone") {
              item.data.phone.rules = [
                {
                  validator:function (rule,value,callback) {
                    let tel = rule.field;
                    let isTel = /^[0-9\+\-]*$/.test(tel);
                    if (!isTel){
                      callback(new Error("只允许输入数字,'-'和'+'"));
                      return;
                    }
                    callback();
                  },trigger: 'blur',
                }
              ];
            }
            items.push(item);
        }
        this.editRenderData({
          items:items,
          title:'',
          config:{}
        })
      })

    },
    beforeDestroy() {
      this.changed = -1;
      this.removeDataWatcher();

    },

    watch: {
      '$route': 'fetchData'
    },
    computed: {
      ...mapGetters({
        loading: 'loading',
        renderData: 'render'
      })
    },
    methods: {
      ...mapActions([
        'focusDocumentTitle',
        'editRenderData',
        'editRenderItem',
        'resetRenderState'
      ]),
      uploadHomePage () {
        let reverse = {};
        for(let key in moduleTypes){
            reverse[moduleTypes[key]] = key;
        }

        let renderData = this.getData();
        let data = [];
        for (let i=0;i<renderData.items.length;i++){
          let item = renderData.items[i];

          if(this.checkImageNotEmpty(item)){
            return;
          }
          if(this.checkTelephone(item)){
            return;
          }

          if (item.type == "swipe" || item.type == "poster"){
            let images = [];
            console.log(item)
            item.data.image.value.forEach(item=>{
              if(item.url != ""){
                images.push(item);
              }
            })
            item.data.image.value = images;
          }
          let moduleLine = {
            config:'',
            text_content:JSON.stringify(item),
            type:reverse[item.type]
          };
          data.push(moduleLine);
        }
        api.uploadHomePage(data).then(res=>{
          this.$message({
            message: '上传成功',
            type: 'success'
          });
        })
      },
      addDataWatcher() {
        this.watchItems = this.$watch('renderData.items', function(val){
          //console.log("watch items", val)
          this.changed--
          this.removeDataWatcher();
        }, {
          deep: true
        })
        this.watchTitle = this.$watch('renderData.title', function(val){
          //console.log("watch title", val)
          this.changed--
          this.removeDataWatcher();
        })
      },
      removeDataWatcher() {
        if(this.changed < 0){
          //unwatch
          this.watchItems && this.watchItems();
          this.watchTitle && this.watchTitle();
        }
      },
      getData() {
        let {
          items,
          config,
          title
        } = _.clone(this.renderData)

        let data = {
          items,
          config,
          title
        }

        return data
      },
      checkImageNotEmpty(item){
        if(item.type == "poster"){
          let mode = item.data.imageShowMode.value.mode;
          if(mode == "three"){
            for (let i=0;i<item.data.image.value.length;i++){
                let img = item.data.image.value[i];
                if (img.url == ""){
                  this.$message({
                    message: '还有图片未上传',
                    type: 'warning'
                  });
                  this.editRenderItem(item);
                  return true;
                }
            }
          }
        }
        return false;
      },
      checkTelephone(item){

        if(item.type == "companyPhone"){
          let tel = item.data.phone.value;
          if(/^[0-9\+\-]*$/.test(tel)){
            return false;
          }else {
            console.log(item)
            this.$message({
              message: "电话号码只允许数字,'-'和'+'",
              type: 'warning'
            });
            this.editRenderItem(item);
            return true;
          }
        }
      },
      beforeunload(e) {
        if(this.changed >= 0) return;

        var confirmationMessage = "可能有数据未保存";
        e.returnValue = confirmationMessage;
        return confirmationMessage
      }
    },

    data() {
      return {
        uploading: false,
        watchItems: null,
        watchTitle: null
      }
    }
  }

</script>
<style scoped lang="less">

  .root{
    height: 100%;
    overflow: hidden;
  }
  header{
    height: 60px;
    vertical-align: middle;
    background-color: #324057;
    width: 100%;
    z-index: 1111;
    figure {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-flex-align: center;
      align-items: center;
      width: 500px;
      float: left;
      h1 {
        line-height: 60px;
        font-size: 22px;
        color: #fff;
        display: inline-block;
        margin-left: 30px;
        font-weight: 500;
      }
    }
    button {
      float: right;
      margin-top: 15px;
      margin-right: 24px;
    }
  }

  .edit-container{
    margin-top: 1px;
    height: 100%;
    .design{
      display: flex;
      height: 100%;
    }
  }

  .module-container{
    min-width: 230px;
    border-radius: 0!important;
    border: 0!important;
    box-shadow: 3px 0 20px 0 hsla(0,0%,82%,.5)!important;
    height: 100%;
    background-color: white;
  }

  .simulator{
    overflow: auto;
    height: 100%;
    width: 100%;
    padding-bottom: 130px;
    background-color: #f0f0f0;
  }

  .module-meta-property{
    min-width: 550px;
    height: 100%;
    background-color: white;
  }

  .center{
    display: flex;
    align-items:center;
    justify-content:center;
  }



  .text-right {
    text-align: right;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .fa-icon {
    width: auto;
    height: 1em;
  }

</style>
