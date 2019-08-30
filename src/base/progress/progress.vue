<template><!--根组件-->
<div class="progress">
    <div class="progress-bar" ref="bar"  @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div ref="innerBar" class="progress-inner"></div>
        <div ref="btn" class="btn-wrapper">
            <div class="btn"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            barWidth:0,
            down: false,
        }
    },
    props:{
        percent:{
            type: Number,
            default: 0,
        }
    },
    computed:{
        progress(){
            return this.percent * this.barWidth;
        }
    },
    methods:{
        toPos(e){
            
        },
        touchstart(e){
            this.touchs.startX = e.touches[0].pageX;
            // let pos = e.touches[0].pageX - e.target.getBoundingClientRect().left;
            // let percent = pos/this.barWidth;
            // this.$emit('barTouchEnd',percent);
        },
        touchmove(e){
            this.down = true;
            let delta = e.touches[0].pageX - this.touchs.startX;
            let target = this.progress + delta;
            this.touchs.target = target;
            this._offsetWidth(target);
        },
        touchend(e){
            this.down = false;
            this.$emit('barTouchEnd',this.touchs.target / this.barWidth);
        },
        _offsetWidth(progress){
            this.$refs.innerBar.style.width =  Math.min(Math.max(progress,0),this.barWidth) + 'px';
            this.$refs.btn.style['transform'] = `translate3d(${Math.max(Math.min(progress,this.barWidth),0)}px,-50%,0)`
        }
    },
    mounted(){
        this.barWidth = this.$refs.bar.clientWidth - 15;
    },
    created(){
        this.touchs = {};
    },
    watch:{
        percent(p){
            //如果手指处于down状态的话 则不更新 bar
            if(this.down){
                return ;
            }
            this._offsetWidth(p * this.barWidth);
        }
    }
}
</script>

<style scoped lang='scss'>
.progress{
    width: 66%;
    margin: 0 auto;
    background-color: $text-color-d;
    border-radius: 4px;
    height:5px;
    display: flex;
    align-items: center;  
    position: relative;  
    .currentTime{
        position:relative;
        right: px2rem(35);
    }
    .duration{
        position: absolute;
        right: px2rem(-35);   
    }
    .progress-bar{
        height: 100%;
        width: 100%;
        position: absolute;
        .btn-wrapper{
            width: 18px;
            height:18px;
            background-color: #fff;
            border-radius: 100%;
            position: absolute;
            top: 50%;
            transform: translate(200px,-50%);
        }
        .progress-inner{
            position: absolute;
            left:0; 
            height: 100%;
            width: 60%;
            background-color: #fff;
        }
    }
}
</style>