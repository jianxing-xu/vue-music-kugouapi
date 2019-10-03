<template>
  <!--根组件-->
  <transition name="mv">
    <div class="detail" v-if="showMV && mv.id">
      <div class="header">
        <div class="back" @click="hide">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="video-wrapper" @click.stop="showMask">
          <div class="play" v-show="isMask">
            <i   class="iconfont" :class="playIcon()" @click="togglePlaying"></i>
            <div class="progress-wrapper">
              <span class="current-time">{{formatTime(currentTime)}}</span>
              <Progress :percent="percent" @barTouchEnd="barTouchEnd" />
              <span class="duration">{{formatTime(mv.duration)}}</span>
            </div>
          </div>
          <video
            @timeupdate="timeupdate"
            playsinline
            ref="video"
            :src="mv.url"
            width="100%"
            height="100%"
            loop
            autoplay
          ></video>
        </div>
      </div>

      <div class="bot">
        <div class="info">
          <div class="title">{{mv.name}} - {{mv.artist}}</div>
          <div class="cnt">播放量：{{mv.mvPlayCnt}}</div>
        </div>

        <div class="commont-wrapper">
          <Commont
            @scrollToEnd="scrollToEnd"
            ref="commont"
            :commont="commont"
            ani="commont"
            :header="false"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { getCommont } from "@/api/song";
import Commont from "@/components/Commont/Commont.vue";
import Progress from "@/base/progress/progress.vue";
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
      commont: {},
      currentTime: 0,
      playing: true,
      isMask: true
    };
  },
  computed: {
    percent() {
      return this.currentTime / this.mv.duration;
    }
  },
  methods: {
    playIcon() {
      return this.playing ? "icon-bofang" : "icon-zanting";
    },
    show() {
      this.showMV = true;
    },
    hide() {
      this.showMV = false;
    },
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
    },
    pad(val, n = 2) {
      let len = val.toString().length;
      while (len < n) {
        val = "0" + val;
        len++;
      }
      return val;
    },
    formatTime(time) {
      let minute = (time / 60) | 0;
      let second = time % 60 | 0;
      return `${this.pad(minute)}:${this.pad(second)}`;
    },
    _getMVCommont(mv) {
      getCommont(7, mv.id, this.page).then(res => {
        this.commont = res;
      });
    },
    scrollToEnd() {
      getCommont(7, this.mv.id, this.page + 1).then(res => {
        let newRows = this.commont.rows.concat(res.rows);
        res.rows = newRows;
        this.commont = res;
      });
    },
    barTouchEnd(percent) {
      this.$refs.video.currentTime = this.mv.duration * percent;
    },
    showMask() {
      this.isMask = !this.isMask;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isMask = false;
      }, 4000);
    },
    togglePlaying() {
      if (this.$refs.video.paused) {
        this.$refs.video.play();
        this.playing = true;
      } else {
        this.$refs.video.pause();
        this.playing = false;
      }
      this.showMask();
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
        setTimeout(() => {
          this.$refs.video.play();
        }, 1000);
        this.playing = true;
        this.showMask();
      }
    }
  },
  components: {
    Commont,
    Progress
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
    height: px2rem(211);
    .back {
      z-index: 10;
      position: absolute;
      top: 0px;
      left: 15px;
      padding:5px 10px;
    }
    .video-wrapper {
      height: 100%;
      width: 100%;
      position: relative;
      .play {
        width: 100%;
        height: 100%;
        z-index: 9;
        background-color: rgba(0, 0, 0, 0.3);
        .iconfont {
          position: absolute;
          font-size: px2rem(40);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .progress-wrapper {
          width: 100%;
          position: absolute;
          bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          .current-time,
          .duration {
            padding: 0 10px;
            font-size: $font-size;
            font-family:'Times New Roman', Times, serif;
          }
        }
        font-size: $font-size-mm;
        position: absolute;
      }
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
      padding-top: 10px;  
      .title {
        width:70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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