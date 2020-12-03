const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
module.exports = function(env, argv) {
    const isEnvDevelopment = argv.mode === 'development' || !argv.mode
    const isEnvProduction = argv.mode === 'production'
    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
        entry: {
            index: './src/index.jsx',
            // another: './src/another-module.jsx'

        },
        output: {
            // filename: '[name].bundle.js',
            filename: '[name].[contenthash:8].js',
            chunkFilename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            // splitChunks: {
            //     // include all types of chunks
            //     chunks: 'all'
            // }
            minimize: true,
            minimizer: [
                new TerserPlugin(),
                new OptimizeCssAssetsPlugin()
            ]
        },
        module: {
            rules: [{
                    test: /\.jsx$/,
                    exclude: /node_moduels/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.css$/,
                    exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: [MiniCssExtractPlugin.loader, 'css-loader?modules', 'postcss-loader']
                },
                {
                    test: /\.less$/,
                    include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
                },
                {
                    test: /\.less$/,
                    exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: [MiniCssExtractPlugin.loader, 'css-loader?modules', 'less-loader', 'postcss-loader']
                },


                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: ["file-loader"]
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                    loader: "url-loader",
                    options: {
                        limit: 10000
                    }
                }
            ]
        },
        // devServer: {
        //     contentBase: './dist',
        //     hot: true
        // },
        plugins: [
            new HtmlWebpackPlugin({
                template: "public/index.html",
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                }
            }),

            // new webpack.HotModuleReplacementPlugin()
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:8].css',
                chunkFilename: '[name].[contenthash:8].chunk.css'
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve('src')
            }
        }
    }

};