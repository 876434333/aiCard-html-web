<template>
  <div class="ivu-input-wrapper edit-page-content">

    <h3 class="sel">选择图片 <span>(图片大小不超过2M,支持jpg、png格式，最多可上传{{maxSize}}张)</span></h3>
    <ul >
      <li
        class="image-item" v-for="(item,index) in imageList"
        :key="item.id"
        v-bind:class="{'is-active':item.is_active}"
        v-bind:style="perImage(item)"
        v-on:click="selectImage(index,item)">
        <div class="close" v-on:click="deleteImage(item)"><span></span></div>
        <img  src="../assets/img/ic_select_corner.png" class="coner_bottom" >
      </li>
      <li v-if="addItemVisibility" class="image-item add-image child-center" v-on:click="addImage()">
        +
      </li>
    </ul>

    <div class="mask-img" v-on:click="showUploadDialog = true">
      <div class="upload-img" v-bind:style="customStyle">

      </div>
      <div class="mask">
        <div class="self_i">
          上传
        </div>
      </div>
    </div>

    <div class="tip" v-if="currentImageHeight!=0">建议尺寸比例:{{currentImageWidth}}x{{currentImageHeight}}(宽x高)</div>
    <el-dialog
      title="图片剪裁"
      width="1000px"
      :visible.sync="showUploadDialog"
      center>
      <div class="copper-wrapper" ref="imageCropper" append-to-body>
        <copper v-bind:image="currentImage" v-bind:clearImage="!showUploadDialog"></copper>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Copper from "../components/cropper.vue"
  import common from './common'

  import modeImageSize from  '../constants/image'

  export default{
      mixins: [common],
      components:{
        Copper
      },

      mounted () {
        this.images = this.data.value;
        this.selectImage(0,this.data.value[0]);
      },
      computed: {
        imageList(){

          let modeInfo = Object.assign({},modeImageSize[this.currentImageMode.mode]);

          if(modeInfo == null){
              return [];
          }

          if(modeInfo.limitExpend){
            if(this.images.length>modeInfo.max){
                this.images.splice(modeInfo.max,this.images.length-modeInfo.max)
                this.selectImage(0,this.data.value[0]);
            }
            for (let i=0;i<modeInfo.max;i++){
              let item = Object.assign({},modeInfo.info[i]);
              if(this.images.length>i){
                item.url = this.images[i].url;
                item.is_active =  this.images[i].is_active;
                item.id = i;
              }
              this.images[i] = item;
              this.$set(this.images,i,item);
            }
          }else{
            for (let i=0;i<this.images.length;i++){
              let item = Object.assign({},modeInfo.info[0]);
              item.url = this.images[i].url;
              item.is_active =  this.images[i].is_active;
              item.id = i;
              this.images[i] = item;
              this.$set(this.images,i,item);
            }
            for (let i=this.images.length;modeInfo.info.length>i;i++){
              let item = modeInfo.info[i];
              this.images[i] = item;
              this.$set(this.images,i,item);
            }
          }

          return this.images;
        },
        addItemVisibility(){
          let modeInfo = modeImageSize[this.currentImageMode.mode];
          if(modeInfo == null) return false;
          return modeInfo.limitExpend?false:(this.images.length<modeInfo.max)
        },
        maxSize(){
            let sizeInfo = modeImageSize[this.currentImageMode.mode]
            return sizeInfo==null?0:sizeInfo.max;
        },
        currentImage(){
          return  this.showUploadDialog?this.images[this.currentIndex]:{};
        },
        customStyle() {
          let cssStyle = {};
          let scale = 1;
          if(this.currentImageHeight!=0){
            scale = this.currentImageHeight*1.0/this.currentImageWidth;
          }
          cssStyle.height = 200*scale+'px';

          if(this.currentIndex != -1){
            let image = this.images[this.currentIndex];
            if(image != null){
              let url = image.url;
              if(url!=""&&url!=null){
                let background = "url("+url+") no-repeat center center / contain";
                cssStyle.background=background;
              }
            }

          }


          return cssStyle;
        },
        ...mapGetters({
          currentImageMode: 'imageShowMode'
        })
      },
      data(){
          return {
              showUploadDialog:false,
              currentIndex:-1,
              currentImageHeight:0,
              currentImageWidth:0,
              watchImageShowMode:'',
              images:[
              ]
          };
      },
      watch:{
      },
      methods:{
        deleteImage(item){
          let index = this.images.indexOf(item);

          this.$delete(this.images,index);

        },
        addImage(){
          let modeInfo = modeImageSize[this.currentImageMode.mode];
          let item = Object.assign({},modeInfo.info[0]);
          item.url = "";
          this.$set(this.images,this.images.length,item);
        },
        perImage(item){
          if (item.url == "" || item.url == null){
              return {};
          }
          return {background:'url('+item.url+') center center / cover'}
        },
        selectImage:function(index,item){
          if(this.images.indexOf(item)<0){
              return;
          }
          for (var i=0;i<this.images.length;i++){
            this.images[i].is_active = false;
          }
          this.currentIndex = index;
          item.is_active = true;

          this.currentImageHeight=item.height;
          this.currentImageWidth=item.width;

          this.$set(this.images,index,item);
        }
      }
  }

</script>
<style scoped>

  h3.sel {
    font-weight: 500;
    margin-bottom: 15px;
    color: #555;
    font-size: 0.8rem;

  }
  h3.sel span{
    font-size: 12px;
    color: #999;

  }

  .ivu-input-wrapper {
    display: inline-block;
    width: 100%;
    position: relative;
    vertical-align: middle;
    line-height: normal;
  }
  ul{
    display: flex;
    flex-wrap:  wrap;
  }
  li{

    margin-right: 20px;
    margin-left: 0;
    margin-bottom: 12px;
    list-style: none;
    position: relative;
  }

  li:hover .close{
    display: inline-block;
  }

  li:hover .close span{
    display: inline-block;
  }

  li .close{
    display: none;
    position: absolute;
    width: 20px;
    height: 20px;
    top: -8px;
    right: -8px;
    border-radius: 50%;
    line-height: 20px;
    font-size: 18px;
    background-color: #fff;

  }

  .close span{
    width: 20px;
    height: 20px;
    background-image:url(../assets/ic_close.png);
    background-size:cover;
  }

  li.is-active{
    border: 1px solid #58b7ff;
  }

  img{
    width: 13px;
    height: 12px;
    position: absolute;
    bottom: 0;
    right: 0;
    display: none;
  }

  .is-active img{
    display: block;
  }
  .edit-page-content{
    position: relative;
    min-height: 44px;
    padding: 15px 30px;
    border: 1px solid #dddee1;
    border-top: none;
    background-color: #fff;
  }

  li.add-image{
    border-radius: 4px;
    border: 1px dotted #58b7ff;
    background: white;

    display: flex;
    align-items: center;
    justify-content: center;
    color: #58b7ff;
  }

  .copper-wrapper{
    height: 650px;
    width: 100%;
  }


  .image-item{
    height: 60px;
    width: 60px;
    line-height: 60px;
    background: url(../assets/img/ic_empty_image.png) center center / cover;
  }

  .mask-img{
    position: relative;
    display: inline-block;

    background-color: #eee;
  }
  .upload-img{
    width: 200px;
    height: 283.2px;
    display: block;
    background: url(../assets/img/ic_empty_image.png) center center / cover;
  }
  .mask-img .mask{
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    color: #fff;
    font-size: 14px;
    background-color: rgba(97,97,97,.30);
  }

  .mask-img:hover  .mask{
    display: block;
  }
  .mask-img .mask .self_i{
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 0;
    left: 0;
    margin: auto;
    height: 28px;
    text-align: center;
  }
  .tip {
    font-size: 0.5rem;
    margin-top: 5px;
    color: #999;
  }
</style>

