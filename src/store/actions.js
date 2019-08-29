import types from './types'
import { getSongUrl } from '@/api/song'
import Vue from 'vue'
export default {
    selectPlay({commit,state},{song,index,songs}){
        getSongUrl(song.rid).then( res => {
            Vue.set(songs[index],'url',res.url);
        });
        console.log(song);
        commit(types.SET_PLAYING,true);
        commit(types.SET_FULLSCRENN,true);
        commit(types.SET_PLAYLIST,songs);
        commit(types.SET_SEQUENCELIST,songs);
        commit(types.SET_CURRENTINDEX,index);
    }
}