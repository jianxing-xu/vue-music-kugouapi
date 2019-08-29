<template>
  <!--根组件-->
  <div class="music-list" v-if="info">
    <div class="header" ref="header">
      <div class="back" @click="$router.back()">
        <i class="iconfont icon-leftarrow"></i>
      </div>
      <div class="title">
        <h2 v-html="info.name"></h2>
      </div>
    </div>
    <div class="filter" :style="bgImg" ref="bgImg"></div>
    <div class="content">
      <div class="avatar">
        <img :src="info.pic300" alt />
      </div>
      <div class="info">
        <span class="name" v-html="info.name"></span>
        <span class="fans-num">粉丝数：{{info.fans}}</span>
        <div class="playAll">
          <i class="iconfont icon-zanting"></i>
          <span class="text">播放全部</span>
        </div>
      </div>
    </div>
    <div class="list" ref="list">
      <SongList :songs="songs" :listenScroll="true" @scrolling="scrolling" @selectItem="selectItem" />
    </div>
  </div>
</template>

<script>
import SongList from "@/base/song-list/song-list.vue";
import { mapActions } from 'vuex'
export default {
  props:{
      info:{
          type: Object,
          default: null,
      },
      songs:{
          type: Array,
          default(){return []}
      }
  },
  data() {
    return {
    };
  },
  computed: {
    bgImg() {
      return `background: url("${this.info &&
        this.info.pic300}") no-repeat;
        background-size: cover`;
    }
  },
  methods:{
      scrolling(pos){
          let y = pos.y;
          if(y>0){
              let scale = 1 + y/this.bgH;
              this.$refs.bgImg.style['transform'] = `scale(${scale})`;
          }else{
              if(y< -(this.bgH - this.headerH)){
                 this.$refs.list.style.top = this.headerH + 'px' 
                 this.$refs.list.style.paddingTop = (this.bgH - this.headerH) + 'px' 
              }else{
                 this.$refs.list.style.top = '0'
                 this.$refs.list.style.paddingTop = '60%'
              }
          }
      },
      selectItem(song,index){
          this.selectPlay({song,index,songs:this.songs});
      },
      ...mapActions(['selectPlay'])
  },

  components: {
    SongList
  },
  mounted(){
      this.$nextTick(()=>{
          this.bgH = this.$refs.bgImg.clientHeight;
          this.headerH = this.$refs.header.clientHeight;
      })
  }
};
</script>
<style scoped lang='scss'>
.music-list {
  font-size: $font-size-m;
  width: 100%;
  height: 100%;
  position: relative;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    height: px2rem(48);
    line-height: px2rem(48);
    display: flex;
    z-index: 50;
    .back {
      padding-left: 15px;
    }
    .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .filter {
    width: 100%;
    padding-top: 60%;
    filter: blur(20px);
  }
  .content {
    position: absolute;
    top: 0;
    padding-top: 25%;
    display: flex;
    align-items: center;
    .info {
      height: 100%;
      display: flex;
      flex-direction: column;
      .name {
        font-size: $font-size-l;
      }
      .fans-num {
        margin: 10px 0;
        color: $text-color-l;
      }
      .playAll {
        font-size: $font-size-m;
        display: flex;
        padding: auto;
        align-items: center;
        border-radius: 20px;
        padding: 5px 10px;
        background-color: $text-color-d;
        .iconfont {
          font-size: $font-size-m;
          margin-right: px2rem(10);
        }
      }
    }
    .avatar {
      img {
        width: 100%;
        height: 100%;
      }
      margin: 0 20px 0 20px;
      width: px2rem(120);
      height: px2rem(120);
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .list{
      width: 100%;  
      padding:15px 0 0 0;
      position:fixed;
      top: px2rem(0);
      padding-top: 60%;
      bottom:0;
      overflow: hidden;
  }
}
</style>