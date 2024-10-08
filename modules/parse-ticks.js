
import capture    from 'fn/capture.js';
import id         from 'fn/id.js';
import last       from 'fn/last.js';
import overload   from 'fn/overload.js';
import toType     from 'fn/to-type.js';
import parseValue from './parse-value.js';

const rfloat = /^[+\-]?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+\-]?\d+)?/;

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

Values may optionally be followed by labels in square brackets:

```js
parseTicks('10ms [Short time]')    // { value: 0.01, label: 'Short time' }
```

Square brackets may be omitted where the label starts with a non-digit and
contains no spaces. It is recommended to use brackets anyway.
**/

const parseTicks = capture(/^([+\-]?(?:0|[1-9]\d*|∞)(?:\.\d+)?(?:[eE][+\-]?\d+)?\w*)\s*(?:\[([^\]]+)\]|([^\d\s-]\S*))?\s*/, {
    // value and unit
    1: (ticks, captures) => {
        const value = parseValue(captures[1]);
        ticks.push({
            value: value,
            label: captures[1]
        });
        return ticks;
    },

    // [label], in brackets may contain spaces
    2: (ticks, captures) => {
        last(ticks).label = captures[2];
        return ticks;
    },

    // label, no brackets, single word only
    3: (ticks, captures) => {
        last(ticks).label = captures[3];
        return ticks;
    },

    // Continue parsing
    done: (ticks, captures) => parseTicks(ticks, captures),

    // No more ticks
    catch: id
});

export default overload(toType, {
    string: (string) => parseTicks([], string.trim()),
    object: id
});
