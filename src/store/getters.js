export default {
    singer: (state) => state.singer,
    playing: (state) => state.playing,
    fullScrenn: (state) => state.fullScrenn,
    playlist: (state) => state.playlist,
    sequencelist: (state) => state.sequencelist,
    currentIndex: (state) => state.currentIndex,
    currentSong: (state) => state.playlist[state.currentIndex],
    mode: (state) => state.mode
}