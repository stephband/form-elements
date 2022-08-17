
import parseValue from './parse-value.js';

/**
parseValues()
Takes a space or comma separated series of coordinates-plus-optional-types as a
string and returns an array of objects. For example:

```js
// Calling:
parseValues('0 0 step, 1 1 linear');

// Returns:
[
    { value: 0, label: 'step' },
    { value: 1, label: 'linear' }
]
```
**/

function toValue(objects, value) {
    const object = objects[objects.length - 1];

    // Where second parameter is text, this object has a label
    if (object && !/^-?\d/.test(value)) {
        object.label = value;
    }
    // First parameter must be value
    else {
        objects.push({
            value: parseValue(value)
        });
    }

    return objects;
}

export default function parseValues(string) {
    return string
    .split(/\s*,\s*|\s+/)
    .reduce(toValue, []);
}
