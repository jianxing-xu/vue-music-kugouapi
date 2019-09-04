<template><!--根组件-->
<div class="switch">
    <div class="item" :class="{active:current===index}" v-for="(item, index) in items" :key="index" @click="changeCurrent(index)">{{item}}</div>
</div>
</template>

<script>
export default {
    props:{
        items:{
            type: Array,
            default(){return []}
        },
        current:{
            type: Number,
            default: 0,
        }
    },
    methods:{
        changeCurrent(index){
            this.$emit('changeCurrent',index);
        }
    }

}
</script>

<style scoped lang='scss'>
.switch{
    color: $text-color-d;
    font-size: $font-size-mm;
    width: 100%;
    display: flex;
    border-radius: 20px;
    overflow: hidden;
    .item{
        &:last-child{
            border:0;
        }
        border-right: solid 1px $bg-color;
        text-align: center;
        flex: 1;
        line-height: 2;
        &.active{
            background-color: $bg-hig-color;
        }
    }
}
</style>