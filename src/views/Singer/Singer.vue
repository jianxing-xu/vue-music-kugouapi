<template>
  <!--根组件-->
  <div class="singer">
    <ListView :datas="singers" @selectItem="selectItem" />
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { toFirstCode } from "@/assets/js/util";
import { Singer } from "@/assets/js/singer";
import { getSingerList } from "@/api/singer";
import ListView from "@/base/list-view/list-view.vue";
import { mapMutations } from "vuex";
import { setTimeout } from "timers";
const HOT_TITLE = "热门";
export default {
  data() {
    return {
      singers: []
    };
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        this.singers = this._normallize(res.data.artistList);
      });
    },
    _normallize(arr) {
      arr.forEach(item => {
        item.code = toFirstCode(item.name);
      });
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      };
      arr.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push(
            new Singer({
              name: item.name,
              fans: item.artistFans,
              id: item.id,
              musicNum: item.musicNum,
              mvNum: item.mvNum,
              pic: item.pic,
              pic70: item.pic70,
              pic120: item.pic120,
              pic300: item.pic300
            })
          );
        }
        const key = item.code;
        if (!map[key]) {
          map[key] = {
            title: item.code,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            name: item.name,
            fans: item.artistFans,
            id: item.id,
            musicNum: item.musicNum,
            mvNum: item.mvNum,
            pic: item.pic,
            pic70: item.pic70,
            pic120: item.pic120,
            pic300: item.pic300
          })
        );
      });
      const hot = [];
      const ret = [];
      for (let key in map) {
        if (map[key].title === HOT_TITLE) {
          hot.push(map[key]);
        } else {
          ret.push(map[key]);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    selectItem(singer) {
      this.setSinger(singer);
      this.$router.push({
        path: `/singer/${singer.id}`
      });
    },

    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },
  created() {
    this._getSingerList();
  },
  components: {
    ListView
  }
};
</script>

<style scoped lang='scss'>
.singer {
  .slide-enter,
  .slide-leave-to {
    transform: translateX(100%);
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.4s ease;
  }
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  font-size: $font-size-m;
}
</style>