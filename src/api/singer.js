/**
 * 歌手页面相关的数据接口方法
 */

import axios from 'axios' /** 导入 axios */
import {formatTonken} from "@/assets/js/util"
/**
 * 获取歌手列表方法
 */
export function getSingerList(){
    return axios.get('/getSingerList',{
        headers: {
            csrf: process.env.NODE_ENV === "development" ? document.cookie.slice(9) : formatTonken(document.cookie)
        },
        params:{
            category: 0,
            pn: 1,
            rn: 200, /** 默认获取200位歌手 */
        }
    }).then( res => {
        return Promise.resolve(res.data);
    })
}
/**
 * 根据歌手的 id 获取到歌手的歌曲方法
 * @param {*} id 歌手id
 */
export function getSongsById(id){
    return axios.get('/getSongsById',{
        headers: {
            csrf: process.env.NODE_ENV === "development" ? document.cookie.slice(9) : formatTonken(document.cookie)
        },
        params:{
            artistid:id,
            pn:1,
            rn:100 /** 固定前100首歌 */
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })
}

/**
 * 获取歌手的详细信息
 * 好像没用到
 * @param {*} id 
 */
export function getSingerinfo(id){
    return axios.get('http://www.kuwo.cn/api/www/artist/artist',{
        params:{
            artistid:id,
        }
    }).then( res => {
        console.log(res);
        return Promise.resolve(res.data);
    })
}