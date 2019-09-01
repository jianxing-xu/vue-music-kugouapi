<template>
  <!--根组件-->
  <div class="bang">
      <MusicList :songs="songs" :info="bang" />
  </div>
</template>

<script>
import MusicList from "@/components/MusicList/MusicList.vue";
import { getBangSongs } from "@/api/rank";
import { createSong } from "@/assets/js/song";
import { ERR_OK } from "@/api/config";
import { mapGetters } from "vuex";
export default {
    data(){
        return {
            songs:[],
        }
    },
    computed:{
        ...mapGetters(['bang'])
    },
    methods:{
        _getBangSongs(){
            getBangSongs(parseInt(this.bang.sourceid)).then( res => {
                if(res.code === ERR_OK){
                    this.songs = this._normallize(res.data.musicList);
                }
            })
        },
        _normallize(songs){
            let ret = [];
            songs.forEach(song => {
                ret.push(createSong(song));
            });
            return ret;
        }
    },

    components:{
        MusicList
    },
    created() {
        if(!this.bang.id){
            return this.$router.back();
        }
        this._getBangSongs();
    },
};
</script>

<style scoped lang='scss'>
.bang {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: $bg-hig-color;
}
</style>