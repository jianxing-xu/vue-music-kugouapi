import storage from 'good-storage'


const SEARCH_KEY = "__search__";
const SEARCH_LEN = 15;
const PLAY_KEY = '__play__';
const PLAY_LEN = 20

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

export function saveHistory(key){
    let searchs = storage.get(SEARCH_KEY,[]);
    insertToArr(searchs,key,(item)=>{
        return item === key;
    },SEARCH_LEN);
    storage.set(SEARCH_KEY,searchs);
    return searchs;
}
export function deleteHistory(key){
    let searchs = storage.get(SEARCH_KEY,[]);
    deleteToArr(searchs,(item)=>{
        return item === key;
    });
    storage.set(SEARCH_KEY,searchs);
    return searchs;
}
export function clearHistory(){
    storage.remove(SEARCH_KEY);
    return [];
}
export function loadHistory(){
    return storage.get(SEARCH_KEY,[]);
}