const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
                    { test: /\.js$/,
                      use: 'babel-loader' },

                    { test: /\.(jpg?g|png|gif|svg)$/i,
                      use: 'file-loader?name=img/[name].[ext]' },

                    { test: /\.css$/,
                      use: [ 'style-loader', 'css-loader' ]
                    },
                    { test: /\.scss$/,
                      use: [{
                          loader: "style-loader" // creates style nodes from JS strings
                      }, {
                          loader: "css-loader" // translates CSS into CommonJS
                      }, {
                          loader: "sass-loader" // compiles Sass to CSS
                      }]
                    },
                    { test: /\.js$/, // include .js files
                      enforce: "pre", // preload the jshint loader
                      exclude: /node_modules/, // exclude any and all files in the node_modules folder
                      use: [
                              {
                                  loader: "jshint-loader",
                                  options:
                                      {
                                         // any jshint option http://www.jshint.com/docs/options/
                                         // i. e.
                                         camelcase: true,
                                         // jshint errors are displayed by default as warnings
                                         // set emitErrors to true to display them as errors
                                         emitErrors: false,
                                         // jshint to not interrupt the compilation
                                         // if you want any file with jshint errors to fail
                                         // set failOnHint to true
                                         failOnHint: false,
                                         // custom reporter function
                                         reporter: function(errors) { }

                                       }
                              }
                          ]
                     }
              ]
    },

    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src')
        }
    },

    devServer: {
        contentBase: path.join(__dirname, "dev"),
        compress: true,
        port: 3000
    }
};

module.exports = config;
