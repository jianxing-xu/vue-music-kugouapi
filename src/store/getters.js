export default {
    singer: (state) => state.singer,
    disc: (state) => state.disc,
    bang: (state) => state.bang,
    playing: (state) => state.playing,
    fullScrenn: (state) => state.fullScrenn,
    playlist: (state) => state.playlist,
    sequencelist: (state) => state.sequencelist,
    currentIndex: (state) => state.currentIndex,
    currentSong: (state) => state.playlist[state.currentIndex],
    mode: (state) => state.mode,
    his: (state) => state.his,
    favorite: (state) => state.favorite,
    played: (state) => state.played

}