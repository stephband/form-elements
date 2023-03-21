
import id       from '../../fn/modules/id.js';
import Privates from '../../fn/modules/privates.js';


export function createAttribute(name, defaultValue, fn = id) {
    return {
        attribute: function(value) {
            const privates = Privates(this);
            const parsed   = fn(value || defaultValue);
            privates[name].push(parsed);
        }
    };
}

export function createAttributeProperty(name, defaultValue, fn = id) {
    return {
        attribute: function(value) {
            this[name] = value;
        },

        set: function(value) {
            const privates = Privates(this);
            const parsed   = fn(value === undefined ? defaultValue : value);
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
            privates[name].push(!!value);
        }
    };
}
