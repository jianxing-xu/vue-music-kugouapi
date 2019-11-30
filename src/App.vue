<template>
  <div class="app">
    <div class="header-wrapper">
      <Header @selectSearch="search" @selectMine="selectMine" />
    </div>
    <div class="tab-wrapper">
      <Tab :items="tabItem" />
    </div>
    <keep-alive exclude="MV">
      <router-view></router-view>
    </keep-alive>
    <transition name="slide">
      <Player v-if="playlist.length" />
    </transition>
  </div>
</template>
<script>
import Header from "@/base/header/header.vue";
import Tab from "@/base/tab/tab.vue";
import Player from "@/components/Player/Player.vue";
import { mapGetters } from "vuex";
import { getSongUrl } from "@/api/song";
import { throttle } from "@/assets/js/util";

export default {
  data() {
    return {
      load: 0,
      tabItem: [
        { name: "推荐", url: "/recommend" },
        { name: "歌手", url: "/singer" },
        { name: "榜单", url: "/rank" },
        { name: "MV", url: "/mv" }
      ]
    };
  },
  computed: {
    ...mapGetters(["playlist"])
  },
  methods: {
    search() {
      this.$router.push("/search");
    },
    selectMine() {
      this.$router.push({
        path: "/mine"
      });
    },
    reset() {
      if (window.orientation === 90 && this.load === 1) {
        return;
      }
      const html = document.documentElement;
      let fontSize = window.innerWidth / 10;
      fontSize = fontSize > 40 ? 40 : fontSize;
      html.style.fontSize = fontSize + "px";
      if(this.load===0){
        this.load++;
      }
    }
  },
  created() {
    /**
     * 在 APP 创建之后 执行一次 得到cookie 以方便接下来的请求
     */
    getSongUrl();
    document.addEventListener("DOMContentLoaded", this.reset);
    window.addEventListener("resize", throttle(this.reset, 120));
  },
  components: {
    Header,
    Tab,
    Player
  }
};
</script>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  background-color: $bg-color;
  color: $text-color;
  .slide-enter,
  .slide-leave-to {
    opacity: 0;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.5s linear;
  }
  .header-wrapper {
    padding: 0px 15px;
  }
}
</style>

