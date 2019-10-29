/**
 * 歌手类
 */

export class Singer {
    constructor({name,fans,id,musicNum,mvNum,pic,pic70,pic120,pic300}){
        this.name = name;
        this.fans = fans;
        this.id = id;
        this.musicNum = musicNum;
        this.mvNum = mvNum;
        this.pic = pic;
        this.pic70 = pic70;
        this.pic120 = pic120;
        this.pic300 = pic300;
    }
}