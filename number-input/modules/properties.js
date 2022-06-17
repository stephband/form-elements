
import Privates        from '../../../fn/modules/privates.js';

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

    min: {
        attribute: function(value) {
            this.min = value;
        },

        set: function(value) {
            const privates = Privates(this);
            privates.min.push(value);
        },

        get: function() {
            const privates = Privates(this);
            return privates.data.min;
        },

        enumerable: true
    },

    /**
    max="1"
    Value at upper limit of fader. Can interpret values with recognised units,
    eg. `"0dB"`.
    **/

    /**
    .max=1
    Value at upper limit of fader, as a number.
    **/

    max: {
        attribute: function(value) {
            this.max = value;
        },

        set: function(value) {
            const privates = Privates(this);
            privates.max.push(value);
        },

        get: function() {
            const privates = Privates(this);
            return privates.data.max;
        },

        enumerable: true
    },

    /**
    display=""
    The units to display the value in. The output value and all ticks are
    displayed in this unit. Possible values are:
    - `"dB"` – `0-1` is displayed as `-∞dB` to `0dB`
    - `"Hz"`
    - `"bpm"`
    - `"s"`
    - `"semitone"`
    **/

    display: {
        attribute: function(string) {
            const privates = Privates(this);
            privates.display.push(string || '');
        }
    },

    /**
    step=""
    Step is either:
    - The string `"any"` (the default value)
    - The string `"tick"`. The values in the `ticks` attribute are used as step values
    - A space or comma separated list of values, written with or without units
    **/

    step: {
        attribute: function(string) {
            const privates = Privates(this);
            privates.step.push(string);
        }
    },

    /**
    value=""
    The initial value of the `<rotary-input>`.
    **/

    /**
    .value
    Current value of the `<rotary-input>` as a number.
    **/

    value: {
        attribute: function(value) {
            this.value = value;
        },

        get: function() {
            return Privates(this).data.value;
        },

        set: function(value) {
            const privates = Privates(this);
            privates.value.push(parseFloat(value));
        },

        enumerable: true
    }
}
