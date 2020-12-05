<template>
  <div class="vue-cropper-container" ref="imageCropper">
    <div class="title"><p style="width: 520px">裁剪</p> <p> 预览</p>  </div>
    <div class="cropper-img">
      <vueCropper
        ref="cropper"
        class="cropper"
        :img="cropper_info.img"
        :info="cropper_info.info"
        :full="cropper_info.full"
        :canScale="cropper_info.canScale"
        :autoCrop="cropper_info.autoCrop"
        :autoCropWidth="cropper_info.autoCropWidth"
        :autoCropHeight="cropper_info.autoCropHeight"
        :fixed="cropper_info.fixed"
        :fixedNumber="cropper_info.fixedNumber"
        @realTime="realTime"
      ></vueCropper>
      <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden','margin-left': '25px'}">
        <div :style="previews.div">
          <img :src="previews.url" :style="previews.img" >
        </div>
      </div>
      <img :src="cropper_info.img" class="single-previews" v-if="image.height==0"/>
    </div>


    <div class="bottom-btn">
      <el-button type="primary" icon="el-icon-search" v-on:click="clickChooseImage()">选择图片</el-button>
      <input type="file" ref="chooseImage" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/jpg" @change="uploadImg($event, 1)">
      <el-button type="primary" v-on:click="finish()">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>

  </div>

</template>
<style lang="less" scoped>
  .vue-cropper-container{
    .title{
      width: 100%;
      p{
        display: inline-block;
      }
    }
    height: 500px;
    width: 100%;
    .cropper-img{
      display: flex;
      .cropper{
        height: 500px;
        width: 500px;
      }
      img{
        margin-left:10px;
      }
    }


  }
  .single-previews{
    max-width: 400px;
    max-height: 300px;
  }
  .bottom-btn{
    margin-top: 15px;
  }
</style>


<script>
  import vueCropper from 'vue-cropper'
  import api from '../api/api'
  import emptyImage from '../assets/ic_empty_image.png'
  import point from '../assets/point.png'
  export default {
    props: ['image','clearImage'],
    mounted(){
      if(this.image != null){
        this.cropper_info.img = "";
        if (this.image.height!=0){
          this.cropper_info.autoCropWidth = this.image.width;
          this.cropper_info.autoCropHeight = this.image.height;
          this.fixedNumber = [this.image.width,this.image.height];
          this.cropper_info.autoCrop = true;
          this.$refs.cropper.startCrop()
        }else {
          this.cropper_info.autoCrop = false;
          this.$refs.cropper.clearCrop()
        }
      }
    },
    data: function () {
      return {
        singlePreviews:"",
        previews:"",
        isClear:false,
        cropper_info: {
          img: '',
          info: false,
          full:true,
          autoCrop: true,
          autoCropWidth: 400,
          autoCropHeight: 400,
          fixedNumber:[],
          fixedBox: true
        }
      }
    },
    watch:{
      clearImage: function(val, oldVal) {
        if(val){
          this.cropper_info.img = point;
        }
      }
    },
    computed: {
      previewsImage: function() {
        return this.previews.url==""?emptyImage:this.previews;
      }
    },
    methods: {
      clear(){
        this.cropper_info.img = "";
      },
      clickChooseImage () {
        this.$refs.chooseImage.click();
      },
      startCrop () {
        // start
        this.crap = true
        this.$refs.cropper.startCrop()
      },
      stopCrop () {
        //  stop
        this.crap = false
        this.$refs.cropper.stopCrop()
      },
      clearCrop () {
        // clear
        this.$refs.cropper.clearCrop()
      },
      // 实时预览函数
      realTime (data) {
        this.previews = data
      },
      finish () {
        if(this.cropper_info.img=="" || this.cropper_info.img==point){
            return;
        }
        if(this.image.height==0){

            this.uploadImage(this.cropper_info.img)
            return;
        }
        this.$refs.cropper.getCropData((data) => {
          this.uploadImage(data)
        })
      },

      uploadImage(data){
        //console.log(data)
        let base64data = data.substring(data.indexOf(',')+1,data.length);
        api.uploadImageBase64({imgdata:base64data}).then((res)=>{
          this.image.url = res.url;
          this.$message({
            message: '上传成功',
            type: 'success'
          });
        })
      },

      down (type) {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'demo'
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        }
      },

      uploadImg (e, num) {
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.cropper_info.img = data
          }
        }
        // 转化为base64
        reader.readAsDataURL(file)
        // 转化为blob
        //reader.readAsArrayBuffer(file)
      }
    },
    components: {
      vueCropper
    }
  }
</script>
