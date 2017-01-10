// 部署时候的配置文件
var webpack=require("webpack");
var path = require('path');
// 提取css文件的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ExtractTextPlugin1 = require("extract-text-webpack-plugin");
// 自动创建html插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件
    //entry:[
    //    'webpack/hot/dev-server',
    //    'webpack-dev-server/client?http://localhost:8080',
    //    path.resolve(__dirname,'src/js/app.js')
    //],

    entry:{
        app:path.resolve(__dirname,'src/js/app.js'),
        // 相当于我们在js代码中使用var react =require(‘react’);
        vendors:['react','react-dom']
    },
    // 输出文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 输出文件的名称
        filename: 'bundle.js',
        chunkFilename: '[name]_[chunkhash:8]_chunk.js',
    },
    module: {
        loaders: [
            {
                // 处理jsx和es6文件的
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
                // 匹配到的文件夹目录不走这个babel-loader
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                // 处理css文件的
                // 同时使用两个加载器是用！相连接，多个加载器的执行顺序是从右往左执行
                test: /\Home.css$/, // Only .css files
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                //loader: 'style!css' // Run both loaders
            },
            {
                // 处理css文件的
                // 同时使用两个加载器是用！相连接，多个加载器的执行顺序是从右往左执行
                test: /\Tab.css$/, // Only .css files
                loader: ExtractTextPlugin1.extract("style-loader", "css-loader")
                //loader: 'style!css' // Run both loaders
            },
            {
                // 处理scss文件
                test: /\.scss$/,
                // css-loadr和sass-loader必须用！连在一起，否则抽取不了sass样式
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                //loader: 'style!css!sass'
            },
            {
                // 处理scss文件
                test: /\.scss$/,
                // css-loadr和sass-loader必须用！连在一起，否则抽取不了sass样式
                loader: ExtractTextPlugin1.extract("style-loader", "css-loader!sass-loader")
                //loader: 'style!css!sass'
            },
            {
                // 处理图片的：在loader后面加上？号是配置一些属性，limit参数的单位是比特（bit）25000bit~3kb
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000&name=img/[name].[ext]'
            }
        ]
    },
    resolve: {
        // 查找module的话从这里开始查找,绝对路径
        //root: './node_modules',
        // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        // 注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.
        extensions: ['', '.js', '.json', '.scss', '.jsx'],
        // 模块别名定义，方便后续直接引用别名，无须多写长长的地址。后续直接 require('AppStore') 即可
        //alias: {
        //    AppStore: 'js/stores/AppStores.js',
        //    ActionType: 'js/actions/ActionType.js',
        //    AppAction: 'js/actions/AppAction.js'
        //}
    },
    plugins: [
        // 分离第三方应用插件，相同的插件可以使用多次
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        // 设置提取出来的css文件的输出位置
        // 在js文件中写得内联样式是抽取不出来的，只能抽取引用的css文件和scss文件
        new ExtractTextPlugin("[name].css"),
        new ExtractTextPlugin1("[name].css"),
        // 自动生成html的插件
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css": ["app.css"],
                    "js": ["bundle.js", "vendors.js"]
                }
            }
        }),
        // 定义默认环境的插件，性能优化
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 允许错误不打断程序.报错但不退出webpack进程
        new webpack.NoErrorsPlugin(),
        //// 压缩和混淆代码插件，代码优化
        new webpack.optimize.UglifyJsPlugin({
            //warning代表不良的框架或者库的使用，框架开发者为了推进技术而对使用者做出的提醒，不影响系统的使用。在开发过程中难免有暂时无法解决的warning，即便无warning，在生成环境中避免warning检查仍然很必要。使用 DefinePlugin 插件可以去掉react中的warning。加入变量之后react会做判断
            compress: {
                warnings: false
            }
        })
    ]

}









































































