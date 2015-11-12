'use strict';

let hbs = require('handlebars');

let lastFn;
let lastDepth;

module.exports = function(children, options) {
    let out = '';

    if(options.fn !== undefined) {
        lastFn = options.fn;
        lastDepth = 0;
    }
    else {
        ++lastDepth;
    }

    let depth = lastDepth;

    for(let key in children) {
        let data = Object.create(this);

        data.key = key;

        let child = children[key];

        if(typeof child === 'string') {
            child = new String(child);
        }

        let context = Object.create(child);

        context.self = children[key];
        context.depth = depth;

        out += lastFn(context, { data });
    }

    return new hbs.SafeString(out);
};
