<template>
  <!--根组件-->
  <transition name="mv">
    <div class="detail" v-if="showMV && mv.id">
      <div class="header">
        <div class="back" @click="hide">
          <i class="iconfont icon-leftarrow"></i>
        </div>
        <div class="video-wrapper">
          <video playsinline ref="video" :src="mv.url" autoplay width="100%" height="100%"></video>
        </div>
      </div>

      <div class="bot">
        <div class="info">
          <div class="title">{{mv.name}} - {{mv.artist}}</div>
          <div class="cnt">播放量：{{mv.mvPlayCnt}}</div>
        </div>

        <div class="commont-wrapper" >
          <Commont @scrollToEnd="scrollToEnd" ref="commont" :commont="commont" ani="commont" :header="false" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { getCommont } from "@/api/song";
import Commont from "@/components/Commont/Commont.vue";
export default {
  props: {
    mv: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      showMV: false,
      page: 1,
      commont: {}
    };
  },
  methods: {
    show() {
      this.showMV = true;
    },
    hide() {
      this.showMV = false;
    },
    _getMVCommont(mv) {
      getCommont(7, mv.id, this.page).then(res => {
        this.commont = res;
      });
    },
    scrollToEnd(){
      getCommont(7,this.mv.id,this.page+1).then(res=>{
        let newRows = this.commont.rows.concat(res.rows);
        res.rows = newRows;
        this.commont = res;
      })
    }
  },
  created() {
    this.commont = null;
  },
  watch: {
    mv: {
      deep: true,
      handler(val) {
        this._getMVCommont(val);
        //ios autoplay 没用，就这样
        setTimeout(()=>{
          this.$refs.video.play();
        },1000)
      }
    }
  },
  components: {
    Commont
  }
};
</script>

<style scoped lang='scss'>
.detail {
  z-index: 101;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: $bg-color;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(200);
    .back {
      z-index: 10;
      position: absolute;
      top: 0px;
      left: 15px;
    }
    .video-wrapper {
      height: 100%;
      width: 100%;
    }
  }
  .bot {
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    top: px2rem(200);
    bottom: 0;
    font-size: $font-size-l;
    .info {
      width: 100%;
      height: px2rem(58);
      padding-left: 15px;
      .title {
        font-size: $font-size-l;
        font-weight: bold;
        color: $text-color-ll;
        line-height: 1.5;
      }
      .cnt {
        font-size: $font-size-m;
        line-height: 1.5;
        color: $text-color-d;
      }
    }
    .commont-wrapper {
      width: 100%;
      position: absolute;
      top: px2rem(58);
      bottom: 0;
    }
  }
  &.mv-enter-active,
  &.mv-leave-active {
    transition: all 0.4s ease;
  }
  &.mv-enter,
  &.mv-leave-to {
    transform: translateX(100%);
  }
}
</style>