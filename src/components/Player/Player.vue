<template>
  <!--根组件-->
  <div class="player">
    <transition name="slide-full">
      <div v-show="fullScrenn" class="player-full">
        <div class="bgImg">
          <img :src="currentSong.albumpic" width="100%" height="100%" />
        </div>
        <div class="header">
          <span class="back" @click.prevent="back">
            <i class="iconfont icon-downarrow"></i>
          </span>
          <div class="name">
            <span class="title" v-html="currentSong.songname"></span>
            <span class="singer" v-html="currentSong.artist"></span>
          </div>
        </div>
        <div class="middle">
          <div class="swiper-container" ref="swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide cd">
                <div class="cd-wrapper play" :class="{run:this.playing,pause:!this.playing}">
                  <div class="cd-img">
                    <img :src="currentSong.albumpic" width="100%" height="100%" alt />
                  </div>
                </div>
                <div class="commont">
                  <span class="commont-btn">
                    <i class="iconfont icon-commont"></i>
                  </span>
                  <span class="current-lyric">当前歌词</span>
                </div>
              </div>
              <div class="swiper-slide lyric">这里是歌词</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="currentTime">{{formatTime(currentTime)}}</span>
            <Progress :percent="percent" @barTouchEnd="barTouchEnd" />
            <span class="duration">{{formatTime(currentSong.duration)}}</span>
          </div>
          <div class="btn">
            <div class="play-mode">
              <i class="iconfont icon-suiji"></i>
            </div>
            <div class="prev" @click.stop="prev">
              <i class="iconfont icon-kuaitui"></i>
            </div>
            <div class="play" @click.stop="togglePlay">
              <i class="iconfont" :class="playIcon"></i>
            </div>
            <div class="next" @click.stop="next">
              <i class="iconfont icon-kuaijin"></i>
            </div>
            <div class="favorite">
              <i class="iconfont icon-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="player-mini" v-show="!fullScrenn" @click.prevent="open">
        <div class="mini-cd play" :class="{run:this.playing,pause:!this.playing}">
          <img :src="currentSong.albumpic" width="80%" height="80%" />
        </div>
        <div class="info">
          <span class="song-name">{{currentSong.songname}}</span>
          <span class="cur-lyric">{{currentSong.artist}}</span>
        </div>
        <div class="cicle-progress-wrapper">
          <div class="cicle" @click.stop="togglePlay">
            <i class="iconfont" :class="playIcon"></i>
          </div>
        </div>
        <div class="playlist">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url || ''" @play="canplay" @timeupdate="timeupdate"></audio>
  </div>
</template>

<script>
import Vue from "vue";
import Swiper from "swiper";
import { getSongUrl } from "@/api/song";
import { mapGetters, mapMutations } from "vuex";
import Progress from "@/base/progress/progress.vue";
export default {
  data() {
    return {
      onReady: false,
      currentTime: 0,
      percent: 0,
    };
  },
  methods: {
    open() {
      this.setFullScrenn(true);
    },
    back() {
      this.setFullScrenn(false);
    },
    canplay() {
      this.onReady = true;
    },
    togglePlay() {
      if (!this.playing) {
        this.setPlaying(true);
      } else {
        this.setPlaying(false);
      }
    },
    next() {
      if (!this.onReady) {
        return;
      }
      let index = this.currentIndex + 1;
      if (!this.onReady) {
        return;
      }
      index = index === this.playlist.length - 1 ? 0 : index;
      this.setCurrentIndex(this.currentIndex + 1);
    },
    prev() {
      if (!this.onReady) {
        return;
      }
      let index = this.currentIndex - 1;
      if (!this.onReady) {
        return;
      }
      index = index < 0 ? this.playlist.length - 1 : index;
      this.setCurrentIndex(index);
    },
    pad(val, n = 2) {
      let len = val.toString().length;
      while (len < 2) {
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
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
      this.percent = this.currentTime / this.currentSong.duration;
    },
    barTouchEnd(percent){
      this.$refs.audio.currentTime = this.currentSong.duration * percent;
    },

    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setFullScrenn: "SET_FULLSCRENN",
      setCurrentIndex: "SET_CURRENTINDEX"
    })
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.swiper && this.swiper.updateSize();
    });
    this.$nextTick(() => {
      this.swiper = new Swiper(this.$refs.swiper);
    });
  },
  computed: {
    playIcon() {
      return this.playing ? "icon-bofang" : "icon-zanting";
    },
    ...mapGetters([
      "playing",
      "fullScrenn",
      "playlist",
      "mode",
      "currentSong",
      "currentIndex"
    ])
  },

  watch: {
    currentSong: {
      immediate: true,
      handler(song, oldSong) {
        if (!this.playing) {
          this.togglePlay();
        }
        if (!song.url) {
          getSongUrl(song.rid).then(res => {
            Vue.set(song, "url", res.url);
          });
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          song.url && this.$refs.audio.play();
        }, 1000);
      }
    },
    playing(p) {
      p ? this.$refs.audio.play() : this.$refs.audio.pause();
    }
  },
  components: {
    Progress
  }
};
</script>

<style scoped lang='scss'>
.player {
  position: relative;
  .player-full {
    &.slide-full-enter-active,
    &.slide-full-leave-active {
      transition: all 0.3s;
    }
    &.slide-full-enter,
    &.slide-full-leave-to {
      transform: translateY(100%);
      opacity: 0;
    }
    width: 100vw;
    height: 100vh;
    font-size: $font-size-mm;
    .bgImg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      filter: blur(20px);
      z-index: -1;
      transform: scale(1.1);
    }
    .header {
      height: px2rem(48);
      width: 100%;
      position: fixed;
      top: 0;
      display: flex;
      align-items: center;
      .back {
        z-index: 51;
        position: absolute;
        left: px2rem(15);
        .iconfont {
          font-size: $font-size-ll;
        }
      }
      .name {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        position: absolute;
        text-align: center;
        justify-content: space-evenly;

        .singer {
          font-size: $font-size;
          color: $text-color-l;
        }
      }
    }
    .middle {
      width: 100%;
      position: fixed;
      top: px2rem(48);
      bottom: px2rem(170);
      .swiper-container {
        width: 100%;
        height: 100%;
        .cd {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .commont {
            bottom: px2rem(23);
            left: 20px;
            .iconfont {
              position: absolute;
              left: px2rem(20);
              font-size: $font-size-ll;
            }
          }

          .cd-wrapper {
            border-radius: 50%;
            overflow: hidden;
            border: solid 15px $text-color-d;
            width: px2rem(270);
            height: px2rem(270);
            &.play {
              animation: rotate 30s infinite linear;
            }
            &.pause {
              animation-play-state: paused;
            }
            &.run {
              animation-play-state: running;
            }
          }
        }
      }
    }
    .bottom {
      position: fixed;
      bottom: 0;
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      bottom: px2rem(50);
      .progress-wrapper {
        width: 100%;
        transform: translateY(px2rem(-10));
        position: relative;
        display: flex;
        align-items: center;
        .currentTime {
          position: absolute;
          left: 0;
          left: px2rem(10);
        }
        .duration {
          position: absolute;
          right: px2rem(10);
        }
      }
      .btn {
        transform: translateY(px2rem(10));
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .play > .iconfont {
          font-size: px2rem(50);
        }
        .play-mode > .iconfont,
        .favorite > .iconfont {
          font-size: $font-size-l;
        }
        .next > .iconfont,
        .prev > .iconfont {
          font-size: px2rem(35);
        }
      }
    }
  }
  .player-mini {
    height: px2rem(48);
    background-color: $bg-hig-color;
    width: 100%;
    font-size: $font-size-mm;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    &.slide-enter-active,
    &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter,
    &.slide-leave-to {
      transform: translateY(100%);
      opacity: 0;
    }
    .mini-cd {
      height: 100%;
      width: px2rem(48);
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      &.play {
        animation: rotate 30s infinite linear;
      }
      &.pause {
        animation-play-state: paused;
      }
      &.run {
        animation-play-state: running;
      }
      img {
        border-radius: 50%;
      }
    }
    .playlist {
      position: absolute;
      right: 10px;
    }
    .cicle-progress-wrapper {
      position: absolute;
      right: 50px;
      .cicle {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        .iconfont {
          z-index: -1;
          font-size: 30px;
        }
        width: 30px;
        height: 30px;
        line-height: 30px;
        border: solid 2px $text-color;
        border-radius: 100%;
      }
    }
    .info {
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      justify-content: space-evenly;
      .song-name {
        font-size: $font-size-m;
      }
      .cur-lyric {
        font-size: $font-size;
      }
    }
  }
  width: 100%;
  z-index: 100;
  position: fixed;
  top: 0;
}
@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>