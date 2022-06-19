/**
<number-input>

Import and register the `<number-input>` custom element, upgrading any
`<number-input>` elements already in the DOM:

```js
import NumberInput from './number-input.js';
```

The `<number-input>` element wraps an `<input type="number">`, augmenting it
with styleable decrement/increment buttons and up/down arrow keyboard behaviour:

```html
<number-input>
    <input type="number" />
</number-input>
```

Default content of decrement and increment buttons may be overridden with custom
HTML:

```html
<number-input>
    <span slot="decrement-button">☚</span>
    <span slot="increment-button">☛</span>
    <input type="number" min="-1" max="1" step="0.1" />
</number-input>
```

Note that the element itself is not a form element. It has no `value` and does
not set any form data in its internals.
**/

/**
slot="decrement-button"
Replace default content of the decrement button (`"-"`) with your own HTML.
**/

/**
slot="increment-button"
Replace default content of the increment button (`"+"`) with your own HTML.
**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';

const stylesheet = window.numberInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'number-input-shadow.css';

export default element('<number-input>', lifecycle, {}, stylesheet);
