'use strict';

exports = module.exports = function(a, op, b) {
    return exports[op](a, b);
};

exports['='] = exports['==='] = function(a, b) {
    return a === b;
};

exports['>'] = function(a, b) {
    return a > b;
};
