import dateformat from 'dateformat-util'
import pinyin from 'pinyin'

export function toFirstCode(chinese) {
    let str = chinese.substring(0, 1);
    const reg = new RegExp(/[a-zA-Z]/);
    if (reg.test(str)) {
        return str.toUpperCase();
    }
    if(/[0-9]/.test(str)){
        return 'A';
    }
    return pinyin(str, { style: pinyin.STYLE_NORMAL })[0][0].substring(0, 1).toUpperCase();
}
export function DateFormat(date, fmt = "yyyy-MM-dd") {
    return dateformat.format(date, fmt);
}