"use strict";
const webpackConfig = require("./webpack.config");
const { merge } = require('webpack-merge');

const webpackConfigTest = merge(webpackConfig, {
    devtool: false,
    mode: "development",
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.env$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [{
                        search: 'development', replace: 'test'
                    }]
                }
            }
        ]
    }
});

const webpackConfigDevProd= merge(webpackConfig, {
    devtool: false,
    mode: "development",
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [{
                        search: 'localhost:3000', replace: '165.227.247.77:3000'
                    }]
                }
            },
            {
                test: /\.env$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [{
                        search: 'development', replace: 'production'
                    }]
                }
            }
        ]
    }
});
const webpackConfigRelease = merge(webpackConfig, {
    devtool: false,
    mode: "production",
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [{
                        search: 'localhost:3000', replace: 'ment-backend.herokuapp.com:3000'
                    }]
                }
            },
            {
                test: /\.env$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [{
                        search: 'development', replace: 'production'
                    }]
                }
            }
        ]
    }
});

module.exports = function (grunt) {
    const pkg = grunt.file.readJSON("package.json");
    grunt.initConfig({

        watch: {
            updateSourceFiles: {
                files: ["./src/**/*"],
                tasks: ["webpack:develop"],
                options: {
                    debounceDelay: 250,
                    livereload: true
                }
            }
        },

        webpack: {
            develop: webpackConfig,
            developProd: webpackConfigDevProd,
            release: webpackConfigRelease,
            test: webpackConfigTest
        },

        clean: {
            build: [
                "./dist/**/*",
                "./dist/testresults/**/*",
            ]
        },

        checkDependencies: {
            this: {}
        }
    });

    grunt.loadNpmTasks("grunt-check-dependencies");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-file-append");
    grunt.loadNpmTasks("grunt-webpack");

    grunt.registerTask("default", ["clean build", "watch"]);
    grunt.registerTask(
        "clean build",
        "Compiles all the assets and copies the files to the dist directory.",
        ["checkDependencies", "clean:build", "webpack:develop"]
    );
    grunt.registerTask(
        "release",
        "Compiles all the assets and copies the files to the dist directory. Minified without source mapping",
        ["checkDependencies", "clean:build", "webpack:release"]
    );
    grunt.registerTask(
        "test",
        "Compiles all the assets and copies the files to the dist directory. Minified without source mapping",
        ["checkDependencies", "clean:build", "webpack:test"]
    );
    grunt.registerTask(
        "developProd",
        "Compiles all the assets and copies the files to the dist directory. Minified without source mapping",
        ["checkDependencies", "clean:build", "webpack:developProd"]
    );
    grunt.registerTask("build", ["clean build"]);
};
