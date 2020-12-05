<template>

  <div class="edit-page-content">

    <h3 class="sel">样式选择 <span>(切换样式将导致当前的内容丢失)</span></h3>
    <div class="chose_box">
      <div class="items" style="cursor:pointer" v-bind:class="{is_active:item.is_active}" v-for="item in imageStyleItems" :key="item.name" v-on:click="selectStyle(item)">
        <div class="r_style_box">
          <img :src="item.image"/>
        </div>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>


</template>
<style lang="less">
  .disable-upload {
    .el-upload--picture-card {
      display: none;
    }
  }

  .el-tag {
    em {
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 200px;
      overflow: hidden;
      font-style: normal;
      display: inline-block;
      vertical-align: middle;
    }
  }
  h3.sel {
    font-weight: 500;
    margin-bottom: 15px;
    color: #555;
    span{
      font-size: 12px;
      color: #999;

    }
  }

  .edit-page-content{
    position: relative;
    min-height: 44px;
    padding: 15px 30px;
    border: 1px solid #dddee1;
    border-top: none;
    background-color: #fff;
  }
  .chose_box {
    overflow: auto;
    margin-bottom: 30px;
    .items {
      float: left;
      margin-right: 32px;

      .r_style_box{

        img {
          display: block;
        }
      }
      span{
        display: block;
        margin-top: 8px;
        text-align: center;
        display: block;
        text-align: center;
      }
    }
  }

  .items.is_active{
    .r_style_box{
      border: 1px solid #7fc0f6;

    }
    span {
      color: #7fc0f6;
    }
  }

</style>
<script>
  import common from './common'
  import image_single from "../assets/img/ic_image_single.png"
  import image_marquee from "../assets/img/ic_image_marquee.gif"
  import image_three from "../assets/img/ic_image_three.png"
  import image_grid from "../assets/img/ic_image_grid.png"
  import { mapGetters, mapActions } from 'vuex'
  export default {
    mixins: [common],
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imageStyleItems:[
          {
            name:"单图",
            mode:'single',
            image:image_single,
            is_active:true
          },
          {
            name:"滑块图",
            mode:'marquee',
            image:image_marquee,
            is_active:false
          },
          {
            name:"三图",
            mode:'three',
            image:image_three,
            is_active:false
          },
//          {
//            name:"宫格图",
//            mode:'grid',
//            image:image_grid,
//            is_active:false
//          }
        ]
      }
    },
    computed: {

    },
    mounted () {

      this.changeImageShowMode(this.data.value.mode);
      this.imageStyleItems.forEach(item=>{

        if(item.mode == this.data.value.mode){
          item.is_active = true;
        }else{
          item.is_active = false;
        }
      })
    },
    methods: {
      ...mapActions([
        'changeImageShowMode'
      ]),
      handleSuccess(response, file, fileList) {
        console.log(response, file, fileList)
        this.data.value = (response[0].url.indexOf('http') === -1) ? 'http://' + response[0].url : response[0].url;
      },
      handleError(err, response, file) {
        console.log(err, response, file);
        this.$message.error(response.message)
      },
      handleRemove() {
        this.data.value = null
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      selectStyle(item){

        if(item.mode == "single"){
          this.$confirm('切换样式将导致当前的内容丢失, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.changeImageStyle(item);
          });
        }else{
            this.changeImageStyle(item);
        }




      },
      changeImageStyle(item){
        for (var i=0;i<this.imageStyleItems.length;i++){
          this.imageStyleItems[i].is_active = false;
        }
        item.is_active = true;
        this.data.value.mode = item.mode;
        this.changeImageShowMode(item.mode);
      }
    }
  }
</script>
