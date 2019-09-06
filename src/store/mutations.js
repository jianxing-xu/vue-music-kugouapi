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
    },
    [types.SET_DISC](state,disc){
        state.disc = disc;
    },
    [types.SET_BANG](state,bang){
        state.bang = bang;
    },
    [types.SET_HISTORY](state,his){
        state.his = his;
    },
    [types.SET_FAVORITE](state,favorite){
        state.favorite = favorite;
    }
}