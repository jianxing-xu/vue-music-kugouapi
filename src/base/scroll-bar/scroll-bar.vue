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
        width += item.clientWidth+10;
      });
      this.$refs.content.style.width = width + 50 + "px";
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
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  ul {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .bar-item {
    margin-left: 10px;
    text-align: center;
    font-size: $font-size-m;
    &:last-child{
      margin: 0 10px;
    }
    span {
      display: inline-block;
      width: 100%;
      color: $text-color-ll;
    }
    &.active {
      span{
        color: $theme-color;
        font-weight: bold;
      }
    }
  }
}
</style>