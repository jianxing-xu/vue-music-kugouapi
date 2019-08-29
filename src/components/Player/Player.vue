<template>
  <!--根组件-->
  <transition name="slide">
    <div class="player" v-if="playing">
      <div
        v-show="fullScrenn"
        class="player-full"
        :style="bgStyle"
      >
        <div
          class="bgImg"
          :style="bgStyle"
        ></div>
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
                <div class="cd-wrapper">
                  <div class="cd-img">
                    <img
                      :src="currentSong.albumpic"
                      width="100%"
                      height="100%"
                      alt
                    />
                  </div>
                </div>
                <div class="commont">
                  <span class="commont-btn">
                    <i class="iconfont icon-commont"></i>
                  </span>
                </div>
                <span class="current-lyric">当前歌词</span>
              </div>
              <div class="swiper-slide lyric">这里是歌词</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">进度条-----------</div>
          <div class="btn">
            <div class="play-mode">
              <i class="iconfont icon-suiji"></i>
            </div>
            <div class="prev">
              <i class="iconfont icon-kuaitui"></i>
            </div>
            <div class="play">
              <i class="iconfont icon-zanting"></i>
            </div>
            <div class="next">
              <i class="iconfont icon-kuaijin"></i>
            </div>
            <div class="favorite">
              <i class="iconfont icon-favorite"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="player-mini" v-show="!fullScrenn" @click.prevent="open">
        <div class="mini-cd">
          <img
            src="http://img1.kwcdn.kuwo.cn/star/userpl2015/43/57/1566796820164_414900543_500.jpg"
            width="80%"
            height="80%"
            alt
          />
        </div>
        <div class="info">
          <span class="song-name">极乐净土</span>
          <span class="cur-lyric">尽享受这狂欢无尽的黑夜</span>
        </div>
        <div class="cicle-progress-wrapper">
          <div class="cicle"></div>
        </div>
        <div class="playlist">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
      <audio ref="audio" :src="currentSong.url || ''" @play="canplay"></audio>
    </div>
  </transition>
</template>

<script>
import Swiper from "swiper";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      onReady: false
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

    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setFullScrenn: "SET_FULLSCRENN"
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.swiper = new Swiper(this.$refs.swiper);
    });
  },
  computed: {
    ...mapGetters([
      "playing",
      "fullScrenn",
      "playlist",
      "mode",
      "currentSong",
      "currentIndex"
    ]),
    bgStyle(){
        return `background: url(${this.currentSong.albumpic}) no-repeat center center;background-size:100% 100%`
    }
  },

  watch:{
      currentSong(){
          this.currentSong.url && this.$refs.audio.play();
      },
      playing(){

      },

  }
};
</script>

<style scoped lang='scss'>
.slide-enter-active,
.slide-leave-active {
  .player-full,
  .player-mini {
    transition: all 0.3s;
  }
}
.slide-enter,
.slide-leave-to {
  .player-full,
  .player-mini {
    transform: translateY(100%);
    opacity: 0;
  }
}
.player {
  position: relative;
  .player-full {
    width: 100vw;
    height: 100vh;
    font-size: $font-size-mm;
    .bgImg {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      filter: blur(20px);
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
      bottom: px2rem(150);
      .swiper-container {
        width: 100%;
        height: 100%;
        .cd {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .current-lyric {
            padding-top: 20px;
          }
          .commont {
            position: absolute;
            bottom: 0;
            left: 20px;
            .iconfont {
              font-size: $font-size-ll;
            }
          }

          .cd-wrapper {
            border-radius: 50%;
            overflow: hidden;
            border: solid 15px $text-color-d;
            width: px2rem(300);
            height: px2rem(300);
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      bottom: px2rem(85);
      .progress-wrapper {
        transform: translateY(20px);
      }
      .btn {
        transform: translateY(40px);
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
    .mini-cd {
      height: 100%;
      width: px2rem(48);
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      &.play {
        animation: rotate 6s infinite linear;
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
        width: 30px;
        height: 30px;
        border: solid 3px $text-color;
        border-radius: 50%;
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