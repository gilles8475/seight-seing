const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {

        index: './src/index.js',
            

    },

  

    //devtool: 'inline-source-map',
    devServer: {

        contentBase: './dist',
        port: 9000,

    },
    

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: {
            keep:/photos\//
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



        ],

    },
};