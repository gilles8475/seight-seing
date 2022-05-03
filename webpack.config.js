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
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: {
            keep: /photos\//
        },
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html",
    })
    ],

    module: {

        rules: [

            {

                test: /\.css$/i,

                use: ['style-loader', 'css-loader'],

            },
            {
                test : /\.geojson$/,
                loader: 'json-loader'
            },

            {
                test: /\.(scss)$/,
                use: [{
                    // inject CSS to page
                    loader: 'style-loader'
                }, {
                    // translates CSS into CommonJS modules
                    loader: 'css-loader'
                }, {
                    // Run postcss actions
                    loader: 'postcss-loader',
                    options: {
                        // `postcssOptions` is needed for postcss 8.x;
                        // if you use postcss 7.x skip the key
                        postcssOptions: {
                          // postcss plugins, can be exported to postcss.config.js
                          plugins: function () {
                            return [
                              require('autoprefixer')
                            ];
                          }
                        }
                      }
                }, {
                    // compiles Sass to CSS
                    loader: 'sass-loader'
                }]
            },
  // ...
  
            {

                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,

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