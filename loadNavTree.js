'use strict';

let fs = require('fs');
let path = require('path');
let relativePath = path.relative;
let resolvePath = path.resolve;
let baseName = path.basename;
let dirName = path.dirname;

let navRootPath = process.cwd() + '/nav';

let recurse = require('./recurse');

let mkdirp = require('mkdirp');

let urlFriendify = require('./urlFriendify');

module.exports = function(path) {
    let pathFromCwd = path;

    path = relativePath(navRootPath, path);

    let pathParts = path.split('/');

    let linkParentHash = recurse(
        { children: hash.navTree }, pathParts.slice(0, -1), {
            create: true,
            childrenPropertyName: 'children',
        }
    );

    let linkData = require(resolvePath(pathFromCwd));

    let name = baseName(pathParts.slice(-1)[0], '.json');

    let href = '/nav/' + urlFriendify(dirName(path) + '/' + name) + '.html';

    let builtNavPathDirName = resolvePath('build/nav/' + urlFriendify(dirName(path)));

    mkdirp.sync(builtNavPathDirName);

    let builtDocPath = 'build/doc/' + linkData.docPath + '.html';

    let symlinkRelativePath = relativePath(builtNavPathDirName, builtDocPath);

    fs.symlinkSync(
        symlinkRelativePath,
        builtNavPathDirName + '/' + urlFriendify(name) + '.html'
    );

    linkParentHash.children[name] = { href };
};
