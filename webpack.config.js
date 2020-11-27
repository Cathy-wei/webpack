const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
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
            chunkFilename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        // optimization: {
        //     splitChunks: {
        //         // include all types of chunks
        //         chunks: 'all'
        //     }
        // },
        module: {
            rules: [{
                    test: /\.jsx$/,
                    exclude: /node_moduels/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.css$/,
                    exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: ['style-loader', 'css-loader?modules', 'postcss-loader']
                },
                {
                    test: /\.less$/,
                    include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
                },
                {
                    test: /\.less$/,
                    exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: ['style-loader', 'css-loader?modules', 'less-loader', 'postcss-loader']
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
        devServer: {
            contentBase: './dist',
            hot: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                // title: 'Code Splitting',
                template: "public/index.html"
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'common'
            // }),
            // new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()

        ],
        resolve: {
            alias: {
                '@': path.resolve('src')
            }
        }
    }

};