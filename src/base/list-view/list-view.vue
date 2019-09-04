<template>
  <!--根组件-->
  <div class="list-view">
    <div class="loading-wrapper" v-if="!datas.length">
      <loading />
    </div>
    <div class="list" ref="listContent">
      <scroll :data="datas" :listenScroll="true" :scroller="scrolling" :probeType="3" ref="scroll">
        <ul>
          <li class="singer-group" v-for="(group, index) in datas" :key="index" ref="listGroup">
            <h2 class="title" :style="index===0 ? 'visibility:hidden':''">{{group.title}}</h2>
            <ul>
              <li v-for="(singer,index) in group.items" :key="index" @click="selectItem(singer)">
                <img width="48" height="48" v-lazy="singer.pic70" />
                <span class="name">{{singer.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
    <div class="fix-title">{{fixTitle}}</div>
    <div
      class="shortcut"
      @touchstart.prevent="touchStart"
      @touchmove.prevent="touchMove"
      @touchend.prevent="touchEnd"
    >
      <ul>
        <li
          @touchstart="toSinger(index)"
          :class="{active:index===currentIndex}"
          v-for="(item, index) in datas"
          :key="index"
        >
          <span class="big" v-show="index===currentIndex && showBig">{{item.title.charAt(0)}}</span>
          {{item.title.charAt(0)}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { playlistMixin } from "@/assets/js/mixin";
export default {
  mixins: [playlistMixin],
  created() {
    this.touchs = {};
  },
  props: {
    datas: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    fixTitle() {
      return this.datas[0] && this.datas[this.currentIndex].title;
    }
  },
  data() {
    return {
      showBig: false,
      currentIndex: 0,
      tops: []
    };
  },

  methods: {
    _initTops() {
      let tops = [];
      let top = 0;
      tops.push(top);
      let children = this.$refs.listGroup;
      children &&
        children.forEach(item => {
          top += item.clientHeight;
          tops.push(top);
        });
      this.tops = tops;
    },
    scrolling(pos) {
      let y = Math.abs(pos.y);
      const { tops } = this;
      tops.forEach((item, i) => {
        if (y >= item && y < tops[i + 1]) {
          this.currentIndex = i;
        }
      });
    },
    selectItem(singer) {
      this.$emit("selectItem", singer);
    },
    toSinger(i) {
      const li = this.$refs.listGroup;
      this.$refs.scroll.scrollToElement(li[i]);
      this.currentIndex = i;
    },
    touchStart(e) {
      this.showBig = true;
      this.touchs.startY = e.touches[0].pageY;
      this.touchs.index = this.currentIndex; //记录点下的索引
    },
    touchMove(e) {
      this.showBig = true;
      let diff = ((e.touches[0].pageY - this.touchs.startY) / 17) | 0;
      let targetIndex = this.touchs.index + parseInt(diff); //用点下的索引取计算
      this.$refs.scroll.scrollToElement(this.$refs.listGroup[targetIndex]);
    },
    touchEnd() {
      this.showBig = false;
    },
    handlePlaylist(list) {
      const bottom = list.length ? "60px" : "";
      this.$refs.listContent.style.bottom = bottom;
      this.$refs.scroll && this.$refs.scroll.refresh();
    }
  },
  watch: {
    datas() {
      setTimeout(() => {
        this._initTops();
      }, 20);
    }
  }
};
</script>

<style scoped lang='scss'>
.list-view {
  width: 100%;
  height: 100%;
  position: relative;
  .fix-title {
    position: fixed;
    top: px2rem(89);
    width: 100%;
    color: $text-color-l;
    padding-left: 15px;
    font-size: $font-size;
    background-color: $bg-hig-color;
    height: 30px;
    line-height: 30px;
  }
  .loading-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .list {
    left: 0;
    right: 0;
    position: fixed;
    top: px2rem(90);
    bottom: 0;
    overflow: hidden;
    .singer-group {
      padding-bottom: 30px;
      .title {
        color: $text-color-l;
        padding-left: 15px;
        font-size: $font-size;
        background-color: $bg-hig-color;
        height: 30px;
        line-height: 30px;
      }
      li {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        color: $text-color-l;
        img {
          border-radius: 50%;
        }
        .name {
          margin-left: 15px;
        }
      }
    }
  }

  .shortcut {
    text-align: center;
    color: $text-color-l;
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: $theme-color-dd;
    font-size: $font-size;
    padding: 15px 2px;
    border-radius: 20px;
    li {
      height: 17px;
      width: 15px;
      line-height: 17px;
      border-radius: 50%;
      position: relative;
      .big {
        position: absolute;
        left: -380%;
        font-size: $font-size-l;
        background-color: $theme-color-dd;
        color: $text-color;
        border-radius: 50%;
        border-top-right-radius: 200%;
        border-bottom-right-radius: 200%;
        width: px2rem(50);
        height: px2rem(50);
        line-height: px2rem(50);
        top: -100%;
      }
      &.active {
        color: $text-color;
      }
    }
  }
}
</style>