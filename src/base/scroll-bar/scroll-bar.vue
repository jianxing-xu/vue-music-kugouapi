<template>
  <!--根组件-->
  <div class="scroll-bar">
    <scroll :scrollX="true">
      <ul ref="content">
        <li @click="selectItem(index)" class="bar-item" :class="{active:index===currentIndex}" ref="item" v-for="(item, index) in items" :key="index">
          <span>{{item.text}}</span>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data(){
      return {
          currentIndex: 0,
      }
  },
  methods: {
    initWidth() {
      let child = this.$refs.item;
      let width = 0;
      [].slice.call(child).forEach(item => {
        width += item.clientWidth;
      });
      this.$refs.content.style.width = width + "px";
    },
    selectItem(index){
        if(index===this.currentIndex){
            return;
        }
        this.currentIndex = index;
        this.$emit('selectItem',index);
    }
  },

  watch: {
    items: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.initWidth();
        });
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.scroll-bar {
  position: fixed;
  top: px2rem(90);
  left: 0;
  right: 0;
  height: px2rem(48);
  ul {
    height: 100%;
  }
  .bar-item {
    display: inline-block;
    padding: 0 9px;
    text-align: center;
    font-size: $font-size-m;
    span {
      line-height: 2;
      border-radius: 25px;
      color: $text-color-ll;
    }
    &.active {
      background-color: $theme-color-dd;
      border-radius: 10px;
    }
  }
}
</style>