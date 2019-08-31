import { getLyric, getCommont} from '@/api/song'
import Vue from 'vue'
export class Song {
    constructor({ songname, albumname, albumid, albumpic, artist, artistid, duration, rid, pic, pic120, songTime }) {
        this.songname = songname;
        this.albumname = albumname;
        this.albumid = albumid;
        this.albumpic = albumpic;
        this.artist = artist,
        this.artistid = artistid;
        this.duration = duration;
        this.rid = rid;
        this.pic = pic;
        this.pic120 = pic120;
        this.songTime = songTime;
    }
    getSongLyric() {
        getLyric(this.rid).then(res => {
            if (res.status === 200) {
                if(!res.data.lrclist){
                    Vue.set(this, 'lyric', JSON.parse(JSON.stringify({code:-1,text:'暂无歌词，请欣赏音乐'})));
                    return;
                }
                Vue.set(this, 'lyric', lyricToStr(res.data.lrclist))
            }
        })
    }
    getSongCommont(page){
        getCommont(this.rid,page).then( res => {
            Vue.set(this,'commont',JSON.parse(JSON.stringify(res)) || {});
        })
    }
}
function pad(num, n = 2) {
    let len = num.toString().length;
    while (len < n) {
        num = '0' + num;
        len++;
    }
    return num;
}
function lastPad(num, n = 2) {
    let len = num.toString().length;
    while (len < n) {
        num = num + '0';
        len++;
    }
    return num.slice(0,2);
}
function padTime(second) {
    let decimal = second.slice(second.lastIndexOf('.') + 1);
    let s = second.slice(0, second.indexOf('.'));
    let minute = pad((s / 60) | 0);
    let sd = pad((s % 60) | 0);
    return `[${minute}:${sd}.${lastPad(decimal)}]`
}
function lyricToStr(lyric=[]) {
    let str = '';
    lyric && lyric.forEach(item => {
        str += (padTime(item.time) + item.lineLyric + '\n')
    })
    return str;
}

export function createSong(song) {
    return new Song({
        songname: song.name,
        albumname: song.album,
        albumid: song.albumid,
        albumpic: song.albumpic,
        artist: song.artist,
        artistid: song.artistid,
        duration: song.duration,
        rid: song.rid,
        pic: song.pic,
        pic120: song.pic120,
        songTime: song.songTimeMinutes,
    })
}