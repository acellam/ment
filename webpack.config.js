const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const pkg = require("./package");
const name = pkg.appName.toLowerCase();

// Client configuration
const clientConfig = {
    entry: `./src/client/index.ts`,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'client.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            "tests": path.resolve(__dirname, "./tests")
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/**/*.js" },
            { from: "src/**/*.png"},
            { from: "assets/**/*.png" },
            { from: "src/static/**/*.html", to: './', flatten: true }
        ], {
            copyUnmodified: true
        }),
        new ExtractTextPlugin({filename: `./src/client/ui/${name}.css`}),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};

// Server configuration
const serverConfig = {
    entry: `./src/server/index.ts`,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'server.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node',
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/**/*.js" }
        ], {
            copyUnmodified: true
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};

module.exports = [ clientConfig, serverConfig ];
