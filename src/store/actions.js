import types from './types'
import { getSongUrl } from '@/api/song'
import Vue from 'vue'
export default {
    selectPlay({commit,state,getters},{song,index,songs}){
        if(getters.currentSong && getters.currentSong.rid === song.rid){
            commit(types.SET_FULLSCRENN,true);
            return;
        }else{
            commit(types.SET_PLAYING,true);
            commit(types.SET_FULLSCRENN,true);
            commit(types.SET_PLAYLIST,songs);
            commit(types.SET_SEQUENCELIST,songs);
            commit(types.SET_CURRENTINDEX,index);
        } 
    }
}