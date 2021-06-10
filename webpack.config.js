const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        babel:{
            import:'@babel/polyfill'
        },
        index: {
            import: './src/index.js',
            dependOn: 'shared',
        },
        grat: {
            import: './src/Greeting.js',
            dependOn: 'shared'
        },
        shared: 'lodash',
    },

    optimization: {
        runtimeChunk: 'single',
        splitChunks:{
            chunks:'all',
        }
    },

    devtool: 'inline-source-map',
    devServer: {

        contentBase: './dist',
        port: 9000,

    },
    plugins: [

        new HtmlWebpackPlugin({

            title: 'Development',

        }),

    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {

        rules: [

            {

                test: /\.css$/i,

                use: ['style-loader', 'css-loader'],

            },
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset/resource',

            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },


        ],

    },
};