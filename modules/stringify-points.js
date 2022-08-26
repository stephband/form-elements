

/**
stringifyPoints()
Takes an array of objects with a value property and an optional label
property and returns a string.

```js
// Takes:
[
    { value: 0, label: 'step' },
    { value: 1, label: 'linear' }
]

// Returns:
"0 step, 1 linear"
```
**/


function toString(object) {
    return object.x + ' ' + object.y + (object.label ? ' ' + object.label : '');
}

export default function stringifyCoordinates(objects) {
    return objects.map(toString).join(', ');
}
