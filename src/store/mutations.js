import types from './types'
export default {
    [types.SET_SINGER](state,singer){
        state.singer = singer;
    },
    [types.SET_PLAYING](state,playing){
        state.playing = playing;
    },
    [types.SET_FULLSCRENN](state,fullScrenn){
        state.fullScrenn = fullScrenn;
    },
    [types.SET_PLAYMODE](state,mode){
        state.mode = mode;
    },
    [types.SET_PLAYLIST](state,list){
        state.playlist = list;
    },
    [types.SET_SEQUENCELIST](state,list){
        state.sequencelist = list;
    },
    [types.SET_CURRENTINDEX](state,index){
        state.currentIndex = index;
    }
}