[![Build Status](https://travis-ci.org/mistaguy/metvn.svg?branch=master)](https://travis-ci.org/mistaguy/metvn)
[![Dependency Status](https://david-dm.org/mistaguy/metvn.svg)](https://david-dm.org/mistaguy/metvn)
[![Dev Dependency Status](https://david-dm.org/mistaguy/metvn.svg#info=devDependencies)](https://david-dm.org/mistaguy/metvn#info=devDependencies)
[![codecov](https://codecov.io/gh/mistaguy/metvn/branch/master/graph/badge.svg)](https://codecov.io/gh/mistaguy/metvn)
[![Coverage Status](https://coveralls.io/repos/github/mistaguy/metvn/badge.svg?branch=master)](https://coveralls.io/github/mistaguy/metvn?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![code style: Tslint Latest](https://img.shields.io/badge/tslint_rules-latest-ff69b4.svg?style=flat-square)](https://github.com/buzinas/tslint-eslint-rules)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmistaguy%2Fmetvn.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmistaguy%2Fmetvn?ref=badge_shield)
[![Apache License, Version 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](http://opensource.org/licenses/Apache-2.0)

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
