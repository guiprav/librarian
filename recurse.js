'use strict';

module.exports = function(object, propertyNames, options) {
    options = options || {};

    let property = propertyNames.reduce(function(object, propertyName) {
        let base = object;

        if(options.childrenPropertyName) {
            base = object[options.childrenPropertyName];

            if(!base) {
                base = object[options.childrenPropertyName] = {};
            }
        }

        let property = base[propertyName];

        if(!property && options.create) {
            property = base[propertyName] = {};
        }

        return property;
    }, object);

    if(options.childrenPropertyName && !property[options.childrenPropertyName]) {
        property[options.childrenPropertyName] = {};
    }

    return property;
};
