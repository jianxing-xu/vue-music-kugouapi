/**
 * 歌曲的相关数据接口
 */

import axios from 'axios' /** 导入 axios */

/**
 * 根据歌曲的 rid标识获取到歌曲的播放地址(url)
 * @param {*} rid 歌曲的rid标识
 */
export function getSongUrl(rid) {
    return axios.get('/getSongUrl', {
        params: {           /** 和酷我官方保持一致的get请求参数 */
            format: 'mp3',
            rid,
            response: 'url',
            type: 'convert_url3',
            br: '128kmp3',
            from: 'web',
            t: 1566977072885 /** 这个参数是当前的时间戳 */
        }
    }).then(res => {
        return Promise.resolve(res.data);
    }).catch(()=>{
        return Promise.reject(res);
    })
}

/**
 * 根据歌曲的rid标识来请求歌曲的歌词方法
 * @param {*} rid 歌曲的rid标识
 */
export function getLyric(rid) {
    return axios.get(`http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${rid}`)
        .then(res => {
            return Promise.resolve(res.data);
        })
}

/**
 * 
 * @param {*} digest 固定常量参数
 * @param {*} sid 根据 sid 标识获取对应的评论
 * @param {*} page 评论的页码
 */
export function getCommont(digest,sid,page){
    return axios.get('http://www.kuwo.cn/comment',{
        params:{
            type:'get_comment',
            f:'web',
            page,
            rows:'20', /** 每页固定20条数据 */
            digest,
            sid,
            uid:0,
            prod:'newWeb'
        }
    }).then( res => {
        return Promise.resolve(res.data);
    })
}
/**
 * 根据跟单的pid标识请求歌曲列表
 * @param {*} pid 歌单的pid标识
 */
//http://www.kuwo.cn/api/www/playlist/playListInfo?pid=2852416543&pn=1&rn=30
export function getDiscSongs(pid){
    return axios.get('/getDiscSongs',{
        headers: {
            csrf: document.cookie.slice(9)
        },
        params:{
            pid,
            pn: 1,
            rn: 100,
        }
    }).then( res => {
        return Promise.resolve(res.data);
    })
}