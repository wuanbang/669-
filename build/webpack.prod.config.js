/* global require, module, process */
var path = require("path")
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require("compression-webpack-plugin");

config.build.productionSourceMap = false

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true})
    },
    devtool: config.build.productionSourceMap
        ? '#source-map'
        : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash:7].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0)
            }
        }),
        //new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({name: 'manifest', chunks: ['vendor']}),
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
       /* new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$/,
            threshold: 10,
            minRatio: 0.8
        }),*/
        // new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash:7].css')),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: [
                'manifest', 'vendor', 'app'
            ],
            filename: 'index.html',
            template: 'src/template/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            options: {
                context: __dirname,
                vue: {
                    loaders: utils.cssLoaders({sourceMap: config.build.productionSourceMap, extract: true})
                }
            }
        })
    ]
})
