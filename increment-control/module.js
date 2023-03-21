/**
<increment-control>

Import and register the `<increment-control>` custom element, upgrading any
`<increment-control>` elements already in the DOM:

```js
import NumberInput from './increment-control.js';
```

The `<increment-control>` element wraps an `<input type="number">`, augmenting it
with styleable decrement/increment buttons and up/down arrow keyboard behaviour:

```html
<increment-control>
    <input type="number" />
</increment-control>
```

Default content of decrement and increment buttons may be overridden with custom
HTML:

```html
<increment-control>
    <span slot="decrement-button">☚</span>
    <span slot="increment-button">☛</span>
    <input type="number" min="-1" max="1" step="0.1" />
</increment-control>
```

Note that the element itself is not a form element. It has no `value` and does
not set any form data in its internals.
**/

/**
slot="decrement-button"
Replace default content of the decrement button (`"-"`) with custom HTML.
**/

/**
slot="increment-button"
Replace default content of the increment button (`"+"`) with custom HTML.
**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';

const stylesheet = window.numberInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'increment-control-shadow.css';

export default element('<increment-control>', lifecycle, {}, stylesheet);
