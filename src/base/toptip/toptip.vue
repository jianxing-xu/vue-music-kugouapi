<template>
  <!--根组件-->
  <transition name="slide">
    <div class="top-tip" v-if="isShow" @click="hide">
      <i class="iconfont icon-ok"></i>
      <span>{{msg}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "成功添加到列表"
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    showTip() {
      this.isShow = true;
      setTimeout(() => {
        this.hide();
      }, 3000);
    },
    hide() {
      this.isShow = false;
    }
  }
};
</script>

<style scoped lang='scss'>
.top-tip {
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.4s ease;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate(0, -100%);
  }
  z-index: 300;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: $theme-color-top;
  font-size: $font-size-mm;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
</style>