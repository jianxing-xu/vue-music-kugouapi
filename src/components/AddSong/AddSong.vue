<template>
  <!--根组件-->
  <transition name="slide">
    <div class="add-song" v-if="isShow">
      <div class="search-wrapper">
        <i class="iconfont icon-leftarrow" @click="hide"></i>
        <SearchBox ref="sb" @exportKey="exportKey" />
      </div>
      <div class="switch-wrapper">
        <switch-c :items="items" :current="curr" @changeCurrent="changeCurrent"></switch-c>
      </div>
      <div class="content">
        <scroll :data="played.concat(his)">
          <div>
            <div class="his-play" v-show="curr===0">
              <SongList :songs="played" @selectItem="selectItem" />
            </div>
            <div class="his-search" v-show="curr===1">
              <div class="h" v-if="his.length">
                <h2 class="title">搜索历史</h2>
                <i class="iconfont icon-download" @click="clearTip"></i>
              </div>
              <transition-group appear name="gr" tag="ul">
                <li class="his-item" v-for="(item) in his" :key="item" @click="selectKey(item)">
                  <span class="name">{{item}}</span>
                  <i class="iconfont icon-delete" @click.stop="deleteHis(item)"></i>
                </li>
              </transition-group>
            </div>
          </div>
        </scroll>
      </div>

      <div class="result" v-show="key">
        <Suggest :keyword="key" @clickResult="clickResult" />
      </div>
      <Dialog ref="dialog" msg="要清除全部吗？" @handleOK="_clearHistory" />
      <top-tip ref="tip"></top-tip>
    </div>
  </transition>
</template>

<script>
import SwitchC from "@/base/switch/switch.vue";
import SearchBox from "@/base/search-box/search-box.vue";
import Suggest from "@/components/Suggest/Suggest.vue";
import Dialog from "@/base/dialog/dialog.vue";
import SongList from "@/base/song-list/song-list.vue";
import TopTip from "@/base/toptip/toptip.vue"
import { createSong } from "@/assets/js/song"

import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      items: ["历史播放", "搜索歌曲"],
      curr: 0,
      isShow: false,
      key: ""
    };
  },
  computed: {
    ...mapGetters(["his", "played"])
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    changeCurrent(index) {
      this.curr = index;
    },

    clearTip() {
      this.$refs.dialog.show();
    },
    deleteHis(key) {
      this._deleteHistory(key);
    },
    selectKey(key) {
      this.$refs.sb.setKey(key);
    },
    exportKey(key) {
      this.key = key;
    },
    selectItem(song,index){
      this.$refs.tip.showTip();
      this.insertSong(createSong(song));
    },
    clickResult(){
        this.$refs.tip.showTip();
    },

    ...mapActions(["_deleteHistory", "_clearHistory","insertSong"])
  },

  components: {
    SwitchC,
    SearchBox,
    Suggest,
    Dialog,
    SongList,
    TopTip
  }
};
</script>

<style scoped lang='scss'>
.add-song {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $bg-color;
  z-index: 300;
  //padding: 15px;
  box-sizing: border-box;
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.4s ease;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate(100%, 0);
  }
  .result,.content {
    width: 100%;
    position: fixed;
    top: px2rem(110);
    bottom: 0;
    overflow: hidden;
  }
  .search-wrapper {
    padding: 0 15px;
    display: flex;
    align-items: center;
    .iconfont {
      padding-right: 10px;
    }
  }
  .switch-wrapper {
    padding: 15px;
  }
  .his-play {
    width: 100%;
    font-size: $font-size-mm;
  }
  .his-search {
    width: 100%;
    font-size: $font-size-mm;
    padding: 0 20px;
    box-sizing: border-box;

    .h {
      h2 {
        font-size: $font-size-ll;
        color: $text-color-l;
      }
      .iconfont {
        color: $text-color-l;
      }
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    ul {
      transition: all 0.5s;
      .gr-leave-active {
        transition: all 0.5s ease;
      }
      .gr-enter,
      .gr-leave-to {
        transform: translate(0, 100%);
        opacity: 0;
      }
      .gr-leave-active {
        position: absolute;
      }
    }
    .his-item {
      display: flex;
      justify-content: space-between;
      line-height: 2.5;
      border-bottom: 1px solid $bg-hig-color;
      color: $text-color-d;
    }
    .title {
      color: $text-color-d;
      line-height: 2;
    }
  }
}
</style>