/**
 * 歌曲工具方法
 */

import { getLyric, getCommont } from '@/api/song' /** 引入请求歌词 和 请求评论的方法 */

/**
 * 歌曲类
 */
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
        this.lyric = null;
        this.commont = null;
        this.url = '';
    }
    getSongLyric() { /** 拥有获取歌词的方法 */
        getLyric(this.rid).then(res => {
            if (res.status === 200) {
                if (!res.data || !res.data.lrclist) {
                    this.lyric = { code: -1, text: '暂无歌词，请欣赏音乐' }
                    return;
                }
                this.lyric = lyricToStr(res.data.lrclist)
            } else {
                this.lyric = { code: -1, text: '暂无歌词，请欣赏音乐' }
            }
        })
    }
    getSongCommont(page) { /** 拥有获取评论的方法 */
        getCommont(15, this.rid, page).then(res => {
            this.commont = res;
        })
    }
}
/** 前补0 */
function pad(num, n = 2) {
    let len = num.toString().length;
    while (len < n) {
        num = '0' + num;
        len++;
    }
    return num;
}
/** 后补0 */
function lastPad(num, n = 2) {
    let len = num.toString().length;
    while (len < n) {
        num = num + '0';
        len++;
    }
    return num.slice(0, 2);
}

/** 格式化歌曲时间 */
function padTime(second) {
    let decimal = second.slice(second.lastIndexOf('.') + 1);
    let s = second.slice(0, second.indexOf('.'));
    let minute = pad((s / 60) | 0);
    let sd = pad((s % 60) | 0);
    return `[${minute}:${sd}.${lastPad(decimal)}]`
}

/** 格式化歌词为指定格式 */
function lyricToStr(lyric = []) {
    let str = '';
    lyric && lyric.forEach(item => {
        str += (padTime(item.time) + item.lineLyric + '\n')
    })
    return str;
}

/**
 * 导出创建一首歌对象的方法 
 * @param {*} song 歌曲信息
 */
export function createSong(song) {
    return new Song({
        songname: song.name || song.songname,
        albumname: song.album || song.albumname,
        albumid: song.albumid,
        albumpic: song.albumpic,
        artist: song.artist,
        artistid: song.artistid,
        duration: song.duration,
        rid: song.rid,
        pic: song.pic,
        pic120: song.pic120,
        songTime: song.songTimeMinutes || song.songTime,
    })
}