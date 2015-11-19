'use strict';

var hbs = require('handlebars');

module.exports = function(value) {
    return new hbs.SafeString(JSON.stringify(value));
};
