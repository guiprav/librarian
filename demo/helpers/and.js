'use strict';

module.exports = function() {
    return [].every.call(arguments, function(value) {
        return value;
    });
};
