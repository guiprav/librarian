'use strict';

module.exports = function(object, propertyNames, options) {
    options = options || {};

    let property = propertyNames.reduce(function(object, propertyName) {
        let property;

        if(options.childrenPropertyName) {
            property = object[options.childrenPropertyName];

            if(!property) {
                property = object[options.childrenPropertyName] = {};
            }
        }

        property = object[propertyName];

        if(!property && options.create) {
            property = object[propertyName] = {};
        }

        return property;
    }, object);

    if(options.childrenPropertyName) {
        property[options.childrenPropertyName] = {};
    }

    return property;
};
