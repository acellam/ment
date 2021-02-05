const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: `./src/server.ts`,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'server.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
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
    mode: "development",
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: ".env"},
                { from: "src/**/*.js" }
            ]
        }, {
            copyUnmodified: true
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};
