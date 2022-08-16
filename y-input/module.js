
/** <xy-input>

Import `<y-input>` custom element. This also registers the custom
element and upgrades instances already in the DOM.

```html
<script type="module" src="./module.js"></script>

<style>
    y-input {
        height: 10rem;
    }
</style>

<y-input value="0 1" min="-0.5" max="2" ticks>Envelope</xy-input>
```
**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';
import properties from './modules/properties.js';

const stylesheet = window.yInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'shadow.css';

export default element('<y-input>', lifecycle, properties, stylesheet);
