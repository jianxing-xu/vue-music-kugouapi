<template>
  <!--根组件-->
  <div class="sug">
    <div v-if="(songs.length || singers.length) && keyword" class="suggest">
      <scroll
        ref="list"
        :data="songs"
        class="suggest-list"
        @scrollToEnd="scrollToEnd"
        :purpul="true"
      >
        <div>
          <ul v-show="mode===0" class="song-list">
            <li class="item" v-for="(song, index) in songs" :key="index" @click.stop="_insertSong(song)">
              <div class="icon">
                <i class="iconfont icon-icmusicnotepx"></i>
              </div>
              <p class="name">
                <span class="song">{{song.songname}}</span>
                <span class="singer">{{song.artist}}</span>
              </p>
            </li>
            <div class="loading-wrapper item" v-show="isMore">
              <loading />
            </div>
          </ul>
          <ul v-show="mode===1" class="singer-list">
            <li
              v-for="(singer, index) in singers"
              :key="index"
              class="singer-item"
              @click="goSinger(singer)"
            >
              <img v-lazy="singer.pic300" width="48" height="48" />
              <span>{{singer.name}}</span>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <transition name="loading">
      <div class="loading-wrapper" v-show="isLoading">
        <loading />
        <span>搜索中...</span>
      </div>
    </transition>
    <transition name="loading">
      <div class="loading-wrapper" v-if="loadingResult">
        <span>啥都木有搜到哦</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { getMusicByKey, getArtistByKey } from "@/api/search";
import { createSong } from "@/assets/js/song";
import { Singer } from "@/assets/js/singer";
import { ERR_OK } from "@/api/config";
import { mapMutations, mapActions } from "vuex";
export default {
  props: {
    keyword: {
      type: String,
      default: ""
    },
    mode: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      songs: [],
      singers: [],
      page: 0,
      singerPage: 0,
      num: 30,
      isMore: false,

      isLoading: false,
      loadingResult: false
    };
  },
  computed: {
    // showLoading(){
    //   return this.mode === 0 ? !this.songs.length : !this.singers.length;
    // }
  },
  methods: {
    searchMusic(key, pull) {
      if (!pull) {
        this.isLoading = true;
      }
      this.page++;
      this.loadingResult = false;
      getMusicByKey(key, this.page, this.num).then(res => {
        if (res.code === ERR_OK) {
          if (this.page * this.num < parseInt(res.data.total)) {
            this.isMore = true;
            if (
              parseInt(res.data.total) < this.num ||
              this.page * this.num < parseInt(res.data.total)
            ) {
              if (parseInt(res.data.total) < this.num) {
                this.isMore = false;
              } else {
                this.isMore = true;
              }
            }
          } else {
            this.isMore = false;
          }
          this.songs = this.songs.concat(this.normallize(res.data.list));
          this.isLoading = false;
        } else {
          this.isLoading = false;
          if (!this.songs.length) {
            this.loadingResult = true;
          }
        }
      });
    },
    searchArtist(key) {
      this.isLoading = true;
      this.loadingResult = false;
      getArtistByKey(key, this.singerPage, this.num).then(res => {
        if (res.code === ERR_OK) {
          if (
            (this.singerPage + 1) * this.num < parseInt(res.data.total) ||
            parseInt(res.data.total) <= this.num
          ) {
            this.singers = this.singers.concat(
              this.normalSinger(res.data.artistList)
            );
            this.isLoading = false;
            if (!this.singers.length) {
              this.loadingResult = true;
            }
          }
        }
      });
    },
    normalSinger(list) {
      let ret = [];
      list.forEach(item => {
        ret.push(
          new Singer({
            id: item.id,
            musicNum: item.musicNum,
            name: item.name,
            pic: item.pic,
            pic300: item.pic300
          })
        );
      });
      return ret;
    },
    normallize(songs) {
      let ret = [];
      songs.forEach(song => {
        ret.push(createSong(song));
      });
      return ret;
    },
    goSinger(singer) {
      this.setSinger(singer);
      this.$router.push({
        path: `/search/${singer.id}`
      });
      this._saveHistory(this.keyword);
    },
    scrollToEnd() {
      if (this.mode === 0) {
        this.searchMusic(this.keyword, "flag");
      }
    },
    _insertSong(song) {
      this.$emit('clickResult');
      this.insertSong(song);
      this._saveHistory(this.keyword);
    },
    ...mapActions(["insertSong", "_saveHistory"]),
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },

  watch: {
    keyword(key) {
      this.songs = [];
      this.singers = [];
      this.page = 0;
      if (this.mode === 0) {
        this.searchMusic(key);
      }
      if (this.mode === 1) {
        this.searchArtist(key);
      }
    },
    mode(mode) {
      this.songs = [];
      this.page = 0;
      this.singerPage = 0;
      this.singers = [];
      if (mode === 0 && this.keyword) {
        this.searchMusic(this.keyword);
      }
      if (mode === 1 && this.keyword) {
        this.searchArtist(this.keyword);
      }
    }
  },
  mounted() {
    this.songs = [];
  }
};
</script>

<style scoped lang='scss'>
.sug {
  width: 100%;
  height: 100%;
  background-color: $bg-color;
  .loading-enter-active, .loading-leave-active{
    transition: all .3s ease;
  }
  .loading-enter, .loading-leave-to{
    opacity: 0;
  }
  > .loading-wrapper {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    font-size: $font-size-l;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    span {
      padding: 10px;
    }
  }
  .suggest {
    background-color: $bg-color;
    width: 100%;
    height: 100%;
    font-size: $font-size-mm;
    color: $text-color-l;
    overflow: hidden;
    .slide-enter-active,
    .slide-leave-active {
      transition: all 0.4s;
    }
    .slide-enter,
    .slide-leave-to {
      transform: translateX(100%);
    }
    .suggest-list {
      width: 100%;
      height: 100%;
      .singer-list {
        width: 100%;
        .singer-item {
          display: flex;
          align-items: center;
          padding: 20px 0 0 10px;
          img {
            width: 48px;
            height: 48px;
            border-radius: 100%;
          }
          span {
            width: px2rem(250);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding-left: 15px;
          }
        }
      }
      .song-list {
        position: relative;
        .loading-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          //margin: 0 0 0 50%;
          //transform: translateX(-50%);
        }
      }
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
}
</style>
