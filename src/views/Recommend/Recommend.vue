<template>
  <!--根组件-->
  <div class="recommend">
    <div class="content">
      <scroll class="scroll" @data="sliders.concat(disc)">
        <div>
          <Slider :images="sliders" />
          <div class="disc-wrapper">
            <h2 class="h2">歌单推荐</h2>
            <div class="disc-list" v-if="disc.length">
              <div class="disc-item" v-for="(item, index) in disc" :key="index">
                <img width="68" height="68" :src="item.img" />
                <div class="info">
                  <h2 class="title">{{item.name}}</h2>
                  <span class="desc">{{item.uname}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Slider from "@/base/slider/slider.vue";
import { getSlider, getDisc } from "@/api/recommend";
import { ERR_OK } from "@/api/config";
export default {
  data() {
    return {
      sliders: [],
      disc: []
    };
  },
  components: {
    Slider
  },
  methods: {
    _getSlider() {
      getSlider().then(res => {
        if (res.code === 0) {
          this.sliders = res.data.slider;
        }
      });
    },
    _getDisc() {
      getDisc().then(res => {
        if (res.code === ERR_OK) {
          this.disc = res.data.data;
        }
      });
    }
  },
  created() {
    this._getSlider();
    this._getDisc();
  }
};
</script>

<style scoped lang='scss'>
.recommend {
  width: 100%;
  height: 100%;
  position: relative;
  .content {
    width:100%;
    position: fixed;
    top: px2rem(90);
    bottom:0;
    overflow: hidden;
  }
  .disc-wrapper {
    box-sizing: border-box;
    width: 100%;
    padding: 15px;
    .h2 {
      line-height: 2;
      font-size: $font-size-mm;
      text-align: center;
      color: $theme-color;
    }
    .disc-list {
      width: 100%;
      .disc-item {
        font-size: $font-size-m;
        width: 100%;
        display: flex;
        margin-bottom: 15px;
        .info {
          margin-left: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .desc {
            color: $text-color-d;
          }
        }
      }
    }
  }
}
</style>