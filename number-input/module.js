/**
<number-input>

Import and register the `<number-input>` custom element:

```html
<script type="module" src="number-input.js"></script>
```

You can now write `<number-input>` elements in your HTML:

```html
<number-input name="number" min="-1" max="1" value="0" />
```
**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';
import properties from './modules/properties.js';

const stylesheet = window.numberInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'number-input-shadow.css';

export default element('<number-input>', lifecycle, properties, stylesheet);
