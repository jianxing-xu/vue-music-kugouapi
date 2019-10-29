/**
 * 首页的相关数据接口方法
 */

import axios from 'axios' /** 导入axios库 */

/**
 * 获取QQ音乐的轮播图数据
 */
export function getSlider() {
    return axios.get('/getSlider', {
        params: {   /** 和qq音乐保持一致的get参数 */
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
        }
    }).then(res => {
        return Promise.resolve(res.data);
    });
}

/**
 * 获取歌单列表
 * @param {*} page 要获取的页数
 */
export function getDisc(page){
    return axios.get(`http://www.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?pn=${page}&rn=30&order=new`).then( res =>{
        return Promise.resolve(res.data);
    })
}












/**
 * 首页轮播
 * http://www.kuwo.cn/api/www/banner/index/bannerList?reqId=49005730-c970-11e9-8f0e-239a366609d8
 *
 *
 * http://www.kuwo.cn/api/www/artist/artistInfo?category=0&pn=1&rn=100 请求歌手列表
 * http://www.kuwo.cn/api/www/artist/artist?artistid=226572           请求歌手详情
 * http://www.kuwo.cn/api/www/artist/artistMusic?artistid=226572&pn=1&rn=30 歌手歌曲列表
 * http://www.kuwo.cn/url?format=mp3&rid=65633689&response=url&type=convert_url3&br=128kmp3&from=web&t=1566977072885 歌曲的播放地址url
 *
 * http://www.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?pn=1&rn=30&order=new 歌单列表
 * http://www.kuwo.cn/api/www/playlist/playListInfo?pid=2852416543&pn=1&rn=30    歌单详情和歌曲
 * http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=75867567 歌词
 *
 * http://www.kuwo.cn/api/www/search/searchKey?key=x 搜索歌曲 为空时返回热门搜索
 * http://www.kuwo.cn/api/www/music/mvList?pid=236682871&pn=1&rn=30  MV列表
 * http://www.kuwo.cn/url?rid=52616906&response=url&format=mp4%7Cmkv&type=convert_url&t=1566981501301&reqId=310d2a50-c96f-11e9-8106-99cdd0ef0ae6  返回MV的url文件
 *
 *
 *
 * http://www.kuwo.cn/api/www/bang/bang/bangMenu  榜单集合
 * http://www.kuwo.cn/api/www/bang/bang/musicList?bangId=93&pn=1&rn=30  榜单歌曲
 *
 *
 * 最新评论  和  热门评论
 * http://www.kuwo.cn/comment?type=get_comment&f=web&page=1&rows=20&digest=7&sid=52004720&uid=0&prod=newWeb
 * http://www.kuwo.cn/comment?type=get_rec_comment&f=web&page=1&rows=20&digest=2&sid=93&uid=0&prod=newWeb
 *
 * 歌单下的评论 digest 都是 8
 * 榜单下的评论 digest 都是 2
 * 歌曲的digest 都是 15
 * MV下的评论 digest 都是 7
 *
 *
*/



