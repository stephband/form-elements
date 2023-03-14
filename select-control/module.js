/**
<select-control>

Import and register the `<select-control>` custom element:

```js
import SelectControl from './select-control.js';
```

The `<select-control>` element wraps a `<select>`, augmenting it
with styleable previous/next buttons and left/right arrow keyboard behaviour:

```html
<select-control>
    <select>...</select>
</select-control>
```

Default content of previous and next buttons may be overridden with HTML
assigned to the `previous-button` and `next-button` slots:

```html
<select-control>
    <span slot="previous-button">☚</span>
    <span slot="next-button">☛</span>
    <select>...</select>
</select-control>
```

Note that the element itself is not a custom form element. It has no `value` and
does not set any form data in its internals.
**/

/**
slot="previous-button"
Replace default content of the decrement button (`"-"`) with your own HTML.
**/

/**
slot="next-button"
Replace default content of the increment button (`"+"`) with your own HTML.
**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';

const stylesheet = window.numberInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'select-control-shadow.css';

export default element('<select-control>', lifecycle, {}, stylesheet);
