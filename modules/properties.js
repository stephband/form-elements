
import Privates   from '../../fn/modules/privates.js';
import parseValue from './parse-value.js';

export function createAttribute(name, defaultValue) {
    return {
        attribute: function(value) {
            const privates = Privates(this);
            privates[name].push(value || defaultValue);
        }
    };
}

export function createAttributeProperty(name, defaultValue) {
    return {
        attribute: function(value) {
            this[name] = value;
        },

        set: function(value) {
            const privates = Privates(this);
            privates[name].push(value === undefined ? defaultValue : value);
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
    Value at upper limit of fader. Will interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/

    /**
    .min
    Value at upper limit of fader. Will interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/

    min: createAttributeProperty('min', 0),

    /**
    max="1"
    Value at upper limit of fader. Will interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/

    /**
    .max
    Value at upper limit of fader. Will interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/

    max: createAttributeProperty('max', 1),

    /**
    scale="linear"
    Fader scale. This is the name of a transform to be applied over the range
    of the fader travel. Possible values are:

    - `"linear"`
    - `"quadratic"`
    - `"cubic"`
    - `"log"`
    - `"log-24dB"`
    - `"log-48dB"`
    - `"log-60dB"`
    - `"log-72dB"`
    - `"log-96dB"`
    **/

    scale: createAttribute('scale', 'linear'),

    /**
    ticks=""
    A space or comma separated list of values at which to display tick marks.
    Values may be listed with or without units, eg:

    ```html
    ticks="0 0.2 0.4 0.6 0.8 1"
    ticks="-48dB -36dB -24dB -12dB 0dB"
    ```
    **/

    ticks: createAttribute('ticks', ''),

    /**
    display=""
    The units to display the value in. The output value and all ticks are
    displayed in this unit. Possible values are:
    - `"dB"` – `0-1` is displayed as `-∞dB` to `0dB`
    - `"Hz"`
    - `"bpm"`
    - `"s"`
    - `"semitone"`
    - `"hh:mm"` – and other time formats including any of the tokens `YMwdhms`

    Display formatters may be added by importing the formatters object:

    ```js
    RangeInput.displayFormats['my-format'] = (format, value) => {
        // Return an object of the form `{ value, unit }`
    };
    ```
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

    step: createAttribute('step'),

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
            privates.value.push(parseValue(value));
        },

        enumerable: true
    }
};
