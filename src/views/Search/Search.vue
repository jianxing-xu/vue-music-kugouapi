<template>
  <!--根组件-->
  <transition name="slide" mode="in-out">
    <div class="search">
      <div class="header">
        <div class="back" @click="$router.back()">
          <i class="iconfont icon-leftarrow"></i>
        </div>
        <div class="search-box-wrapper">
          <SearchBox ref="sb" @keyEmpty="keyEmpty" @exportKey="getKey" />
        </div>
      </div>
      <div class="switch-wrapper">
        <switch-c :current="switchCurrent" @changeCurrent="changeCurrent" :items="switches" />
      </div>
      <div class="word" ref="word" v-show="!key">
        <scroll :data="hot.concat(his)">
          <div>
            <div class="hot-key">
              <h2 class="title">热门搜索</h2>
              <ul>
                <li v-for="(item, index) in hot" :key="index" @click="selectKey(item)">{{item}}</li>
              </ul>
            </div>
            <div class="search-history">
              <div>
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
          </div>
        </scroll>
      </div>
      <div class="suggest-wrapper" ref="sug" v-show="key">
        <Suggest :keyword="key" :mode="switchCurrent"/>
      </div>
      <Dialog ref="dialog" msg="需要清除全部吗？" ok="是的" cancel="不要" @handleOK="clearKey" />
    </div>
  </transition>
</template>

<script>
import SearchBox from "@/base/search-box/search-box.vue";
import Suggest from "@/components/Suggest/Suggest.vue";
import SwitchC from "@/base/switch/switch.vue";
import Dialog from "@/base/dialog/dialog.vue";
import { ERR_OK } from "@/api/config";
import { getSuggestKey } from "@/api/search";
import { mapGetters, mapActions } from "vuex";
import { playlistMixin} from '@/assets/js/mixin'
export default {
  mixins:[playlistMixin],
  name: "search",
  data() {
    return {
      key: "",
      switchCurrent: 0,
      switches: ["歌曲", "歌手"],
      hot: [],
    };
  },
  computed: {
    ...mapGetters(["his"])
  },
  methods: {
    getKey(key) {
      this.key = key;
    },
    changeCurrent(index) {
      this.switchCurrent = index;
    },
    clearTip(){
      this.$refs.dialog.show();
    },
    clearKey() {
      this._clearHistory();
    },
    deleteHis(key) {
      this._deleteHistory(key);
    },
    keyEmpty() {
      this.key = "";
    },
    selectKey(key) {
      this.$refs.sb.setKey(key);
    },
    handlePlaylist(list){
      const bottom = list.length ? '60px' : '';
      this.$refs.sug.style.bottom = bottom;
      this.$refs.word.style.bottom = bottom;
    },

    ...mapActions(["_deleteHistory", "_clearHistory"])
  },
  watch: {},
  components: {
    SearchBox,
    Suggest,
    SwitchC,
    Dialog
  },
  created() {
    getSuggestKey("").then(res => {
      if (res.code === ERR_OK) {
        this.hot = res.data;
      }
    });
  }
};
</script>

<style scoped lang='scss'>
.search {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $bg-color;
  top: 0;
  left: 0;
  .word {
    width: 100%;
    position: absolute;
    top: px2rem(100);
    bottom: 0;
    overflow: hidden;
  }
  .hot-key {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: $font-size-mm;
    &::after {
      content: "";
      display: table;
      clear: both;
    }
    li {
      font-size: $font-size-m;
      color: $text-color-d;
      line-height: 1.4;
      border: solid 1px $bg-hig-color;
      float: left;
      padding: 2px 3px;
      margin: 0 5px 6px 0;
      border-radius: 5px;
    }
    .title {
      line-height: 2;
      font-size: $font-size-ll;
      color: $text-color-l;
    }
  }
  .search-history {
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
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
    position: absolute;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: scale(.95);
    opacity: 0;
  }
  .switch-wrapper {
    width: 100%;
    height: 40px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .suggest-wrapper {
    width: 100%;
    position: fixed;
    top: 100px;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    box-sizing: border-box;
  }
  .search-box-wrapper {
    box-sizing: border-box;
    width: 100%;
  }
  .back {
    .iconfont {
      font-size: 25px;
    }
    color: $text-color-d;
    padding: 0 15px 0 10px;
  }
}
</style>