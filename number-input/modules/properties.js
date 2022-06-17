
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
            return Privates(this).input[name];
        },

        enumerable: true
    };
}

export default {
    /**
    .type="number"
    A readonly property with the value `"number"` (provided for consistency
    with native form elements, which all have a type).
    **/

    type: {
        value: 'number',
        enumerable: true
    },

    /**
    min="0"
    Value at lower limit of fader. Can interpret values with recognised units,
    eg. `"0dB"`.
    **/

    /**
    .min=0
    Value at lower limit of fader, as a number.
    **/

    min: createAttribute('min'),

    /**
    max="1"
    Value at upper limit of fader. Can interpret values with recognised units,
    eg. `"0dB"`.
    **/

    /**
    .max=1
    Value at upper limit of fader, as a number.
    **/

    max: createAttribute('max'),

    /**
    step=""
    Step is either:
    - The string `"any"` (the default value)
    - The string `"tick"`. The values in the `ticks` attribute are used as step values
    - A space or comma separated list of values, written with or without units
    **/

    step: createAttribute('step'),

    /**
    value=""
    The initial value of the `<rotary-input>`.
    **/

    /**
    .value
    Current value of the `<rotary-input>` as a number.
    **/

    value: createAttribute('value')
}
