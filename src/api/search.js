/**
 * 搜索界面相关数据接口
 */

import axios from 'axios' /** 导入 axios 库 */

/**
 * 通过关键字获取联想建议词
 * @param {*} key 关键字
 */
export function getSuggestKey(key) {
    return axios.get('/getSuggestKey',{
        headers: {
            csrf: document.cookie.slice(9)
        },
        params:{
            key
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })
}

/**
 * 通过关键字请求到的歌曲搜索结果
 * @param {*} key 关键字
 * @param {*} pn 页码
 * @param {*} rn 每页的数量
 */
export function getMusicByKey(key, pn, rn) {
    return axios.get('/getMusicByKey', {
        headers: {
            csrf: document.cookie.slice(9)
        },
        params: {
            key,
            pn,
            rn
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })
}
/**
 * 通过关键字请求到的歌手搜索结果
 */
export function getArtistByKey(key, pn, rn) {
    return axios.get('/getArtistByKey', {
        headers: {
            csrf: document.cookie.slice(9)
        },
        params: {
            key,
            pn,
            rn
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })
}