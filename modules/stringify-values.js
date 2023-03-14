
/**
stringifyValues()
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
    return (object.value + '') + (object.label ? ' ' + object.label : '');
}

export default function stringifyValues(values) {
    return values.map(toString).join(', ');
}
