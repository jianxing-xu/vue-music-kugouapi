<template>
  <!--根组件-->
  <transition name="list">
    <div class="play-list" v-if="isShow">
      <div class="mask" ref="mask" @click.stop="toggleList"></div>
      <div class="content">
        <div class="list-header">
          <div class="mode" @click="changeMode">
            <i class="iconfont" :class="modeIcon"></i>
            <span class="text">{{modeText}}({{playlist.length}})</span>
          </div>
          <div class="ctrl">
            <i class="iconfont icon-zengjia"></i>
            <i class="iconfont icon-download" @click.stop="clearTip"></i>
          </div>
        </div>
        <div class="list">
          <scroll :data="playlist" ref="scroll">
            <div>
              <ul>
                <li
                  ref="list"
                  v-for="(song, index) in playlist"
                  :key="song.rid"
                  :class="{curr:index===currentIndex}"
                  @click="play(index)"
                >
                  <div>
                    <span class="icon" v-show="currentIndex===index">
                      <i class="iconfont icon-Playing"></i>
                    </span>
                    <span class="text">
                      <span class="songname">{{song.songname}}</span>
                      <span class="split">-</span>
                      <span class="artist">{{song.artist}}</span>
                    </span>
                  </div>
                  <div>
                    <i class="iconfont icon-favorite" :class="likeIcon(song)" @click.stop="_toggleFavorite(song)"></i>
                    <i class="iconfont icon-download" @click.stop="deleteSong(index)"></i>
                  </div>
                </li>
              </ul>
              <div class="add" @click="addToList">
                <i class="iconfont icon-zengjia"></i>
                <span>添加歌曲到队列</span>
              </div>
            </div>
          </scroll>
        </div>
        <div class="close" @click.stop="toggleList">关闭</div>
      </div>
      <Dialog ref="tip" msg="确定清除全部吗？" ok="是的" cancel="不要" @handleOK="_clearPlaylist" />
      <AddSong ref="add" />
    </div>
  </transition>
</template>

<script>
import { playMode } from '@/assets/js/config'
import { mapGetters, mapMutations, mapActions } from "vuex";
import Dialog from '@/base/dialog/dialog.vue'
import AddSong from '@/components/AddSong/AddSong.vue'
export default {
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    modeIcon(){
        return this.mode === playMode.sequence ? 'icon-liebiaoxunhuan' : this.mode === playMode.random ? 'icon-suiji' : 'icon-danquxunhuan'
    },
    modeText(){
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
    },
    ...mapGetters(["playlist", "currentIndex","mode","favorite"])
  },
  methods: {
    toggleList() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.timer = setTimeout(()=>{
          this.$refs.scroll.scrollToElement(
            this.$refs.list[this.currentIndex],
            400
          );
        },100);//66大顺，ojbk
      }
    },
    play(i){
        this.setCurrentIndex(i);
    },
    changeMode() {
      let mode = this.mode;
      mode = (mode + 1) % 3;
      this.setPlayMode(mode);
    },
    clearTip(){
        this.$refs.tip.show();
    },
    _clearPlaylist(){
        this.clearPlaylist();
        this.isShow = false;
    },
    likeIcon(song){
      let index = this.favorite.findIndex(item => {
        return item.rid == song.rid;
      });
      if(index > -1){
        return 'active'
      }else{
        return '';
      }
    },
    addToList(){
      this.$refs.add.show();
    },




    ...mapMutations({
        setPlayMode: 'SET_PLAYMODE',
        setCurrentIndex: 'SET_CURRENTINDEX',
    }),
    ...mapActions(['deleteSong','clearPlaylist','_toggleFavorite'])
  },
  components:{
      Dialog,
      AddSong,
  }
};
</script>

<style scoped lang='scss'>
.play-list {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .mask {
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  &.list-enter-active,
  &.list-leave-active {
    transition: opacity 0.4s;
    .mask {
      transition: opacity 0.4s;
    }
    .content {
      transition: transform 0.4s ease;
    }
  }
  &.list-enter,
  &.list-leave-to {
    .mask {
      opacity: 0;
    }
    .content {
      transform: translate3d(0, 100%, 0);
    }
  }
  .content {
    width: 100%;
    height: 75%;
    background-color: $bg-color;
    position: absolute;
    bottom: 0;
    font-size: $font-size-mm;

    .list {
      width: 100%;
      position: absolute;
      top: 60px;
      bottom: 60px;
      overflow: hidden;
      color: $text-color-l;
      li {
        width: 100%;
        display: flex;
        height: 48px;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
        border-bottom: 1px solid $text-color-d;
        .icon-favorite{
          &.active{
            color: $theme-like;
          }
        }
        &.curr{
          .icon-Playing,.text{
            color: $theme-color;
          }
        }
        .text {
          .split {
            padding: 0 5px;
          }
          .artist {
            font-size: $font-size-m;
            color: $text-color-d;
          }
        }
        .icon {
          position: relative;
        }
        .iconfont {
          padding-right: 15px;
        }
      }
      .add {
        text-align: center;
        line-height: 3;
      }
    }
    .close {
      width: 100%;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border-top: 1px $text-color-d solid;
      position: absolute;
      bottom: 0;
    }
    .list-header {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid $text-color-d;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      box-sizing: border-box;
      .iconfont {
        padding-right: 15px;
      }
    }
  }
}
</style>