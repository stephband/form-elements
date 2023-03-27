/**
<number-control>

A wrapper element that augments a `<input type="number">` with increment/decrement
controls.

<number-control>
    <input type="number" />
</number-control>


## Import

Import and register the `<number-control>` custom element, upgrading any
`<number-control>` elements already in the DOM:

```js
import NumberControl from './number-control.js';
```


## Use

The `<number-control>` element wraps an `<input type="number">`, augmenting it
with styleable decrement/increment buttons and up/down arrow keyboard behaviour:

```html
<number-control>
    <input type="number" />
</number-control>
```

Default content of decrement and increment buttons may be overridden with custom
HTML:

```html
<number-control>
    <span slot="decrement-button">☚</span>
    <span slot="increment-button">☛</span>
    <input type="number" min="-1" max="1" step="0.1" />
</number-control>
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

const stylesheet = window.numberControlStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'shadow.css';

export default element('<number-control>', lifecycle, {}, stylesheet);
