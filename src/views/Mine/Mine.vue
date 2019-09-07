<template>
  <!--根组件-->
  <transition name="scale">
    <div class="mine">
      <div class="header">
        <span class="icon" @click="$router.back()">
          <i class="iconfont icon-leftarrow"></i>
        </span>
        <span class="text">个人中心</span>
      </div>
      <div class="switch-wrapper">
        <SwitchC :items="items" :current="current" @changeCurrent="changeCurrent" />
      </div>
      <div class="play-all">
        <div class="btn" @click.stop="randomAll(current==0?normalSongs(favorite):normalSongs(played))">
          <i class="iconfont icon-zanting"></i>
          <span>随机播放全部</span>
        </div>
      </div>
      <div class="list" ref="list">
        <scroll :data="favorite.concat(played)">
          <div>
            <ul class="like" v-if="current===0">
              <li v-for="(song, index) in favorite" :key="index" @click="playOne(song,index,'like')">
                <div>
                  
                  <span class="text">
                    <span class="songname">{{song.songname}}</span>
                    <span class="split">-</span>
                    <span class="artist">{{song.artist}}</span>
                  </span>
                </div>
                <div>
                  <i class="iconfont icon-download" @click.stop="_toggleFavorite(song)"></i>
                </div>
              </li>
            </ul>
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
import { createSong } from "@/assets/js/song"
import { mapGetters, mapActions } from "vuex";
import {playlistMixin} from "@/assets/js/mixin"
export default {
  mixins:[playlistMixin],
  data() {
    return {
      current: 0,
      items: ["我的喜欢", "最近播放"]
    };
  },
  computed: {
    ...mapGetters(["played", "favorite"])
  },
  methods: {
    changeCurrent(i) {
      this.current = i;
    },
    normalSongs(songs){
        let ret = [];
        songs.forEach(item => {
            ret.push(createSong(item));
        });
        return ret;
    },
    playOne(song,index,like){
        if(song.url){
            song.url = '';
        }
        if(like){

            this.selectPlay({song,index,songs:this.normalSongs(this.favorite)});
        }else{
            this.selectPlay({song,index,songs:this.normalSongs(this.played)});
        }
    },
    handlePlaylist(list){
      const bottom = list.length ? '60px' : '';
      this.$refs.list.style.bottom = bottom;
    },

    ...mapActions(["_toggleFavorite","selectPlay","randomAll"])
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
    top: 150px;
    bottom: 0;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    .like{
        width: 100%;
        color: $text-color-l;
        li{
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: space-between; 
            overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            .text{
                display: inline-block;
                width: px2rem(300);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .split{
                    padding: 0 5px;
                }
                .artist{
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
    .text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .play-all {
    width: 100%;
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: center;
    align-items: center;
    color: $text-color-d;
    .btn {
      padding:0 10px;
      border: solid 1px $text-color-l;
      border-radius: 30px;
      font-size: $font-size-m;
      .iconfont{
          padding-right: 4px;
      }
    }
  }
  .switch-wrapper {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 15px;
    box-sizing: border-box;
  }
  &.scale-enter-active,
  &.scale-leave-active {
    transition: all 0.3s ease;
  }
  &.scale-enter,
  &.scale-leave-to {
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>