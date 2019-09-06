
import { playMode } from "@/assets/js/config"
import { loadHistory,loadFavorite } from "@/assets/js/cache"
export default {
    singer: [],
    disc: {},
    bang: {},

    playing: false,
    fullScrenn: false,
    mode: playMode.sequence,
    playlist: [],
    sequencelist: [],
    currentIndex:-1,
    favorite: loadFavorite(),

    his: loadHistory(),

}