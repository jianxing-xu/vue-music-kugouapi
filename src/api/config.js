export const ERR_OK = 200;
export const digest = {
    SONG: {
        d:15,
        key: 'id'
    },
    MV: {
        d:7,
        key: 'id'
    },
    BANG: {
        d: 2,
        key: 'sourceid'
    },
    DISC: {
        d: 8,
        key: 'id'
    },
}

//* 歌单下的评论 digest 都是 8
// * 榜单下的评论 digest 都是 2
// * 歌曲的digest 都是 15
// * MV下的评论 digest 都是 7