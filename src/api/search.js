import axios from 'axios'


export function getSuggestKey(key){
    return axios.get(`http://www.kuwo.cn/api/www/search/searchKey?key=${key}`).then(res=>{
        return Promise.resolve(res.data);
    })
}

export function getMusicByKey(key,pn,rn){
    return axios.get('http://www.kuwo.cn/api/www/search/searchMusicBykeyWord',{
        params:{
            key,
            pn,
            rn
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })
}