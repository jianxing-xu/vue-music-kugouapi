/**
 * 歌曲排行版的相关数据接口
 */

import axios from 'axios' /** 导入axios库 */
import {formatTonken} from "@/assets/js/util"
/**
 * 获取排行榜列表数据方法
 */
export function getRank() {
    return axios.get('/getRank', {
        headers: {
            csrf: process.env.NODE_ENV === "development" ? document.cookie.slice(9) : formatTonken(document.cookie)
        },
    }).then(res => {
        return Promise.resolve(res.data);
    })
}
/**
 * 通过榜单的id标识 获取到每个榜单的 歌曲列表方法
 * @param {*} bangId 每个榜单的id标识
 */

export function getBangSongs(bangId) {
    return axios.get('/getBangSongs', {
        headers: {
            csrf: process.env.NODE_ENV === "development" ? document.cookie.slice(9) : formatTonken(document.cookie)
        },
        params: {
            bangId,
            pn: 1,   /** 此处固定页数位第一页，每页的数据为 100 条 */
            rn: 100
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })
}