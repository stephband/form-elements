
import id       from 'fn/id.js';
import Privates from 'fn/privates.js';


export function createAttribute(name, defaultValue, parse = id) {
console.log(name, defaultValue);
    return {
        attribute: function(value) {
            const privates = Privates(this);
            const parsed   = parse(value === null ? defaultValue : value.trim());
console.log(name, 'SET', parsed);
            privates[name].push(parsed);
        }
    };
}

export function createAttributeProperty(name, defaultValue, parse = id) {
    return {
        attribute: function(value) {
            this[name] = value === null ? undefined : value ;
        },

        set: function(value) {
            const privates = Privates(this);
            const parsed   = parse(
                typeof value === 'string' ? value.trim() :
                value === undefined ? defaultValue :
                value
            );
            privates[name].push(parsed);
        },

        get: function() {
            const privates = Privates(this);
            return privates.data[name];
        },

        enumerable: true
    };
}

export function createBoolean(name) {
    return {
        attribute: function(value) {
            const privates = Privates(this);
            privates[name].push(value !== null);
        }
    };
}
