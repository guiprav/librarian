'use strict';

let hbs = require('handlebars');

let lastFn;

module.exports = function(children, options) {
    var out = '';

    if(options.fn !== undefined) {
        lastFn = options.fn;
    }

    for(let key in children) {
        let context = Object.create(this);

        context['key'] = key;

        out += lastFn(children[key], { data: context });
    }

    return new hbs.SafeString(out);
};
