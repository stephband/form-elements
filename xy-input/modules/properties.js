
import { Observer, getTarget } from '../../../fn/observer/observer.js';
import Privates      from '../../../fn/modules/privates.js';
import parsePoints    from '../../modules/parse-points.js';

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
    xmin="0"
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/

    /**
    .xmin
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/
    xmin: createAttributeProperty('xmin', 0),

    /**
    xmax="1"
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/

    /**
    .xmax
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/
    xmax: createAttributeProperty('xmax', 1),

    /**
    ymin="0"
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/

    /**
    .ymin
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/
    ymin: createAttributeProperty('ymin', 0),

    /**
    ymax="1"
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/

    /**
    .ymax
    Value at upper limit of fader. Can interpret string values with recognised
    units, eg. `"0dB"` or `"200Hz"`, or numbers.
    **/
    ymax: createAttributeProperty('ymax', 1),

    /**
    xscale="linear"
    Scale on the x axis. This is the name of a transform to be applied over the
    x range of the fader travel. Possible values are:

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
    xscale: createAttribute('xscale', 'linear'),

    /**
    yscale="linear"
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
    yscale: createAttribute('yscale', 'linear'),

    /**
    xticks=""
    A space or comma separated list of values at which to display tick marks.
    Values may be listed with or without units, eg:

    ```html
    xticks="0 0.2 0.4 0.6 0.8 1"
    xticks="-48dB -36dB -24dB -12dB 0dB"
    ```
    **/
    xticks: createAttribute('xticks', ''),

    /**
    yticks=""
    A space or comma separated list of values at which to display tick marks.
    Values may be listed with or without units, eg:

    ```html
    yticks="0 0.2 0.4 0.6 0.8 1"
    yticks="-48dB -36dB -24dB -12dB 0dB"
    ```
    **/
    yticks: createAttribute('yticks', ''),

    /**
    xstep=""
    Step is either:
    - The string `"any"` (the default value)
    - The string `"tick"`. The values in the `ticks` attribute are used as step values
    - A space or comma separated list of values, written with or without units
    **/
    xstep: createAttribute('xstep'),

    /**
    ystep=""
    Step is either:
    - The string `"any"` (the default value)
    - The string `"tick"`. The values in the `ticks` attribute are used as step values
    - A space or comma separated list of values, written with or without units
    **/
    ystep: createAttribute('ystep'),

    /**
    xdisplay=""
    The units to display the value in. The output value and all ticks are
    displayed in this unit. Possible values are:
    - `"dB"` – `0-1` is displayed as `-∞dB` to `0dB`
    - `"Hz"`
    - `"bpm"`
    - `"s"`
    - `"semitone"`
    **/
    xdisplay: createAttribute('xdisplay'),

    /**
    ydisplay=""
    The units to display the value in. The output value and all ticks are
    displayed in this unit. Possible values are:
    - `"dB"` – `0-1` is displayed as `-∞dB` to `0dB`
    - `"Hz"`
    - `"bpm"`
    - `"s"`
    - `"semitone"`
    **/
    ydisplay: createAttribute('ydisplay'),

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
    value=""
    The initial value of the element.
    **/

    /**
    .value
    The value of the element. Returns an array of data points. The array is a
    live object. It changes in response to changes to the element, and the
    element changes in response changes to the array or its data points.

    When submitted as part of a form the array is serialised to a formdata
    parameters.
    **/
    value: {
        attribute: function(value) {
            this.value = value;
        },

        get: function() {
            const privates = Privates(this);
            return Observer(privates.data.points);
        },

        set: function(values) {
            const privates = Privates(this);
            privates.value.push(
                typeof values === 'string' ?
                    parsePoints(values) :
                    getTarget(values)
            );
        },

        enumerable: true
    },
};
