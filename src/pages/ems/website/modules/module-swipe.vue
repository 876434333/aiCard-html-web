<template>
<div class="module-container">
  <div class="poster-swipe">
    <div class="ph-empty dashed" v-if="isEmpty">
      幻灯片
    </div>

    <div v-if="items.length">
      <swiper auto loop :aspect-ratio="aspect" dots-position="center">
        <swiper-item v-for="(item, index) in items" :key="index">
          <a ><img :src="buildUrl(item.url)"></a>
        </swiper-item>
      </swiper>
    </div>
  </div>
</div>
</template>
<script>
import Swiper from '../components/swiper/index.vue'
import SwiperItem from '../components/swiper/swiper-item.vue'
import defaultImg from '../assets/img/ic_empty_image.png'

export default {
  props: ['data'],
  data(){
      return {
        defaultImg:defaultImg
      };
  },

  components: {
    'swiper': Swiper,
    'swiper-item': SwiperItem
  },
  methods:{
    buildUrl(url){
      return  url?url:this.defaultImg;
    },
  },
  computed: {


    aspect(){
      let image = this.data.image.value[0];
      let aspect = image.height/image.width;
      return aspect;
    },

    isEmpty() {
      return this.data.image.value.length == 0;
    },

    items() {
      return this.data.image.value;
    }
  },

  data() {
    return {
      speed: 600
    }
  }
}
</script>
