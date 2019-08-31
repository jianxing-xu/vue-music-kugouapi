<template>
  <!--根组件-->
  <div class="detail">
    <MusicList :songs="songs" :info="disc" />
  </div>
</template>

<script>
import MusicList from "@/components/MusicList/MusicList.vue";
import { getDiscSongs } from "@/api/song";
import { createSong } from "@/assets/js/song";
import { ERR_OK } from "@/api/config";
import { mapGetters } from "vuex";
export default {
  data(){
      return {
          songs: [],
      }
  },
  computed: {
    ...mapGetters(["disc"])
  },
  methods: {
    _getDiscSongs() {
      getDiscSongs(parseInt(this.disc.id)).then(res => {
          console.log(res);
        if (res.code === ERR_OK) {
          this.songs = this._normallizeSongs(res.data.musicList);
        }
      });
    },
    _normallizeSongs(songs) {
      let ret = [];
      songs.forEach(song => {
        ret.push(createSong(song));
      });
      return ret;
    }
  },
  created(){
      console.log(this.disc);
      if(!this.disc.id){
          this.$router.back();
      }
      this._getDiscSongs();
  },

  components: {
    MusicList
  }
};
</script>

<style scoped lang='scss'>
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: $bg-hig-color;
}
</style>
