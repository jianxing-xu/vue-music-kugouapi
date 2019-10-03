<template>
  <!--根组件-->
  <div class="progress" @touchstart.stop="touchstart" @touchmove="touchmove" @touchend="touchend">
    <div class="progress-bar" ref="bar" @click.stop.prevent="toPos">
      <div ref="innerBar" class="progress-inner"></div>
      <div ref="btn" class="btn-wrapper">
        <div class="btn" :class="{active: down}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barWidth: 0,
      down: false
    };
  },
  props: {
    percent: {
      type: Number,
      default: 0
    },
    toProgress: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    progress() {
      return this.percent * this.barWidth;
    }
  },
  methods: {
    toPos(e) {
      // 禁止拖动时， 直接return
      if (!this.toProgress) {
        return;
      }
      let pro = e.pageX - e.target.getBoundingClientRect().left;
      this._offsetWidth(pro);
      this.$emit("barTouchEnd", pro / this.barWidth);
    },
    touchstart(e) {
      if (!this.toProgress) {
        return;
      }
      this.touchs.startX = e.touches[0].pageX;
      // let pos = e.touches[0].pageX - e.target.getBoundingClientRect().left;
      // let percent = pos/this.barWidth;
      // this.$emit('barTouchEnd',percent);
    },
    touchmove(e) {
      if (!this.toProgress) {
        return;
      }
      this.down = true;
      let delta = e.touches[0].pageX - this.touchs.startX;
      let target = this.progress + delta;
      this.touchs.target = target;
      this._offsetWidth(target);
    },
    touchend(e) {
      if (!this.down) {
        return;
      }
      this.down = false;
      this.$emit("barTouchEnd", this.touchs.target / this.barWidth);
    },
    _offsetWidth(progress) {
      this.$refs.innerBar.style.width =
        Math.min(Math.max(progress, 0), this.barWidth) + "px";
      this.$refs.btn.style["transform"] = `translate3d(${Math.max(
        Math.min(progress, this.barWidth)-6,
        0
      )}px,-50%,0)`;
    }
  },
  mounted() {
    this.barWidth = this.$refs.bar.clientWidth - 6;
  },
  created() {
    this.touchs = {};
  },
  watch: {
    percent(p) {
      //如果手指处于down状态的话 则不更新 bar
      if (this.down) {
        return;
      }
      this._offsetWidth(p * this.barWidth);
    }
  }
};
</script>

<style scoped lang='scss'>
.progress {
  width: 66%;
  background-color: $text-color-d;
  border-radius: 5px;
  height: 6px;
  display: flex;
  align-items: center;
  position: relative;
  .progress-bar {
    height: 100%;
    width: 100%;
    position: absolute;
    .btn-wrapper {
      width: 12px;
      height: 12px;
      background-color: #fff;
      border-radius: 100%;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      .btn {
        border-radius: 100%;
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: $theme-color;
        position:absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        transition: all 0.4s;
        &.active {
          width: 20px;
          height: 20px;
        }
      }
    }
    .progress-inner {
      position: absolute;
      left: 0;
      height: 100%;
      width: 0;
      background-color: $theme-color;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
}
</style>