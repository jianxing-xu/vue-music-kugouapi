import axios from 'axios'


export function getSongUrl(rid) {
    return axios.get('/getSongUrl', {
        params: {
            format: 'mp3',
            rid,
            response: 'url',
            type: 'convert_url3',
            br: '128kmp3',
            from: 'web',
            t: 1566977072885
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })
}

export function getLyric(rid) {
    return axios.get(`http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${rid}`)
        .then(res => {
            return Promise.resolve(res.data);
        })
}
export function getCommont(sid,page){
    return axios.get('http://www.kuwo.cn/comment',{
        params:{
            type:'get_comment',
            f:'web',
            page,
            rows:'20',
            digest:15,
            sid,
            uid:0,
            prod:'newWeb'
        }
    }).then( res => {
        return Promise.resolve(res.data);
    })
}
//http://www.kuwo.cn/api/www/playlist/playListInfo?pid=2852416543&pn=1&rn=30
export function getDiscSongs(pid){
    return axios.get('http://www.kuwo.cn/api/www/playlist/playListInfo',{
        params:{
            pid,
            pn: 1,
            rn: 100,
        }
    }).then( res => {
        return Promise.resolve(res.data);
    })
}