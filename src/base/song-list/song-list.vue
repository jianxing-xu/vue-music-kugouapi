<template>
  <!--根组件-->
  <scroll class="song-list" v-if="songs" ref="songscroll" :data="songs" :listenScroll="listenScroll" :probeType="3" :scroller="scrolling">
    <ul>
      <li class="song-item" v-for="(song, index) in songs" :key="index" @click="selectItem(song,index)">
        <div class="sort">{{index+1}}</div>
        <div class="info">
          <h2 class="title" v-html="song.songname"></h2>
          <span class="text" v-html="song.artist"></span>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      }
    },
    listenScroll: {
        type: Boolean,
        default: false,
    }
  },
  data(){
      return {
          
      }
  },
  methods:{
      selectItem(song,index){
        this.$emit('selectItem',song,index);
      },
      scrolling(pos){
          if(this.listenScroll){
              this.$emit('scrolling',pos);
          }
      }
  }
};
</script>

<style scoped lang='scss'>
.song-list {
    ul{
        width: 100%;
        background-color: $bg-color;
    }
  width: 100%;
  height: 100%;
  .song-item {
    width: 100%;
    display: flex;
    align-items: center;
    height: px2rem(50);
    padding: 5px 0;
    border-bottom: solid 1px $text-color-d;
    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
        margin-left: 15px;
        .title,.text{
          width: px2rem(300);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .text{
            font-size: $font-size   ;
            color: $text-color-d;
        }
    }
    .sort {
      text-align: center;
      width: 48px;
      font-size: $font-size-mm;
    }
  }
}
</style>