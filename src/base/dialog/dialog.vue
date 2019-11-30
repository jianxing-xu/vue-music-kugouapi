<template>
  <!--根组件-->
  <transition name="log">
    <div class="dialog" v-if="showDialog">
      <div class="content">
        <div class="msg">{{msg}}</div>
        <div class="btn">
          <div class="ok" v-if="ok" @click="handleOK">{{ok}}</div>
          <div class="cancel" v-if="cancel" @click="handleCancel">{{cancel}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "服务器傲娇啦！"
    },
    ok: {
      type: String,
      default: "好的"
    },
    cancel: {
      type: String,
      default: "取消"
    }
  },
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    show() {
      this.showDialog = true;
    },
    hide() {
      this.showDialog = false;
    },
    handleCancel(){
        this.hide();
        this.$emit('handleCancel');
        return false;
    },
    handleOK(){
        this.hide();
        this.$emit('handleOK');
        return true;
    }
  }
};
</script>

<style scoped lang='scss'>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: blur(2px);
  display: flex;
  font-size: $font-size-mm;
  color: $text-color-ll;
  &.log-enter-active {
    animation: bg-fade .3s;
    .content{
        animation: zoom .3s;
    }
  }
  &.log-leave-active{
      animation: bg-fade-out .3s;
  }
  .content {
    background-color: $bg-dialog-color;
    border-radius: 20px;
    margin: auto;
    width: px2rem(250);
    .msg {
      text-align: center;
      padding: 15px;
      line-height: 2;
      border-bottom: solid 1px $text-color-d;
    }
    .btn {
      display: flex;
      text-align: center;
      .ok,
      .cancel {
        flex: 1;
        line-height: 2.5;
      }
    }
  }
}
@keyframes bg-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes bg-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>