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
              <div
                class="disc-item"
                v-for="(item, index) in disc"
                :key="index"
                @click="selectItem(item)"
              >
                <img width="68" height="68" v-lazy="item.img" />
                <div class="info">
                  <h2 class="title">{{item.name}}</h2>
                  <span class="desc">{{item.uname}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
      <div class="loading-wrapper" v-if="!sliders.concat(disc).length">
        <loading />
      </div>
    </div>
    <transition name="slide">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
import Slider from "@/base/slider/slider.vue";
import { getSlider, getDisc } from "@/api/recommend";
import { ERR_OK } from "@/api/config";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      sliders: [],
      disc: []
    };
  },
  computed: {},
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
    },
    selectItem(disc) {
      this.setDisc(disc);
      this.$router.push({
        path: `/recommend/${disc.id}`
      });
    },

    ...mapMutations({
      setDisc: "SET_DISC"
    })
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
  .slide-enter,
  .slide-leave-to {
    transform: translateX(100%);
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.4s ease;
  }
  .content {
    width: 100%;
    position: fixed;
    top: px2rem(90);
    bottom: 0;
    overflow: hidden;
    .loading-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
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