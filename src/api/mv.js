/**
 *  mv相关的 api请求
 */

import axios from 'axios'   /** 导入 axios 请求库 */
import {formatTonken} from "@/assets/js/util"

/**
 * 根据分类id 获取mv的列表方法
 * @param {*} pid mv分类
 * @param {*} page 请求的当前页
 */
export function getMVList(pid, page) {
    // return axios.get('http://www.kuwo.cn/api/www/music/mvList', {
    //     params: {
    //         pid,
    //         pn: page,
    //         rn: 30,
    //     }
    // }).then( res => {
    //     return Promise.resolve(res.data);
    // })
    return axios.get('/getMVList', {
        headers: {
            csrf: process.env.NODE_ENV === "development" ? document.cookie.slice(9) : formatTonken(document.cookie)
        },
        params: {
            pid,
            pn: page,
            rn: 30
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })

}

/**
 * 根据MV的rid 获取到mv的播放地址的方法，get参数尽量和酷我保持一致
 * @param {*} rid mv的rid
 */
export function getMVUrl(rid) {
    return axios.get('/getMVUrl', {
        params: {
            rid,
            response: 'url',
            format: 'mp4|mkv',
            type: 'convert_url',
            t: Date.now(),
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })
}