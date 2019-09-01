import axios from 'axios'

export function getRank(){
    return axios.get('http://www.kuwo.cn/api/www/bang/bang/bangMenu').then( res => {
        return Promise.resolve(res.data);
    })
}

export function getBangSongs(bangId){
    return axios.get('http://www.kuwo.cn/api/www/bang/bang/musicList',{
        params:{
            bangId,
            pn:1,
            rn:100
        }
    }).then (res => {
        return Promise.resolve(res.data);
    })
}