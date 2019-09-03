<template>
  <!--根组件-->
  <div class="rank">
    <div class="rank-list" ref="list">
      <scroll :data="rank">
        <ul>
          <li class="rank-group" v-for="(group, index) in rank" :key="index">
            <h2 class="title">{{group.name}}</h2>
            <ul>
              <li
                class="rank-item"
                v-for="(item, index) in group.list"
                :key="index"
                @click="selectItem(item)"
              >
                <div class="avatar">
                  <img v-lazy="item.pic" width="100%" height="100%" />
                </div>
                <div class="info">
                  <h3 class="subtitle">{{item.name}}</h3>
                  <span class="time">{{item.pub}}</span>
                  <i class="iconfont icon-rightarrow"></i>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <div class="loading-wrapper" v-if="!rank.length">
        <loading />
    </div>
  </div>
</template>

<script>
import { playlistMixin } from '@/assets/js/mixin'
import { getRank } from "@/api/rank";
import { ERR_OK } from "@/api/config";
import { mapGetters, mapMutations } from "vuex";
export default {
  mixins:[playlistMixin],
  data() {
    return {
      rank: []
    };
  },
  computed: {
    ...mapGetters(["bang"])
  },

  methods: {
    _getRank() {
      getRank().then(res => {
        if (res.code === ERR_OK) {
          this.rank = res.data;
        }
      });
    },
    selectItem(bang) {
      this.setBang(bang);
      this.$router.push({
        path: `/rank/${bang.sourceid}`
      });
    },
    handlePlaylist(list){
      const bottom = list.length ? '60px' : '';
      this.$refs.list.style.bottom = bottom;
    },

    ...mapMutations({
      setBang: "SET_BANG"
    })
  },

  created() {
    this._getRank();
  }
};
</script>

<style scoped lang='scss'>
.rank {
  width: 100%;
  height: 100%;
  font-size: $font-size-mm;
  box-sizing: border-box;
  .loading-wrapper{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
  }
  .slide-enter-active, .slide-leave-active{
      transition: all .4s ease;
  }
  .slide-enter, .slide-leave-to{
      transform: translateX(100%);
  }
  .rank-list {
    overflow: hidden;
    width: 100%;
    position: fixed;
    top: px2rem(90);
    bottom: 0;
    padding: 0 15px;
    box-sizing: border-box;
    .rank-group {
      width: 100%;
      .title {
        padding: 10px 15px;
        font-size: $font-size-ll;
        font-weight: bold;
      }
      .rank-item {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        padding: 15px;
        background-color: $bg-color-d;
        border-radius: 15px;
        box-sizing: border-box;
        .avatar {
          width: px2rem(86);
          height: px2rem(86);
        }
        .info {
          color: $text-color-ll;
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: space-between;
          .subtitle {
            padding: 0 px2rem(20);
            font-size: $font-size-l;
          }
          .time {
            font-size: $font-size-m;
          }
        }
      }
    }
  }
}
</style>