
import parseValue from './parse-value.js';

/**
parseCoordinates()
Takes a space or comma separated series of coordinates-plus-optional-types as a
string and returns an array of objects. For example:

```js
// Calling:
parseCoordinates('0 0 step, 1 1 linear');

// Returns:
[
    { x: 0, y: 0, type: 'step' },
    { x: 1, y: 1, type: 'linear' }
]
```
**/

function toPoints(points, value) {
    const point = points[points.length - 1];

    // Second parameter must be y value
    if (point && point.y === undefined) {
        point.y = parseValue(value);
    }
    // Support WebAudio automation 'target' type with fourth parameter 'duration'
    else if (point && point.type === 'target' && point.duration === undefined) {
        point.duration = parseValue(value);
    }
    // Where third parameter is text, this point has a type TODO: should be label?
    else if (point && !/^-?\d/.test(value)) {
        point.type = value;
    }
    // First parameter must be x value
    else {
        points.push({
            x: parseValue(value)
        });
    }

    return points;
}

export default function parseCoordinates(string) {
    return string
    .split(/\s*,\s*|\s+/)
    .reduce(toPoints, []);
}
