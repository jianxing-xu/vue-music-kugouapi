<template>
  <!--根组件-->
  <transition name="scale">
    <div class="mine">
      <div class="header">
        <span class="icon" @click="$router.back()">
          <i class="iconfont icon-fanhui"></i>
        </span>
        <span class="text">个人中心</span>
      </div>
      <div class="switch-wrapper">
        <SwitchC :items="items" :current="current" @changeCurrent="changeCurrent" />
      </div>
      <div class="play-all" v-show="!showAll">
        <div
          class="btn"
          @click.stop="randomAll(current==0?normalSongs(favorite):normalSongs(played))"
        >
          <i class="iconfont icon-zanting"></i>
          <span>随机播放全部</span>
        </div>
      </div>
      <div class="list" ref="list">
        <div class="empty" v-if="showAll">
          <div class="text">快去听歌曲吧 ！</div>
        </div>
        <scroll :data="favorite.concat(played)">
          <div class="gr-w">
            <transition-group tag="ul" name="gr" class="like" v-if="current===0">
              <li
                v-for="(song, index) in favorite"
                :key="song.rid"
                @click="playOne(song,index,'like')"
              >
                <div>
                  <span class="text">
                    <span class="songname">{{song.songname}}</span>
                    <span class="split">-</span>
                    <span class="artist">{{song.artist}}</span>
                  </span>
                </div>
                <span class="icon" @click.stop="_toggleFavorite(song)">
                  <i class="iconfont icon-download"></i>
                </span>
              </li>
            </transition-group>
            <div class="play-his" v-if="current===1">
              <SongList :songs="played" @selectItem="playOne" />
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import SwitchC from "@/base/switch/switch.vue";
import SongList from "@/base/song-list/song-list.vue";
import { createSong } from "@/assets/js/song";
import { mapGetters, mapActions } from "vuex";
import { playlistMixin } from "@/assets/js/mixin";
export default {
  mixins: [playlistMixin],
  data() {
    return {
      current: 0,
      items: ["我的喜欢", "最近播放"]
    };
  },
  computed: {
    showAll() {
      if (this.current === 0) {
        return this.favorite.length ? false : true;
      } else {
        return this.played.length ? false : true;
      }
    },
    ...mapGetters(["played", "favorite"])
  },
  methods: {
    changeCurrent(i) {
      this.current = i;
    },
    normalSongs(songs) {
      let ret = [];
      songs.forEach(item => {
        ret.push(createSong(item));
      });
      return ret;
    },
    playOne(song, index, like) {
      if (song.url) {
        song.url = "";
      }
      if (like) {
        this.selectPlay({
          song,
          index,
          songs: this.normalSongs(this.favorite)
        });
      } else {
        this.selectPlay({ song, index, songs: this.normalSongs(this.played) });
      }
    },
    handlePlaylist(list) {
      const bottom = list.length ? "60px" : "";
      this.$refs.list.style.bottom = bottom;
    },

    ...mapActions(["_toggleFavorite", "selectPlay", "randomAll"])
  },

  components: {
    SwitchC,
    SongList
  }
};
</script>

<style scoped lang='scss'>
.mine {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $bg-color;
  font-size: $font-size-mm;
  .list {
    position: fixed;
    top: 106px;
    bottom: 0;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    .empty {
      position: absolute;
      color: $text-color-d;
      transform: translateY(-100px);
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .like {
      width: 100%;
      color: $text-color-l;
      .gr-enter,
      .gr-leave-to {
        opacity: 0;
        transform: translate(0, 30px);
      }
      li {
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 0.3s;
        &.gr-leave-active {
          position: absolute;
        }
        .icon {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 10px;
        }
        .text {
          display: inline-block;
          width: px2rem(300);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .split {
            padding: 0 5px;
          }
          .artist {
            color: $text-color-d;
          }
        }
      }
    }
  }
  .header {
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .iconfont {
      font-size: $font-size-l;
    }
    .text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .play-all {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $text-color-d;
    line-height: 30px;
    .btn {
      .iconfont {
        padding-right: 4px;
      }
    }
  }
  .switch-wrapper {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
  }
  &.scale-enter-active,
  &.scale-leave-active {
    transition: all 0.3s ease;
  }
  &.scale-enter,
  &.scale-leave-to {
    transform: scale(0.9);
    opacity: 0;
  }
}
</style>