'use strict';

module.exports = function() {
    let firstValue = arguments[0];

    return [].slice.call(arguments, 0, -1).every(function(value) {
        return value === firstValue;
    });
};
