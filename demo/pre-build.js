#!/usr/bin/env node
'use strict';

let path = require('path');
let baseName = path.basename;
let relativePath = path.relative;
let glob = require('glob');
let fm = require('front-matter');

let readFileSync = require('./readFileSync');

glob.sync(__dirname + '/build/**/!(*.partial).hbs').forEach(function(path) {
    let docHashPath = (function() {
        let slices = relativePath(__dirname + '/build', path).slice('/');

        slices[slices.length - 1] = baseName(slices[slices.length - 1], '.hbs');

        return slices;
    })();
});
