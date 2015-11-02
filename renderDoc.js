'use strict';

let path = require('path');
let relativePath = path.relative;
let dirName = path.dirname;
let baseName = path.basename;

let fm = require('front-matter');

let docRootPath = process.cwd() + '/doc';
let buildDocRootPath = process.cwd() + '/build/doc';

let hbs = require('handlebars');

let glob = require('glob');

glob.sync(__dirname + '/helpers/*.js').forEach(function(path) {
    let name = baseName(path, '.js');

    hbs.registerHelper(name, require(path));
});

glob.sync('helpers/*.js').forEach(function(path) {
    let name = baseName(path, '.js');

    hbs.registerHelper(name, require(path));
});

let fs = require('fs');

glob.sync(__dirname + '/partials/*.lbr').forEach(function(path) {
    let name = baseName(path, '.lbr');

    let partialText = fs.readFileSync(path, {
        encoding: 'utf8',
    });

    hbs.registerPartial(name, partialText);
});

glob.sync('partials/*.lbr').forEach(function(path) {
    let name = baseName(path, '.lbr');

    let partialText = fs.readFileSync(path, {
        encoding: 'utf8',
    });

    hbs.registerPartial(name, partialText);
});

let mkdirp = require('mkdirp');

module.exports = function(path) {
    path = relativePath(docRootPath, path);

    let doc = fm(fs.readFileSync('doc/' + path, {
        encoding: 'utf8',
    }));

    let docTemplate = hbs.compile(doc.body);

    doc.attributes.hash = hash;

    mkdirp.sync('build/doc/' + dirName(path));

    let renderedDocFileName = baseName(path, '.lbr') + '.html';

    let renderedDocText = docTemplate(doc.attributes);

    fs.writeFileSync('build/doc/' + renderedDocFileName, renderedDocText);
};
