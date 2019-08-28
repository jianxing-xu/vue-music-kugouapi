<template>
  <!--根组件-->
  <div class="header">
    <i class="iconfont icon-cx"></i>
    <div class="logo">
      <img height="43" :src="require('@/assets/img/logo-1.png')" alt />
      <span class="text">music</span>
    </div>
    <i class="iconfont icon-mine1"></i>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='scss'>
.header {
  font-size: $font-size-l;
  color: $theme-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    font-size: $font-size-l;
  }
  .logo{
      display: flex;
      align-items: center;
      .text{
          font-size: $font-size-ll;
      }
      img{
          display: inline-block;
          vertical-align: bottom;
      }
  }
}
</style>