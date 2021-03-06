const webpackMerge = require('webpack-merge');

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const path = require('path');
const helpers = require('./helpers');
const commonConfig = require('./webpack.common.js');


const ENV = 'development';
const METADATA = {
    ENV: ENV
};

module.exports = function (options) {

    return webpackMerge(commonConfig(options), {

        cache: true,

        devtool: 'source-map',

        resolve: {
            plugins: [
                new TsConfigPathsPlugin({
                    configFileName: './tsconfig.webpack.json'
                })
            ]
        },

        output: {
            path: helpers.root('dist'),
            filename: '[name].bundle.js',
            chunkFilename: '[id].chunk.js'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    enforce: 'post',
                    use: [{ loader: path.resolve('./tools/webpack/ng2-sass-loader.js') }]
                },
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader',
                            options: { configFileName: './tsconfig.webpack.json' }
                        },
                        { loader: 'angular2-template-loader' }
                    ],

                    exclude: [ helpers.root('node_modules') ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'raw-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [require('autoprefixer')({ browsers: ['last 2 versions'] })]
                            }
                        },
                        'resolve-url-loader',
                        'sass-loader?sourceMap'
                    ],
                    include: [ helpers.root('src') ]
                }
            ]
        },

        plugins: [
            new HotModuleReplacementPlugin(),

            new LoaderOptionsPlugin({ debug: true })
        ],

        devServer: {
            hotOnly: true,
            inline: false,
            host: 'localhost',
            port: 3003,
            historyApiFallback: true,
            watchOptions: { ignored: /node_modules/ },
            stats: {
                colors: true,
                hash: true, // required by custom stat output
                timings: true, // required by custom stat output
                chunks: false, // required by custom stat output
                chunkModules: false,
                children: false, // listing all children is very noisy in AOT and hides warnings/errors
                modules: false,
                reasons: false,
                warnings: true,
                errors: true,
            }
        }
    })
};
