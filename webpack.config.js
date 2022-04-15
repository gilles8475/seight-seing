const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {

        index: './src/index.js',


    },



    devtool: 'inline-source-map',
    devServer: {

        contentBase: './dist',
        port: 9000,

    },


    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: {
            keep: /photos\//
        },
    },
    plugins: [new HtmlWebpackPlugin()],

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
            // {
            //     test: /\.m?js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // },


        ],

    },
};