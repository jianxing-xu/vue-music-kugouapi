<template>
  <!--根组件-->
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    scroller: {
      type: Function,
      default: function() {}
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    purpul: {
      type: Boolean,
      default: false
    },
    pulldown: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    scrollX: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: !this.scrollX
      });
      //监听滚动到底部后，派发事件
      if (this.purpul) {
        this.scroll.on("scrollEnd", () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }
      //监听 下拉超过50 后 派发事件
      if (this.pulldown) {
        this.scroll.on("scroll", () => {
          if (this.scroll.y > 50) {
            this.$emit("scrollPullDown");
          }
        });
      }
      //监听果冻之前 派发事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
      if (this.listenScroll && this.scroll) {
        this.scroll.on("scroll", pos => {
          this.scroller(pos);
        });
      }
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    //刷新BScroll重新计算高度
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    //从外部 直接调用的方法 改变this 为 scroll 对象 然后把 参数全部传过来
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    //滚动到 指定的 dom 处
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  beforeDestroy(){
    this.scroll.stop();
  }
};
</script>

<style scoped lang='scss'>
.wrapper {
  height: 100%;
  //overflow hidden;
}
</style>