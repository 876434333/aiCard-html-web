<template>
    <div class="module-container">
        <div>

            <div class="video-container">
              <video ref="mVideo" controls="controls" height="210" :src="data.video.value" :poster="posterUrl"></video>
            </div>
        </div>
    </div>
</template>
<style lang="less">
 .video-container{
   background-color: #454545;
   video{
     width: 100%;
   }
 }
</style>
<script>

    export default {
      props: ['data'],

      data() {
          return {
            imageUrl:"",
            videoUrl:"",
          }
      },
      watch:{
          data:{
            handler: function () {},
            deep: true
          }
      },
      computed: {
        posterUrl: function () {
          if (this.data.image.value.length == 0) return 0;


          let url = this.imageUrl;
          this.data.image.value.forEach(function (item) {
            url = item.url;
          });

          if(this.$refs!=null&&this.$refs.mVideo!=null){
            this.$refs.mVideo.load();
          }
          this.imageUrl = url;
          return this.imageUrl;
        }
      }
    }
</script>
