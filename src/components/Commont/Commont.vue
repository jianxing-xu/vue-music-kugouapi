<template>
  <!--根组件-->
  <transition :name="ani">
    <div class="commont" v-if="showCommont && commont">
      <div class="header" v-if="header">
        <div class="back" @click="hide">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="title"></div>
      </div>
      <div class="commont-wrapper" v-if="commont.rows">
        <div class="new-commont">
          <div class="list" ref="list">
            <scroll :data="commont.rows" :purpul="purpul" @scrollToEnd="scrollToEnd">
              <div>
                <h2 class="title">
                  <span class="text">最新评论</span>
                  <span class="num">{{commont.total}}条评论</span>
                </h2>
                <ul>
                  <li class="commont-item" v-for="(item, index) in commont.rows" :key="index">
                    <div class="avatar">
                      <img
                        v-lazy="item.u_pic || (item.reply?item.reply.u_pic:'') || ''"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div class="info">
                      <span class="username" v-html="decode(item.u_name)"></span>
                      <div class="content">
                        <span v-if="!item.reply">{{item.msg}}</span>
                        <div v-else>
                          <span>
                            回复
                            <span style="color:rgb(105, 128, 230)">@{{decode(item.reply.u_name)}}</span>
                            : {{item.msg}}
                            <br />
                          </span>
                          <div class="reply">{{item.reply.msg}}</div>
                        </div>
                      </div>
                      <span class="time">{{item.time}}</span>
                    </div>
                  </li>
                </ul>
                <div class="loading-wrapper" v-if="isMore">
                  <loading />
                </div>
              </div>
            </scroll>
          </div>
        </div>
      </div>
      <div class="no-commont" v-else>暂无任何评论</div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    commont: {
      type: Object,
      default() {
        return {};
      }
    },
    header: {
      type: Boolean,
      default: true
    },
    ani: {
      type: String,
      default: "commont"
    }
  },
  data() {
    return {
      purpul: true,
      showCommont: false
    };
  },
  computed: {
    isMore() {
      const commont = this.commont;
      return commont.pageSize * commont.currentPage < commont.total;
    }
  },
  methods: {
    show() {
      this.showCommont = true;
    },
    hide() {
      this.$emit('hideCommont');
      setTimeout(()=>{
        this.showCommont = false;
      },500)
    },
    decode(code) {
      return decodeURIComponent(code);
    },
    scrollToEnd() {
      if (this.isMore) {
        this.$emit("scrollToEnd");
      }
    },
  },
  mounted() {
    this.show();
  }
};
</script>

<style scoped lang='scss'>
.commont {
  overflow: hidden; 
  font-size: $font-size-mm;
  width: 100%;
  height: 100%;
  background-color: $bg-color;
  position: absolute;
  top: 0;
  left: 0;
  color: $text-color-l;
  z-index: 200;
  .no-commont {
    position: fixed;
    top: px2rem(200);
    left: 50%;
    transform: translate(-50%,500%);
  }
  &.commont-enter-active,
  &.commont-leave-active {
    transition: all 0.4s ease;
  }
  &.commont-enter,
  &.commont-leave-to {
    transform: translateX(100%);
  }
  .header {
    width: 100%;
    height: px2rem(48);
    line-height: px2rem(48);
    display: flex;
    position: relative;
    color: #eee;
    .back {
      z-index: 10;
      padding: 0 8px 0;
    }
    .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .commont-wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .new-commont {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .title {
        display: flex;
        align-items: center;
        font-weight: lighter;
        justify-content: center;
        font-size: $font-size-m;
        padding-top: 20px;
        .text {
          padding-right: 15px;
          font-size: $font-size-ll;
          font-weight: bold;
          color: $text-color-ll;
        }
      }
      .list {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 60px;
        padding-left: 20px;
        .loading-wrapper {
          width: 100vw;
          display: flex;
          justify-content: center;
          height: 64px;
          align-items: center;
          transform: translateX(-20px);
        }
        ul {
          width: 100%;
          .commont-item {
            width: 100%;
            display: flex;
            padding: 20px 0 0 10px;
            .avatar {
              border-radius: 100%;
              width: px2rem(48);
              height: px2rem(48);
              overflow: hidden;
              margin-right: 15px;
            }
            .info {
              display: flex;
              flex-direction: column;
              width: px2rem(270);
              .username {
                font-size: $font-size-l;
                font-weight: bolder;
                color: $text-color-ll;
              }
              .content {
                font-size: $font-size-m;
                color: $text-color-ll;
                line-height: 1.5;
                padding: 5px 0;
                .reply {
                  margin-top: 5px;
                  border-left: solid 1px $text-color-l;
                  padding-left: 15px;
                  color: $text-color-l;
                }
              }
              .time {
                font-size: $font-size;
                color: $text-color-l;
              }
            }
          }
        }
      }
    }
  }
}
</style>