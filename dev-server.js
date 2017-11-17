/**
 * Created by Administrator on 2017/5/22.
 */
var express = require("express");
var webpack = require("webpack");
var config = require("./webpack.config.js");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();

var compiler = webpack(config);

// 为了修改html文件也能实现热加载，使用webpack插件来监听html源文件改变事件
//compiler.plugin('compilation',function(compilation){
//    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//        // 发布事件
//        hotMiddleware.publish({ action: 'reload' });
//        cb();
//    })
//})

app.use(webpackDevMiddleware(compiler,{
    publicPatch:"./",
    quiet:true
}));

app.use(webpackHotMiddleware(compiler));

app.listen(8000,function(){
    console.log('Listening at http://localhost:8000');
});