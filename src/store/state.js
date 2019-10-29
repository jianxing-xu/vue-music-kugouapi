/**
 * store 仓库
 */

/** 导入配置中的播放模式 */
import { playMode } from "@/assets/js/config"

/** 导入 cache 中的方法 */
import { loadHistory,loadFavorite, loadPlayHis } from "@/assets/js/cache"
export default {
    singer: [], /** 歌手数据 */
    disc: {},   /** 当前选择歌单数据 */
    bang: {},   /** 当前选择榜单数据 */

    playing: false, /** 播放状态 */
    fullScrenn: false, /** 全屏状态 */
    mode: playMode.sequence, /** 播放模式 */
    playlist: [],   /** 长在播放的列表 */
    sequencelist: [], /** 顺序播放列表 */
    currentIndex:-1,  /** 当前播放歌曲在播放列表中的索引 */
    favorite: loadFavorite(), /** 加载我的喜欢歌曲 */

    his: loadHistory(), /** 加载历史搜索词 */

    played: loadPlayHis(),  /** 加载播放历史 */

}