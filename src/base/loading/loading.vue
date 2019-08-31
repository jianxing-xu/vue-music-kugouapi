<template><!--根组件-->
<div class="loading">
    <img :src="require('./loading.gif')" width="100%" height="100%">
</div>
</template>

<script>
export default {

}
</script>

<style scoped lang='scss'>
    .loading{
        width: px2rem(38);
        height: px2rem(38);
    }
</style>