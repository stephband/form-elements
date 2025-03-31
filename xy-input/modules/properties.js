
import { Observer, getTarget } from '../../../fn/observer/observer.js';
import Privates                from 'fn/privates.js';
import { createAttribute, createAttributeProperty, createBoolean } from '../../modules/attributes.js';
import parsePoints     from '../../modules/parse-points.js';
import stringifyPoints from '../../modules/stringify-points.js';
import { getScale }    from '../../modules/law.js';
import parseValue      from '../../modules/parse-value.js';
import parseTicks      from '../../modules/parse-ticks.js';


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

    xmin: createAttributeProperty('xmin', 0, parseValue),

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

    xmax: createAttributeProperty('xmax', 1, parseValue),

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

    ymin: createAttributeProperty('ymin', 0, parseValue),

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

    ymax: createAttributeProperty('ymax', 1, parseValue),

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

    xscale: createAttribute('xscale', 'linear', getScale),

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

    yscale: createAttribute('yscale', 'linear', getScale),

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
    xticks=""
    A space or comma separated list of values at which to display tick marks.
    Values may be listed with or without units, eg:

    ```html
    xticks="0 0.2 0.4 0.6 0.8 1"
    xticks="-48dB -36dB -24dB -12dB 0dB"
    ```
    **/

    xticks: createAttribute('xticks', '', parseTicks),

    /**
    yticks=""
    A space or comma separated list of values at which to display tick marks.
    Values may be listed with or without units, eg:

    ```html
    yticks="0 0.2 0.4 0.6 0.8 1"
    yticks="-48dB -36dB -24dB -12dB 0dB"
    ```
    **/

    yticks: createAttribute('yticks', '', parseTicks),

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
    ordered=""
    Boolean attribute. When set, data points may not overlap their
    neighbours, keeping the order of points on the x axis constant.
    **/

    ordered: createBoolean('ordered'),

    /**
    value="0,0"
    The initial value of the element. This is a series of space or comma
    separated `x,y` values such as:

    ```
    value="0,0 1,0.5 2,0"
    ```

    Values may also be given an optional label.

    ```
    value="0,0 [First] 1,0 [Second] 2,0 [Last]"
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
    The value of the element. Returns an array of objects representing each
    point in the input. The array is a live object. Objects mutate in response
    to handles being moved, and handles are moved if the objects are mutated.

    When submitted as part of a form the array is serialised to a formdata
    parameters.
    **/

    value: {
        attribute: function(value) {
            this.value = value;
        },

        get: function() {
            const privates = Privates(this);
            return stringifyPoints(privates.state.value);
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

    /**
    .data
    The value of the element as an array of objects representing the values of
    the input. The array is 'live' – objects mutate in response to moved handles,
    and handles move when the object values are set.
    **/

    data: {
        get: function() {
            const privates = Privates(this);
            return Observer(privates.data);
        },

        set: function(values) {
            const privates = Privates(this);
            privates.values.push(getTarget(values));
        },

        enumerable: true
    }
};
