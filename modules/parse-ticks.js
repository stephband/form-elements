
import capture    from '../../fn/modules/capture.js';
import id         from '../../fn/modules/id.js';
import last       from '../../fn/modules/last.js';
import overload   from '../../fn/modules/overload.js';
import toType     from '../../fn/modules/to-type.js';
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

(Square brackets may be omitted where the label contains no numbers or spaces.)
**/

const parseTicks = capture(/^([+\-]?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+\-]?\d+)?\w*)\s*(?:\[([^\]]+)\]|(\S+))?\s*/, {
    // value and unit
    1: (ticks, captures) => {
        ticks.push({ value: parseValue(captures[1]) });
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
    catch: (ticks, captures) => ticks
});

export default overload(toType, {
    string: (string) => parseTicks([], string.trim()),
    object: id
});
