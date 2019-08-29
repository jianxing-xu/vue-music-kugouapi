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