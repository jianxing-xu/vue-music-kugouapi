<template>
  <div class="detail">
    <MusicList :info="singer" :songs="songs" />
  </div>
</template>

<script>
import MusicList from "@/components/MusicList/MusicList.vue";
import { getSongsById } from "@/api/singer";
import { createSong } from "@/assets/js/song";
import { ERR_OK } from "@/api/config";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      songs: []
    };
  },
  computed: {
    ...mapGetters(["singer"])
  },
  methods: {
    _getSongs() {
      getSongsById(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normallizeSongs(res.data.list);
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

  created() {
    if (!this.singer.id) {
      return this.$router.back();
    }
    this._getSongs();
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