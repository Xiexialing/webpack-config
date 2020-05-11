const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.(js|ts)x?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test:/\.(jpg|jpeg|png|gif)$/,
                // 使用一个loader
                // 下载url-loader file-loader
                loader:'url-loader',
                options: {
                    // 8 * 1024表示 图片大小小于8KB，就会被base64处理
                    // 优点: 减少请求数量(减轻服务器压力)
                    // 缺点: 图片体积会更大(文件请求熟读更慢)
                    limit:  8 * 1024*1024,
                    // 问题:因为url-loader默认使用es6模块化解析,而html-loader引入图片是commonjs
                    // 解析时会出问题:[object Module]
                    // 解决:关闭url-loader的es6模块化，使用commonjs解析
                    esModule:false,
                    // 给图片进行重命名
                    // [hash:10]取图片的hash的前10位
                    // [text]取文件原来扩展名
                    name:'[hash:10].[ext]'
                }
            },
            {
                test: /\.(png|woff|woff2|svg|ttf|eot)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10,  //这里要足够大这样所有的字体图标都会打包到css中
                    }
                }
            }
        ]
    },
    plugins: [
        //负责打包html文件  将js注入到html中，minify压缩html
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        })
    ],
    mode: 'development'
}
