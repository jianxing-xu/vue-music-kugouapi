<template>
  <!--根组件-->
  <div class="mv-list">
    <scroll :data="mv && mv.mvlist">
      <div class="list" v-if="mv">
        <section
          class="mv-item"
          v-for="(item, index) in mv.mvlist"
          :key="index"
          @click="selectItem(item)"
        >
          <div class="pic">
            <div class="mask"></div>
            <img :src="item.pic" width="100%" height="100%" />
            <span class="play-icon">
              <i class="iconfont icon-zanting"></i>
            </span>
            <div class="cnt">
              <span class="play-cnt">
                <i class="iconfont icon-zanting"></i>
                <span>{{item.mvPlayCnt}}</span>
              </span>
              <span class="time">{{item.songTimeMinutes}}</span>
            </div>
            <div class="info">
              <span class="name">{{item.name}}</span>
              <span class="artist">{{item.artist}}</span>
            </div>
          </div>
        </section>
      </div>
    </scroll>
    <div class="loading-wrapper" v-if="!mv.mvlist">
      <loading />
    </div>
  </div>
</template>

<script>
import { getMVList } from "@/api/mv";
export default {
  data() {
    return {
      page: 1,
      mv: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    _getMVList() {
      getMVList(this.id, this.page).then(res => {
        if (res.code === 200) {
          this.mv = res.data;
        }
      });
    },
    selectItem(item) {
      this.$emit("selectItem", item);
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.mv = {};
        this._getMVList();
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.mv-list {
  position: fixed;
  width: 100%;
  top: px2rem(138);
  bottom: 0;
  box-sizing: border-box;
  font-size: $font-size-mm;
  color: $text-color-ll;
  overflow: hidden;
  .loading-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .list {
    width: 100%;
    .mv-item {
      width: 100%;
      height: px2rem(240);
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      border-bottom: solid 1px $theme-color-dd;
      .play-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .iconfont {
          font-size: px2rem(50);
        }
      }
      .pic {
        width: 100%;
        height: 100%;
        position: relative;
        .mask {
          width: 100%;
          height: 100%;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.3);
        }
        .cnt {
          z-index: 2;
          width: 100%;
          position: absolute;
          .play-cnt {
            position: absolute;
            bottom: 15px;
            left: 15px;
          }
          .time {
            position: absolute;
            right: 15px;
            bottom: 15px;
          }
        }
      }
      .info {
        width: 100%;
        padding-left: 15px;
        display: flex;
        flex-direction: column;
        position:absolute;
        top: 0;
        .name {
          line-height: 2;
          display: inline-block;
          width: px2rem(300);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: $font-size-ll;
        }
        .artist {
          display: inline-block;
          font-size: $font-size-m;
        }
      }
    }
  }
}
</style>