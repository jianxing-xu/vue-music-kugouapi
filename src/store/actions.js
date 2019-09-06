import types from './types'
import { playMode } from '@/assets/js/config'
import { random } from "@/assets/js/util"
import { saveHistory, deleteHistory, clearHistory, toggleFavorite } from '@/assets/js/cache'


function findIndex(song, songs) {
    let i = songs.findIndex((item) => {
        return item.rid === song.rid;
    });
    return i;
}
export default {
    selectPlay({ commit, state, getters }, { song, index, songs }) {
        let Songs = songs.slice();
        if (getters.currentSong && getters.currentSong.rid === song.rid) {
            commit(types.SET_FULLSCRENN, true);
            return;
        } else {
            commit(types.SET_PLAYING, true);
            commit(types.SET_FULLSCRENN, true);
            commit(types.SET_PLAYLIST, Songs);
            commit(types.SET_SEQUENCELIST, Songs);
            commit(types.SET_CURRENTINDEX, index);
        }
    },
    randomAll({ commit, state }, songs) {
        let Songs = songs.slice();
        let index = random(0, Songs.length - 1);
        commit(types.SET_PLAYMODE, playMode.random);
        commit(types.SET_PLAYLIST, Songs);
        commit(types.SET_SEQUENCELIST, Songs);
        commit(types.SET_CURRENTINDEX, index);
        commit(types.SET_PLAYING, true);
        commit(types.SET_FULLSCRENN, true);
    },
    _saveHistory({ commit }, key) {
        let searchs = saveHistory(key);
        commit(types.SET_HISTORY, searchs);
    },
    _deleteHistory({ commit }, key) {
        let searchs = deleteHistory(key);
        commit(types.SET_HISTORY, searchs);
    },
    _clearHistory({ commit }) {
        let searchs = clearHistory();
        commit(types.SET_HISTORY, searchs);
    },
    insertSong({ commit, state }, song) {
        let playlist = state.playlist.slice();
        let currentIndex = state.currentIndex;
        let sequencelist = state.sequencelist.slice();
        let currentSong = playlist[currentIndex];
        if (currentSong && currentSong.rid === song.rid) {
            commit(types.SET_FULLSCRENN, true);
        } else {
            let fdx = findIndex(song, playlist);
            currentIndex++;
            playlist.splice(currentIndex, 0, song);
            sequencelist.splice(currentIndex, 0, song);
            

            if (fdx > -1) {
                if (fdx < currentIndex) {
                    playlist.splice(fdx, 1);
                    currentIndex--;
                } else {
                    playlist.splice(fdx + 1, 1);
                }
            }
            commit(types.SET_FULLSCRENN, true);
            commit(types.SET_PLAYLIST,playlist);
            commit(types.SET_CURRENTINDEX, currentIndex);
            commit(types.SET_PLAYING, true);
        }


    },
    deleteSong({commit,state},index){
        let playlist = state.playlist.slice();
        let currentIndex = state.currentIndex;
        playlist.splice(index,1);
        if(index < currentIndex){
            currentIndex --;
        }
        commit(types.SET_PLAYLIST,playlist);
        commit(types.SET_CURRENTINDEX,currentIndex);
    },
    clearPlaylist({commit,state}){
        commit(types.SET_PLAYING,false);
        commit(types.SET_PLAYLIST,[]);
    },
    _toggleFavorite({commit,state},song){
        let favorite = toggleFavorite(song);
        commit(types.SET_FAVORITE,favorite);
    }   
}