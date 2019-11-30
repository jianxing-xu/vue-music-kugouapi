/**
 * webpack 配置
 */

module.exports = {
    /**
     * 开发环境反向代理 跨域配置项
     */
    publicPath: process.env.NODE_ENV === 'production' ? '/music/' : '/',
    devServer: {
        host: '192.168.2.140',
        disableHostCheck: true,
        proxy: {
            /**
             * 新增跨域
             */
            '/getMVList': { /***/
                target: 'http://www.kuwo.cn/api/www/music/mvList',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getMVList': ''
                }
            },
            '/getSingerList': { /***/
                target: 'http://www.kuwo.cn/api/www/artist/artistInfo',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getSingerList': ''  
                }
            },
            '/getSongsById': { /***/
                target: 'http://www.kuwo.cn/api/www/artist/artistMusic',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getSongsById': ''  
                }
            },
            '/getDiscSongs': { /***/
                target: 'http://www.kuwo.cn/api/www/playlist/playListInfo',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getDiscSongs': ''  
                }
            },
            '/getRank': { /***/
                target: 'http://www.kuwo.cn/api/www/bang/bang/bangMenu',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getRank': ''  
                }
            },
            '/getBangSongs': { /***/
                target: 'http://www.kuwo.cn/api/www/bang/bang/musicList',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getBangSongs': ''  
                }
            },
            '/getSuggestKey': { /***/
                target: 'http://www.kuwo.cn/api/www/search/searchKey',
                bypass (req,res,options) {
                    req.headers.host = 'www.kuwo.cn',
                    req.headers.referer = 'http://www.kuwo.cn/mvs'
                },
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getSuggestKey': ''  
                }
            },
            '/getMusicByKey': { /***/
                target: 'http://www.kuwo.cn/api/www/search/searchMusicBykeyWord',
                bypass (req,res,options) {
                    req.headers.host = 'www.kuwo.cn',
                    req.headers.referer = 'http://www.kuwo.cn/mvs'
                },
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getMusicByKey': ''  
                }
            },
            '/getArtistByKey': { /***/
                target: 'http://www.kuwo.cn/api/www/search/searchArtistBykeyWord',
                bypass (req,res,options) {
                    req.headers.host = 'www.kuwo.cn',
                    req.headers.referer = 'http://www.kuwo.cn/mvs'
                },
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getArtistByKey': ''  
                }
            },







            '/getSlider': { /**QQ 音乐轮播图接口失效  换用酷我接口 */
                target: 'http://www.kuwo.cn/api/www/banner/index/bannerList?reqId=126ac700-133a-11ea-b87e-c715e0d116d1',
                secure: true,
                changeOrigin: true,
                // bypass: function (req, res, proxyOptions) {
                //     req.headers.referer = 'https://c.y.qq.com';
                //     req.headers.host = 'c.y.qq.com';
                // },
                pathRewrite: {
                    '/getSlider': ''
                }
            },
            '/getSongUrl': {/** 酷我播放地址接口 */
                target: 'http://www.kuwo.cn/url',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getSongUrl': ''
                }
            },
            '/getMVUrl': {/** 酷我mv播放地址接口 */
                target: 'http://www.kuwo.cn/url',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '/getMVUrl': ''
                }
            },
        }
    },
    css: {
        loaderOptions: { /** 配置全局Sass变量文件 */
            sass: {
                data: `
          @import "@/assets/style/variable.scss";
        `
            }
        }
    }
}