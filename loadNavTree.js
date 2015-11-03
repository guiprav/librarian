'use strict';

let fs = require('fs');
let path = require('path');
let relativePath = path.relative;
let baseName = path.basename;
let dirName = path.dirname;

let navRootPath = process.cwd() + '/nav';
let docRootPath = process.cwd() + '/doc';

let recurse = require('./recurse');

module.exports = function(path) {
    path = relativePath(navRootPath, path);

    let pathParts = path.split('/');

    let navLinkParentHash = recurse(
        { children: hash.navTree }, pathParts.slice(0, -1), {
            create: true,
            childrenPropertyName: 'children',
        }
    );

    let navLinkName = pathParts.slice(-1)[0];

    let navLinkDocRealPath = fs.realpathSync('nav/' + path);

    let navLinkDocPath = relativePath(
        docRootPath, navLinkDocRealPath
    );

    let navLinkDocName = baseName(navLinkDocPath, '.lbr');

    let navLinkBuiltDocPath = (
        '/doc/' + dirName(navLinkDocPath) + '/' + navLinkDocName + '.html'
    ).replace(/\/\.\//g, '/');

    navLinkParentHash.children[navLinkName] = {
        href: navLinkBuiltDocPath,
    };
};
