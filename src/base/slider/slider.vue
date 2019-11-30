<template>
  <!--根组件-->
  <div class="swiper-container" ref="swiper" v-if="images.length">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in images" :key="index">
        <a :href="img.url">
          <img :src="img.pic" alt />
        </a>
      </div>
    </div>
    <div class="swiper-pagination" ref="swiperPagenation"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { setTimeout } from "timers";
export default {
  props: {
    images: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiper: null
    };  
  },
  mounted() {},
  watch: {
    images() {
      setTimeout(() => {
        this.swiper = new Swiper(this.$refs.swiper, {
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          observer: true,
          pagination: {
            el: this.$refs.swiperPagenation,
            clickable: true
          }
        });
      }, 20);
    }
  }
};
</script>

<style scoped lang='scss'>
.swiper-container {
  width:100%;
  img{
    width:100%;
    height: 100%;
  }
}
</style>
