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
                    <i class="iconfont icon-commont" @click="showCommont"></i>
                  </span>
                  <span class="current-lyric">{{currentLyric || ' '}}</span>
                </div>
              </div>
              <div class="swiper-slide lyric" v-if="lyric">
                <scroll :data="lyric.lines" ref="lyricScroll">
                  <div>
                    <p
                      ref="lyricGroup"
                      :class="{'current-line':index==currentLine}"
                      class="lyric-line"
                      v-for="(line, index) in lyric.lines"
                      :key="index"
                    >{{line.txt}}</p>
                  </div>
                </scroll>
              </div>
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
            <div class="play-mode" @click="changeMode">
              <i class="iconfont" :class="modeIcon"></i>
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
          <span class="cur-lyric">{{currentLyric || currentSong.artist}}</span>
        </div>
        <div class="cicle-progress-wrapper" @click.stop="togglePlay">
          <progress-circle :radio="radio" :percent="percent">
            <i class="iconfont" :class="playIcon"></i>
          </progress-circle>
        </div>
        <div class="playlist">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.url || ''"
      @play="canplay"
      @timeupdate="timeupdate"
      @ended="playEnd"
    ></audio>
      <Commont v-if="clickCommont" ref="commont" :commont="currentSong.commont || {}" @scrollToEnd="scrollToEnd" />
  </div>
</template>

<script>
import Vue from "vue";
import Swiper from "swiper";
import Lyric from "lyric-parser";
import { playMode } from "@/assets/js/config";
import { getSongUrl, getCommont} from "@/api/song";
import { mapGetters, mapMutations } from "vuex";
import Progress from "@/base/progress/progress.vue";
import ProgressCircle from "@/base/progress-circle/progress-circle.vue";
import Commont from "@/components/Commont/Commont.vue"
export default {
  data() {
    return {
      radio: 33,
      onReady: false,
      currentTime: 0,
      percent: 0,
      lyric: null,
      currentLyric: "",
      currentLine: 0,
      page: 1,
      clickCommont: false,
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
      this.lyric && this.lyric.togglePlay();
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
    changeMode() {
      let mode = this.mode;
      mode = (mode + 1) % 3;
      console.log(mode);
      this.setPlayMode(mode);
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
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
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
      this.percent = this.currentTime / this.currentSong.duration;
    },
    playEnd() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    barTouchEnd(percent) {
      this.$refs.audio.currentTime = this.currentSong.duration * percent;
      this.lyric && this.lyric.seek(this.$refs.audio.currentTime * 1000);
    },
    getLyric(str) {
      let _this = this;
      if(str.code === -1){
        console.log('no lyric');
        this.currentLyric = str.text;
        return ;
      }
      this.lyric = new Lyric(str, ({ lineNum, txt }) => {
        if (lineNum < 5) {
          this.$refs.lyricScroll.scrollToElement(this.$refs.lyricGroup[0]);
        } else {
          this.$refs.lyricScroll.scrollToElement(
            this.$refs.lyricGroup[lineNum - 5],
            300
          );
        }
        this.currentLyric = txt;
        this.currentLine = lineNum;
      });
      this.lyric.play();
    },
    showCommont(){
      this.clickCommont = true;
      this.$refs.commont.show();
    },
    scrollToEnd(){
      this.page ++
      getCommont(15,this.currentSong.rid,this.page).then( res => {
          let commont = res;
          res.rows = this.currentSong.commont.rows.concat(res.rows)
          Vue.set(this.currentSong,'commont', JSON.parse(JSON.stringify(res)));
      })
    },

    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setFullScrenn: "SET_FULLSCRENN",
      setCurrentIndex: "SET_CURRENTINDEX",
      setPlayMode: "SET_PLAYMODE"
    })
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.swiper && this.swiper.updateSize();
    });
    this.$nextTick(() => {
      this.swiper = new Swiper(this.$refs.swiper, {
        observer: true
      });
    });
  },
  computed: {
    playIcon() {
      return this.playing ? "icon-bofang" : "icon-zanting";
    },
    modeIcon() {
      return this.mode === playMode.sequence
        ? "icon-liebiaoxunhuan"
        : this.mode === playMode.random
        ? "icon-suiji"
        : "icon-danquxunhuan";
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
        this.lyric && this.lyric.stop();
        this.lyric = null;
        if (!this.playing) {
          this.togglePlay();
        }
        if (!song.lyric) {
          song.getSongLyric();
        }
        if(!song.commont){
          song.getSongCommont(this.page);
        }
        if (!song.url) {
          getSongUrl(song.rid).then(res => {
            Vue.set(song, "url", res.url);
          });
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.getLyric(song.lyric);
          song.url && this.$refs.audio.play();
        }, 1000);
      }
    },
    playing(p) {
      p ? this.$refs.audio.play() : this.$refs.audio.pause();
    }
  },
  components: {
    Progress,
    ProgressCircle,
    Commont
  }
};
</script>

<style scoped lang='scss'>
.player {
  position: relative;
  .player-full {
    &.slide-full-enter-active,
    &.slide-full-leave-active {
      transition: all 0.5s ease;
    }
    &.slide-full-enter,
    &.slide-full-leave-to {
      transform: translateY(100%);
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
      background: rgba(0,0,0,1);
      img{
        opacity: .7;
      }
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
        align-items: center;
        text-align: center;
        justify-content: space-evenly;
        .singer, .title{
          width: px2rem(200);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
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
        .lyric {
          text-align: center;
          line-height: 2.5;
          color: $text-color-l;
          font-size: $font-size-m;
          .lyric-line {
            &.current-line {
              color: $text-color;
              transform: scale(1.2);
              transition: transform 0.3s;
            }
          }
        }
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
            .current-lyric {
              display: inline-block;
              text-align: center;
              width: px2rem(190);
              font-size: $font-size-mm;
              color: $text-color-ll;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
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
      .iconfont {
        position: absolute;
        left: 2px;
        top: 2px;
        z-index: -1;
        font-size: 30px;
        transform: scale(1.1);
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
        width: px2rem(200);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        font-size: $font-size;
        color: $text-color-ll;
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