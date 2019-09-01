import axios from 'axios'

export function getMVList(pid,page) {
    return axios.get('http://www.kuwo.cn/api/www/music/mvList', {
        params: {
            pid,
            pn: page,
            rn: 30,
        }
    }).then( res => {
        return Promise.resolve(res.data);
    })
}

export function getMVUrl(rid){
    return axios.get('/getMVUrl',{
        params:{
            rid,
            response:'url',
            format:'mp4|mkv',
            type:'convert_url',
            t:Date.now(),
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })
}