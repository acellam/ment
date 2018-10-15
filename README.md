[![Build Status](https://travis-ci.org/mistaguy/metvn.svg?branch=master)](https://travis-ci.org/mistaguy/metvn)
[![Dependency Status](https://david-dm.org/mistaguy/metvn.svg)](https://david-dm.org/mistaguy/metvn)
[![Dev Dependency Status](https://david-dm.org/mistaguy/metvn.svg#info=devDependencies)](https://david-dm.org/mistaguy/metvn#info=devDependencies)
[![codecov](https://codecov.io/gh/mistaguy/metvn/branch/master/graph/badge.svg)](https://codecov.io/gh/mistaguy/metvn)

# METVN
A boilerplate for MongoDB  ExpressJs Typscript Vue NodeJs App

## Issues, suggestions and feature requests
We are actively maintaining this widget, please report any issues or suggestion for improvement at https://github.com/mistaguy/metvn/issues

## Development
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI, Karma CLI

To contribute, fork and clone.

    > git clone https://github.com/mistaguy/metvn.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

Create a folder named `dist` in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Changes to the widget code shall be automatically pushed to this test project.
Or get the test project from [https://github.com/mistaguy/metvn/releases/latest](https://github.com/mistaguy/metvn/releases/latest)

To automatically compile, bundle and push code changes to the running test project, run:

    > grunt

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm test

or run the test continuously during development:

    > karma start
