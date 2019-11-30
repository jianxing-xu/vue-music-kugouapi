/**
 * 工具方法
 */


import dateformat from 'dateformat-util'    /** 导入时间格式化的库 */
import pinyin from 'pinyin'                 /** 导入文字变拼音的库 */

/**
 * 根据中文字返回第一个词的首字母大写
 * @param {}} chinese 中文字
 */
export function toFirstCode(chinese) {
    let str = chinese.substring(0, 1);
    const reg = new RegExp(/[a-zA-Z]/);
    if (reg.test(str)) {
        return str.toUpperCase();
    }
    if (/[0-9]/.test(str)) {
        return 'A';
    }
    return pinyin(str, { style: pinyin.STYLE_NORMAL })[0][0].substring(0, 1).toUpperCase();
}

/**
 * 格式化时间的方法
 * @param {*} date 时间戳
 * @param {*} fmt 需要的格式(有默认值)
 */
export function DateFormat(date, fmt = "yyyy-MM-dd") {
    return dateformat.format(date, fmt);
}

/**
 * 根据传入的范围，生成随机数
 * @param {*} start 范围开始
 * @param {*} end 范围结束
 * @param {*} fixed 保留的小数位
 */
export function random(start, end, fixed = 0) {
    let diff = end - start;
    let r = Math.random(diff);
    return parseInt((start + r * diff).toFixed(fixed));
}

/** 防抖函数 */
export function debounce(fn, delay) {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

export function throttle(fn, delay = 1000) {
    let pre = Date.now();
    return function () {
        let now = Date.now();
        if (now - pre > delay) {
            fn.apply(this, [...arguments]);
            pre = now;
        }
    }
}

export function formatTonken(token) {
    var reg = /kw_token=\w{10,}/g;
    var t = token.match(reg)[0];
    var i = t.indexOf('=');
    return t.slice(i + 1);
}