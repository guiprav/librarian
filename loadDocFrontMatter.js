'use strict';

let path = require('path');
let relativePath = path.relative;
let baseName = path.basename;

let fs = require('fs');

let fm = require('front-matter');

let docRootPath = process.cwd() + '/doc';

let recurse = require('./recurse');

module.exports = function(path) {
    path = relativePath(docRootPath, path);

    let docText = fs.readFileSync('doc/' + path, {
        encoding: 'utf8',
    });

    if(!fm.test(docText)) {
        return;
    }

    let pathParts = path.split('/');

    let docParentHash = recurse(hash, pathParts.slice(0, -1), {
        create: true,
    });

    let docName = baseName(pathParts.slice(-1)[0], '.lbr');

    docParentHash[docName] = fm(docText).attributes;
};
