
import { Observer, getTarget } from '../../../fn/observer/observer.js';
import Privates        from '../../../fn/modules/privates.js';
import parseValues     from '../../modules/parse-values.js';
import stringifyValues from '../../modules/stringify-values.js';

function createAttribute(name, defaultValue) {
    return {
        attribute: function(value) {
            const privates = Privates(this);
            privates[name].push(value || defaultValue);
        }
    };
}

function createAttributeProperty(name, defaultValue) {
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

function createBoolean(name) {
    return {
        attribute: function(value) {
            const privates = Privates(this);
            privates[name].push(!!value);
        }
    };
}

export default {
    /**
    min="0"
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/

    /**
    .min
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/
    min: createAttributeProperty('min', 0),

    /**
    max="1"
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/

    /**
    .max
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/
    max: createAttributeProperty('max', 1),

    /**
    scale="linear"
    Scale on the y axis. This is the name of a transform to be applied over the
    y range of the fader travel. Possible values are:

    - `"linear"`
    - `"pow-2"`
    - `"pow-3"`
    - `"pow-4"`
    - `"log"`
    - `"log-24dB"`
    - `"log-48dB"`
    - `"log-60dB"`
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
    step=""
    Step is either:
    - The string `"any"` (the default value)
    - The string `"tick"`. The values in the `ticks` attribute are used as step values
    - A space or comma separated list of values, written with or without units
    **/
    step: createAttribute('step'),

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
    display: createAttribute('display'),

    /**
    valuebox=""
    Defines an `"x y width height"` box to use as the range of values that
    map to the padding box of the `<xy-input>`. The origin is at the
    bottom and y increases upwards.

    Where not given, `valuebox` defaults to the limits of `min` and `max`.
    Most often this is what you want, and the valuebox attribute is safe to
    ignore.
    **/
    valuebox: {
        attribute: function(value) {
            // TODO: parse valuebox
        }
    },

    /**
    ordered=""
    Boolean attribute. When set, data points may not overlap their
    neighbours, keeping the order of points on the x axis constant.
    **/
    ordered: createBoolean('ordered'),

    /**
    value="0 0"
    The initial value of the element. This is a series of space or comma
    separated `x, y` values such as:

    ```
    value="0,0 1,0.5 2,0"
    ```

    Values may also be given an optional label.

    ```
    value="0,0 First 1,0 Second 2,0 Last"
    ```

    An `<xy-input>` supports WebAudio automation data. Labels must be one of
    the types `'step'`, `'linear'`, `'exponential'` or `'target'`. The type
    `'target'` must be followed by a fourth parameter duration:

    ```
    value="0,0 step 1,0 linear 2,0 target 0.2"
    ```
    **/

    /**
    .value
    The value of the element, expressed as a string. When submitted as part of a
    form the array is serialised to a formdata parameters.
    **/
    value: {
        attribute: function(value) {
            this.value = value;
        },

        get: function() {
            const privates = Privates(this);
            return stringifyValues(privates.state.value);
        },

        set: function(values) {
            const privates = Privates(this);
            privates.value.push(
                typeof values === 'string' ?
                    parseValues(values) :
                typeof values === 'number' ?
                    [{ value: values }] :
                    getTarget(values)
            );
        },

        enumerable: true
    },

    /**
    .data
    The value of the element. Returns a live array of objects representing
    each value in the input. Objects mutate in response to handles being moved,
    and handles are moved when the object values are mutated.
    **/
    data: {
        get: function() {
            const privates = Privates(this);
            return Observer(privates.state.value);
        },

        set: function(values) {
            const privates = Privates(this);
            privates.value.push(getTarget(values));
        },

        enumerable: true
    },
};
