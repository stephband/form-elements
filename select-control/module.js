/**
<select-control>

A wrapper element that augments a `<select>` with previous/next controls.

<select-control>
    <select>
        <option value="">Select one</option>
        <option value="0">Option 0</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
</select-control>

## Import

Import and register the `<select-control>` custom element, upgrading any
instances already in the DOM:

```js
import SelectControl from './select-control.js';
```

## Use

The `<select-control>` element wraps a `<select>`, augmenting it
with styleable previous/next buttons and left/right arrow keyboard behaviour:

```html
<select-control>
    <select>...</select>
</select-control>
```

<select-control>
    <select>
        <option value="">Select one</option>
        <option value="0">Option 0</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
</select-control>

Default content of previous and next buttons may be overridden with HTML
assigned to the `previous-button` and `next-button` slots:

```html
<select-control>
    <span slot="previous-button">☚</span>
    <span slot="next-button">☛</span>
    <select>...</select>
</select-control>
```

<select-control>
    <span slot="previous-button">☚</span>
    <span slot="next-button">☛</span>
    <select>
        <option value="">Select one</option>
        <option value="0">Option 0</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
</select-control>

Note that the element itself is not a custom form element (it has no `value`
property and does not set any form data in its internals).
**/

/**
slot="previous-button"
Replace default content of the decrement button (`"◀"`) with custom HTML.
**/

/**
slot="next-button"
Replace default content of the increment button (`"▶"`) with custom HTML.
**/

import element    from 'dom/element-1.js';
import lifecycle  from './modules/lifecycle.js';

const stylesheet = window.selectControlStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'shadow.css';

export default element('<select-control>', lifecycle, {}, stylesheet);
