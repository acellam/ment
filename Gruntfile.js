"use strict";
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const merge = require("webpack-merge");

const webpackConfigRelease = webpackConfig.map(config => merge(config, {
    devtool: false,
    mode: "production",
    optimization: {
        minimize: true
    }
}));

module.exports = function(grunt) {
    const pkg = grunt.file.readJSON("package.json");
    grunt.initConfig({

        watch: {
            updateSourceFiles: {
                files: [ "./src/**/*" ],
                tasks: [ "webpack:develop" ],
                options: {
                    debounceDelay: 250,
                    livereload: true
                }
            }
        },

        webpack: {
            develop: webpackConfig,
            release: webpackConfigRelease
        },

        clean: {
            build: [
                "./dist/assets/**/*",
                "./dist/tsc/**/*",
                "./dist/testresults/**/*",
                "./dist/wdio/**/*"
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

    grunt.registerTask("default", [ "clean build", "watch" ]);
    grunt.registerTask(
        "clean build",
        "Compiles all the assets and copies the files to the dist directory.",
        [ "checkDependencies", "clean:build", "webpack:develop" ]
    );
    grunt.registerTask(
        "release",
        "Compiles all the assets and copies the files to the dist directory. Minified without source mapping",
        [ "checkDependencies", "clean:build", "webpack:release" ]
    );
    grunt.registerTask("build", [ "clean build" ]);
};
