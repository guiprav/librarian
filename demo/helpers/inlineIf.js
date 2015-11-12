'use strict';

module.exports = function(exprValue, thenValue, elseValue, options) {
    if(!options) {
        elseValue = null;
    }

    return exprValue? thenValue : elseValue;
};
