"use strict";
const webpackConfig = require("./webpack.config");
const { merge } = require('webpack-merge');

module.exports = function (grunt) {
    grunt.initConfig({
        watch: getWatch(),
        webpack: getWebpack(),
        clean: getClean(),
        checkDependencies: {
            this: {}
        }
    });

    getGruntLibs(grunt);
    registerGruntTasks(grunt);
};

function getWatch() {
    return {
        updateSourceFiles: {
            files: ["./src/**/*"],
            tasks: ["webpack:develop"],
            options: {
                debounceDelay: 250,
                livereload: true
            }
        }
    };
}

function getWebpack() {
    return {
        develop: webpackConfig,
        developProd: webpackConfigDevProd,
        release: webpackConfigRelease,
        test: webpackConfigTest
    };
}

function getClean() {
    return {
        build: [
            "./dist/**/*",
            "./dist/testresults/**/*",
        ]
    };
}

function getGruntLibs(grunt) {
    grunt.loadNpmTasks("grunt-check-dependencies");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-file-append");
    grunt.loadNpmTasks("grunt-webpack");
}

function registerGruntTasks(grunt) {
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
}

const baseWebpackConfigTest = merge(webpackConfig, {
    devtool: false,
    optimization: {
        minimize: true
    }
});

const webpackConfigTest = merge(baseWebpackConfigTest, {
    module: {
        rules: [
            replaceStringInRule(/\.env$/, 'development', 'test')
        ]
    }
});

const webpackConfigDevProd= merge(baseWebpackConfigTest, {
    mode: "development",
    module: {
        rules: [
            replaceStringInRule(/\.json$/, 'localhost:3000', '165.227.247.77:3000'),
            replaceStringInRule(/\.env$/, 'development', 'production')
        ]
    }
});

const webpackConfigRelease = merge(baseWebpackConfigTest, {
    mode: "production",
    module: {
        rules: [
            replaceStringInRule(/\.json$/, 'localhost:3000', 'ment-backend.herokuapp.com:3000'),
            replaceStringInRule(/\.env$/, 'development', 'production')
        ]
    }
});

function replaceStringInRule(filePattern, search, replace) {
    return {
        test: filePattern,
        loader: 'string-replace-loader',
        options: {
            multiple: [{
                search, replace
            }]
        }
    };
}
