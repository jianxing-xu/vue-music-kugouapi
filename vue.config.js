module.exports = {
    devServer: {
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