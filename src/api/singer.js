import axios from 'axios'

export function getSingerList(){
    return axios.get('http://www.kuwo.cn/api/www/artist/artistInfo',{
        params:{
            category: 0,
            pn: 1,
            rn: 200,
        }
    }).then( res => {
        return Promise.resolve(res.data);
    })
}

export function getSongsById(id){
    return axios.get('http://www.kuwo.cn/api/www/artist/artistMusic',{
        params:{
            artistid:id,
            pn:1,
            rn:100
        }
    }).then(res => {
        return Promise.resolve(res.data);
    })
}

export function getSingerinfo(id){//好像没用到
    return axios.get('http://www.kuwo.cn/api/www/artist/artist',{
        params:{
            artistid:id,
        }
    }).then( res => {
        return Promise.resolve(res.data);
    })
}