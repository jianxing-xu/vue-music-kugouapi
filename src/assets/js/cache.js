/**
 * 本地缓存相关操作方法
 */


/**
 * 导入 localStorage 操作库
 */
import storage from 'good-storage'


const SEARCH_KEY = "__search__" /** 搜索历史标识 */
const SEARCH_LEN = 15;  /** 搜索历史的最大长度，最多存放15条历史记录 */

//收藏
const LIKE_KEY = '__like__' /** 我的喜欢 本地缓存标识 */
const LIKE_LEN = 200        /** 最多喜欢200首歌 */

// 播放历史
const PLAY_KEY = '__play__' /** 最近播放 本地缓存标识 */
const PLAY_LEN = 20         /** 最多显示20条记录 */

/** 从数组中插入元素，如果数组中已有该元素，则先移除该元素，在添加，如果数组超出了最大长度，则移除数组的末尾 */
const insertToArr = (arr,key,compare,len) => {
    let i = arr.findIndex(compare);
    if(i==0){
        return;
    }
    if(i>0){
        arr.splice(i,1);
    }
    arr.unshift(key);
    if(arr.length > len){
        arr.pop();
    }
}
/**
 * 通过比较函数，从数组中移除某一个元素
 * @param {*} arr 数组
 * @param {*} compare 比较函数
 */
const deleteToArr = (arr,compare) => {
    let i = arr.findIndex(compare);
    if(i>-1){
        arr.splice(i,1);
    };
}


/**
 * 保存歌曲播放历史到本地缓存
 * @param {} song 歌曲
 */
export function savePlayHis(song){
    let plays = storage.get(PLAY_KEY,[]);
    insertToArr(plays,song,(item)=>{
        return item.rid === song.rid;
    },PLAY_LEN);
    storage.set(PLAY_KEY,plays);
    return plays;
}

/**
 * 从缓存中加载播放历史
 */
export function loadPlayHis(){
    return storage.get(PLAY_KEY,[]);
}


/**
 * 保存搜索词到搜索历史本地缓存
 * @param {*} key 搜索词
 */
export function saveHistory(key){
    let searchs = storage.get(SEARCH_KEY,[]);
    insertToArr(searchs,key,(item)=>{
        return item === key;
    },SEARCH_LEN);
    storage.set(SEARCH_KEY,searchs);
    return searchs;
}

/**
 * 删除指定的搜索词
 * @param {*} key 搜索词
 */
export function deleteHistory(key){
    let searchs = storage.get(SEARCH_KEY,[]);
    deleteToArr(searchs,(item)=>{
        return item === key;
    });
    storage.set(SEARCH_KEY,searchs);
    return searchs;
}

/**
 * 清除所有搜索词
 */
export function clearHistory(){
    storage.remove(SEARCH_KEY);
    return [];
}

/**
 * 加载所有搜索词
 */
export function loadHistory(){
    return storage.get(SEARCH_KEY,[]);
}

/**
 * Toggle Favorite ...
 * 根据歌曲切换是否喜爱的状态
 * */

export function toggleFavorite(song){
    let favorite = storage.get(LIKE_KEY,[]);
    let index = favorite.findIndex((item)=>{
        return song.rid === item.rid;
    });
    if(index>-1){
        favorite.splice(index,1);
    }else{
        favorite.unshift(song);
    }
    storage.set(LIKE_KEY,favorite)
    return favorite;
}

/**
 * 从缓存中加载喜爱的歌曲
 */
export function loadFavorite(){
    return storage.get(LIKE_KEY,[]);
}