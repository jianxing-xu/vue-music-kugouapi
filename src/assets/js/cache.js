import storage from 'good-storage'


const SEARCH_KEY = "__search__"
const SEARCH_LEN = 15;

//收藏
const LIKE_KEY = '__like__'
const LIKE_LEN = 200

// 播放历史
const PLAY_KEY = '__play__'
const PLAY_LEN = 20

//数组操方法
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

const deleteToArr = (arr,compare) => {
    let i = arr.findIndex(compare);
    if(i>-1){
        arr.splice(i,1);
    };
}


export function savePlayHis(song){
    let plays = storage.get(PLAY_KEY,[]);
    insertToArr(plays,song,(item)=>{
        return item.rid === song.rid;
    },PLAY_LEN);
    storage.set(PLAY_KEY,plays);
    return plays;
}
export function loadPlayHis(){
    return storage.get(PLAY_KEY,[]);
}

// saveHistory

export function saveHistory(key){
    let searchs = storage.get(SEARCH_KEY,[]);
    insertToArr(searchs,key,(item)=>{
        return item === key;
    },SEARCH_LEN);
    storage.set(SEARCH_KEY,searchs);
    return searchs;
}

// deleteHistory
export function deleteHistory(key){
    let searchs = storage.get(SEARCH_KEY,[]);
    deleteToArr(searchs,(item)=>{
        return item === key;
    });
    storage.set(SEARCH_KEY,searchs);
    return searchs;
}

// clearALl History
export function clearHistory(){
    storage.remove(SEARCH_KEY);
    return [];
}
export function loadHistory(){
    return storage.get(SEARCH_KEY,[]);
}

// Toggle Favorite ...
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
export function loadFavorite(){
    return storage.get(LIKE_KEY,[]);
}