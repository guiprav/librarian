'use strict';

let hbs = require('handlebars');

let lastFn;
let lastDepth;

module.exports = function(children, options) {
    var out = '';

    if(options.fn !== undefined) {
        lastFn = options.fn;
        lastDepth = 0;
    }
    else {
        ++lastDepth;
    }

    for(let key in children) {
        let data = Object.create(this);

        data.key = key;

        let context = Object.create(children[key]);

        context.depth = lastDepth;
        context.wtf = 'WTF???';

        out += lastFn(context, { data });
    }

    return new hbs.SafeString(out);
};
