/* global require, module, __dirname */

var path = require('path')
var webpack = require('webpack')

var config = require('../config')
var utils = require('./utils')

var projectRoot = path.resolve(__dirname, '../')
var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
    performance: {
        hints: false
    },
    entry: {
        app: './src/main.js',
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'vue-resource']
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    externals: {
    },
    resolve: {
        extensions: [
            '.js', '.vue'
        ],
        modules: [
            path.join(__dirname, '../node_modules')
        ],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'components': path.resolve(__dirname, '../src/components'),
            'api': path.resolve(__dirname, '../src/api'),
        }
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, '../node_modules'),
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.html$/,
                loader: 'vue-html-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({})
    ]
}
