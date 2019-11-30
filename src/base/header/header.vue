<template>
  <!--根组件-->
  <div class="header">
    <i class="iconfont icon-cx" @click="search"></i>
    <div class="logo">
      <span class="text">Make A Music</span>
    </div>
    <i class="iconfont icon-mine1" @click="mine"></i>
  </div>
</template>

<script>
export default {
  methods:{
    search(){
      this.$emit('selectSearch');
    },
    mine(){
      this.$emit('selectMine');
    }
  }
};
</script>

<style scoped lang='scss'>
.header {
  font-size: $font-size-l;
  color: $theme-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  height: px2rem(30);
  i {
    font-size: $font-size-l;
    padding: 8px;
  }
  .logo{
      display: flex;
      align-items: center;
      .text{
          font-size: $font-size;
          font-family: Cabin;
          font-weight: bolder;
      }
      img{
          display: inline-block;
          vertical-align: bottom;
      }
  }
}
</style>