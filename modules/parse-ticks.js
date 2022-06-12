
import parseValue from './parse-value.js';

/**
parseTicks(string)
Takes a space or comma separated series of unit values as a string and returns
an array of objects of the form:

```js
{
    label: // The unit value string
    value: // The converted numeric value
}
```
**/

function toTicks(ticks, value) {
    const tick = ticks[ticks.length - 1];

    // Does value begin with something other than a number? Must be an
    // override label.
    if (tick && !/^-?\d/.test(value)) {
        tick.label = value;
    }
    else {
        ticks.push({
            label: value,
            value: parseValue(value)
        });
    }

    return ticks;
}

export default function parseTicks(string) {
    const trimmed = string.trim();
    return trimmed ?
        trimmed
        .split(/\s*,\s*|\s+/)
        .reduce(toTicks, []) :
        null ;
}
