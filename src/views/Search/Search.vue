<template>
  <!--根组件-->
  <transition name="slide">
    <div class="search">
      <div class="header">
        <div class="back" @click="$router.back()">
          <i class="iconfont icon-leftarrow"></i>
        </div>
        <div class="search-box-wrapper">
          <SearchBox ref="sb" @keyEmpty="keyEmpty" @exportKey="getKey" @clearKey="clearKey" />
        </div>
      </div>
      <div class="switch-wrapper">
        <switch-c :current="switchCurrent" @changeCurrent="changeCurrent" :items="switches" />
      </div>
      <div class="search-history">
        <scroll :data="his">
          <div>
            <h2 class="title">搜索历史</h2>
            <transition-group appear name="gr" tag="ul">
              <li class="his-item" v-for="(item) in his" :key="item" @click="selectHis(item)">
                <span class="name">{{item}}</span>
                <i class="iconfont icon-delete" @click.stop="deleteHis(item)"></i>
              </li>
            </transition-group>
          </div>
        </scroll>
      </div>
      <div class="suggest-wrapper" v-show="key"> 
        <Suggest :keyword="key" :mode="switchCurrent" />
      </div>
    </div>
  </transition>
</template>

<script>
import SearchBox from "@/base/search-box/search-box.vue";
import Suggest from "@/components/Suggest/Suggest.vue";
import SwitchC from "@/base/switch/switch.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "search",
  data() {
    return {
      key: "",
      switchCurrent: 0,
      switches: ["歌曲", "歌手"]
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
    clearKey() {
      this.key = "";
    },
    deleteHis(key) {
      this._deleteHistory(key);
    },
    keyEmpty() {
      this.key = "";
    },
    selectHis(key) {
      this.$refs.sb.setKey(key);
    },

    ...mapActions(["_deleteHistory"])
  },
  components: {
    SearchBox,
    Suggest,
    SwitchC
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
  .search-history {
    width: 100%;
    font-size: $font-size-mm;
    padding: 0 20px;
    box-sizing: border-box;
    position: absolute;
    top: 100px;
    bottom: 0;
    overflow: hidden;
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
      color: $text-color-l;
    }
    .title {
      color: $text-color-d;
      line-height: 2;
    }
  }
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.4s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate(100%);
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