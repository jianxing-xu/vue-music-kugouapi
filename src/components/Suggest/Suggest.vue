<template>
  <!--根组件-->
  <div v-if="songs.length" class="suggest">
    <scroll ref="list" :data="songs" class="suggest-list">
      <ul>
        <li class="item" v-for="(song, index) in songs" :key="index">
          <div class="icon">
            <i class="iconfont icon-icmusicnotepx"></i>
          </div>
          <p class="name">
            <span class="song">{{song.songname}}</span>
            <span class="singer">{{song.artist}}</span>
          </p>
        </li>
      </ul>
    </scroll>
    <!-- <div class="loading-wrapper" v-show="!songs.length">
        <loading />
    </div> -->
  </div>
</template>

<script>
import { getMusicByKey } from "@/api/search";
import { createSong } from "@/assets/js/song";
import { ERR_OK } from "@/api/config";
export default {
  props: {
    keyword: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      songs: [],
      page: 0,
      num: 30
    };
  },
  methods: {
    searchMusic(key) {
      this.page++;
      getMusicByKey(key, this.page, this.num).then(res => {
        if (res.code === ERR_OK) {
          if (
            this.page * this.num < parseInt(res.data.total) ||
            parseInt(res.data.total) < this.num
          ) {
            this.songs = this.songs.concat(this.normallize(res.data.list));
          }
        }
      });
    },
    normallize(songs) {
      let ret = [];
      songs.forEach(song => {
        ret.push(createSong(song));
      });
      return ret;
    }
  },

  watch: {
    keyword(key) {
      this.songs = [];
      this.page = 0;
      this.searchMusic(key);
    }
  },
  mounted(){
      this.songs = [];
  }
};
</script>

<style scoped lang='scss'>
.suggest {
  background-color: $bg-color;
  width: 100%;
  height: 100%;
  font-size: $font-size-mm;
  color: $text-color-l;
  overflow: hidden;
  .loading-wrapper{
      position:absolute;
      top: 50%;
      left: 50%;    
      transform: translate(-50%,-50%);
  }
  .suggest-list {
    width: 100%;
    height: 100%;
    .item {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      .icon {
        padding: 0 15px;
      }
      .name {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: $font-size-m;
        .song {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 2;
          font-size: $font-size-mm;
          color: $text-color;
        }
        .singer {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: $theme-sub-color;
        }
      }
    }
  }
}
</style>
