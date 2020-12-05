<template>
    <div class="module-container">
        <div class="poster">
            <div class="ph-empty dashed" v-if="!data.image.value">
                图片
            </div>

            <div class="single" v-if="data.imageShowMode.value.mode=='single'" >
                <a class="img">
                    <img :src="buildUrl(data.image.value[0].url)" alt="">
                </a>
            </div>

            <div class="marquee" v-if="data.imageShowMode.value.mode=='marquee'">
              <a class="img" v-for="item in data.image.value">
                <img :src="buildUrl(item.url)" alt="">
              </a>
            </div>

            <div class="three" v-if="data.imageShowMode.value.mode=='three'">
              <a class="img" v-for="(item,index) in data.image.value" >
                <img :src="buildUrl(item.url)" alt="" >
              </a>
            </div>

        </div>
    </div>
</template>
<style lang="less" scoped>

  .poster {
    text-align: center;


    .single{
      padding: 0px;
      a{
        padding: 0px;
        width: 100%;

        img {
          display: inline-block;
          max-width: 100%;
          width: auto;
          height: auto;
          overflow:hidden;
        }
      }
    }



    .marquee{
      width: 100%;
      height: 150px;
      overflow-x: scroll;
      /* 内容会被裁剪，会以滚动条显示 */
      overflow-y: hidden;  /* 超出内容不可见 */
      white-space: nowrap;  /* 不换行 */
      padding-right: 8px;

      img{
        height: 130px;
        width: 220px;
        border-radius: 5px;
        margin: 10px 0px 10px 10px;
      }

    }

    .three{
        margin: 5px 8px 5px 8px;
        position: relative;
        height: 170px;

        a:nth-child(1){
          position: absolute;
          left: 0;
          top: 0;
          img {
            width: 220px;
            height: 170px;
          }
        }

        a:nth-child(2){
          position: absolute;
          right: 0;
          top: 0;
          img{
            width: 130px;
            height: 80px;
          }

        }

        a:nth-child(3){
          position: absolute;
          right: 0;
          top: 90px;
          img{
            width: 130px;
            height: 80px;
          }

        }

        a{
          img{
            border-radius: 5px;
          }
        }

    }
  }
</style>
<script>
    import empty_image from '../assets/ic_empty_image.png';
    export default {
        props: ['data'],

        data() {
            return {
                emptyImage:empty_image
            }
        },
        methods:{
          buildUrl(url){
           return  url?url:this.emptyImage;
          }
        }
    }
</script>
