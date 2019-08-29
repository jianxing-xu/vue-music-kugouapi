
export class Song {
    constructor({songname,albumname,albumid,albumpic,artist,artistid,duration,rid,pic,pic120,songTime}){
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
}

export function createSong(song){
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