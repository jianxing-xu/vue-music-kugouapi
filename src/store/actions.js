import types from './types'
import { playMode } from '@/assets/js/config'
import { random } from "@/assets/js/util"
import { saveHistory, deleteHistory } from '@/assets/js/cache'
export default {
    selectPlay({ commit, state, getters }, { song, index, songs }) {
        if (getters.currentSong && getters.currentSong.rid === song.rid) {
            commit(types.SET_FULLSCRENN, true);
            return;
        } else {
            commit(types.SET_PLAYING, true);
            commit(types.SET_FULLSCRENN, true);
            commit(types.SET_PLAYLIST, songs);
            commit(types.SET_SEQUENCELIST, songs);
            commit(types.SET_CURRENTINDEX, index);
        }
    },
    randomAll({ commit, state},songs) {
        let index = random(0, songs.length - 1);
        commit(types.SET_PLAYMODE, playMode.random);
        commit(types.SET_PLAYLIST, songs);
        commit(types.SET_SEQUENCELIST, songs);
        commit(types.SET_CURRENTINDEX, index);
        commit(types.SET_PLAYING, true);
        commit(types.SET_FULLSCRENN, true);
    },
    _saveHistory({commit},key){
        let searchs = saveHistory(key);
        commit(types.SET_HISTORY,searchs);
    },
    _deleteHistory({commit},key){
        let searchs = deleteHistory(key);
        commit(types.SET_HISTORY,searchs);
    },
    insertSong({commit,state},song){
        
    }
}