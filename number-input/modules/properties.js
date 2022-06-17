
import Privates from '../../../fn/modules/privates.js';

function createAttribute(name) {
    return {
        attribute: function(string) {
            this[name] = string;
        },

        set: function(value) {
            Privates(this).input[name] = value;
        },

        get: function() {
            return parseFloat(Privates(this).input[name]);
        },

        enumerable: true
    };
}

export default {
    /**
    .type="number"
    A readonly property with the value `"number"`.
    **/

    type: {
        value: 'number',
        enumerable: true
    },

    /**
    min="0"
    Value of lower limit.
    **/

    /**
    .min=0
    Value of lower limit.
    **/

    min: createAttribute('min'),

    /**
    max="1"
    Value of upper limit.
    **/

    /**
    .max=1
    Value of upper limit.
    **/

    max: createAttribute('max'),

    /**
    step=""
    Step is either:
    - The string `"any"` (the default value)
    - A number
    **/

    step: createAttribute('step'),

    /**
    value=""
    The initial value of the `<number-input>`.
    **/

    /**
    .value
    Current value of the `<number-input>` as a number.
    **/

    value: createAttribute('value')
}
