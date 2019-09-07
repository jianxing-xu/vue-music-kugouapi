<template><!--根组件-->
<div class="loading">
    <img :src="require('./loading.gif')" width="28" height="28">
    <!-- <span>加载中...</span> -->
</div>
</template>

<script>
export default {

}
</script>

<style scoped lang='scss'>
    .loading{
        width: px2rem(68);
        height: px2rem(28);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: $font-size-m;
        span{
            line-height: 2;
        }
    }
</style>