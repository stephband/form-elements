
import Privates   from '../../../fn/modules/privates.js';
import parseValue from '../../modules/parse-value.js';

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
    law="linear"
    Fader law. This is the name of a transform to be applied over the range
    of the fader travel. Possible values are:

    - `"linear"`
    - `"linear-logarithmic"`
    - `"logarithmic"`
    - `"quadratic"`
    - `"cubic"`
    **/

    law: {
        attribute: function(string) {
            const privates = Privates(this);
            privates.law.push(string || 'linear');
        }
    },

    /**
    unit=""
    The value's unit, if it has one. The output value and all ticks are
    displayed in this unit. Possible values are:
    - `"dB"` – `0-1` is displayed as `-∞dB` to `0dB`
    - `"Hz"`
    **/

    unit: {
        attribute: function(value) {
            Privates(this).data.unit = value;
        }
    },

    /**
    ticks=""
    A space or comma separated list of values at which to display tick marks.
    Values may be listed with or without units, eg:

    ```html
    ticks="0 0.2 0.4 0.6 0.8 1"
    ticks="-48dB -36dB -24dB -12dB 0dB"
    ```
    **/

    ticks: {
        attribute: function(string) {
            const privates = Privates(this);
            privates.ticks.push(string);
        }
    },

    /**
    step=""
    Step is either:

    - The string `"any"`, the default
    - The string `"tick"`. The values in the `ticks` attribute are used as step values
    - A space or comma separated list of values, written with or without units
    **/

    step: {
        attribute: function(string) {
            const privates = Privates(this);
            privates.step.push(string);
        }
    },

    prefix: {
        attribute: function(value) {
            Privates(this).data.prefix = value;
        }
    },

    /**
    value=""
    The initial value of the fader.
    **/

    /**
    .value=0
    Current value of the field, as a number.
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
            privates.value.push(parseValue(value));
        },

        enumerable: true
    }
};
