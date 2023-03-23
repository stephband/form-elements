
import { createAttribute, createAttributeProperty, createBoolean } from './attributes.js';
import { getScale } from './scales.js';
import parseValue   from './parse-value.js';
import parseTicks   from './parse-ticks.js';


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

    min: createAttributeProperty('min', 0, parseValue),

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

    max: createAttributeProperty('max', 1, parseValue),

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

    scale: createAttribute('scale', 'linear', getScale),

    /**
    ticks=""
    A space or comma separated list of values at which to display tick marks.
    Values may be listed with or without units, eg:

    ```html
    ticks="0 0.2 0.4 0.6 0.8 1"
    ticks="-∞dB -48dB -36dB -24dB -12dB 0dB"
    ```

    Note that the unicode `∞` infinity character is interpreted as `Infinity`
    (after unit conversion `-∞dB` is `0` and `0dB` is 1).

    Ticks may optionally be given labels, displayed in lieu of the tick value.
    Labels are written in square brackets following the tick value:

    ```html
    ticks="0 [None] 0.5 [Half] 1 [Full]"
    ```
    **/

    ticks: createAttribute('ticks', '', parseTicks),

    /**
    display=""
    The units to display the value in. The output value and all ticks are
    displayed in this unit. Possible values are:

    - `"dB"` – `0-1` is displayed as `-∞dB` to `0dB`
    - `"Hz"` - frequency in `Hz` and `kHz`
    - `"bpm"` - displays rates in Hz as bpm
    - `"s"` - time in `ms` and `s`
    - `"semitone"` - without units
    - `"hh:mm"` – and other time formats including any of the tokens `YMwdhms`

    Display formatters may be added by importing the formatters object:

    ```js
    RangeInput.displayFormats['my-format'] = (format, value) => {
        // Return an object of the form `{ value, unit }`
    };
    ```

    This format may now be used by declaring the display attribute:

    ```html
    display="my-format"
    ```
    **/

    display: createAttribute('display'),

    /**
    step=""
    Step is either:
    - The string `"any"` (the default value)
    - The string `"tick"`. The values in the `ticks` attribute are used as step values
    - A space or comma separated list of values, written with or without units
    **/

    step: createAttribute('step', 'any'),

    /**
    value=""
    The initial value of the input.
    **/

    /**
    .value
    Current value of the input.
    **/

    value: createAttributeProperty('value', 0, parseValue)
};
