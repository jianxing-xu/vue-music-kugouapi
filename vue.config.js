module.exports = {
    devServer: {
        host: '192.168.1.3',
        proxy: {
            '/getSlider': {
                target: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
                secure: true,
                changeOrigin: true,
                bypass: function (req, res, proxyOptions) {
                    req.headers.referer = 'https://c.y.qq.com';
                    req.headers.host = 'c.y.qq.com';
                },
                pathRewrite: {
                    '/getSlider': ''
                }
            },
            '/getSongUrl': {
                target: 'http://www.kuwo.cn/url',
                secure: true,
                changeOrigin: true,
                // bypass: function (req, res, proxyOptions) {
                //     req.headers.referer = 'https://c.y.qq.com';
                //     req.headers.host = 'c.y.qq.com';
                // },
                pathRewrite: {
                    '/getSongUrl': ''
                }
            },
            '/getMVUrl': {
                target: 'http://www.kuwo.cn/url',
                secure: true,
                changeOrigin: true,
                // bypass: function (req, res, proxyOptions) {
                //     req.headers.referer = 'https://c.y.qq.com';
                //     req.headers.host = 'c.y.qq.com';
                // },
                pathRewrite: {
                    '/getMVUrl': ''
                }
            },
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
          @import "@/assets/style/variable.scss";
        `
            }
        }
    }
}