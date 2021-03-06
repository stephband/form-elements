
/** <xy-input>

Import `<xy-input>` custom element. This also registers the custom
element and upgrades instances already in the DOM.

```html
<script type="module" src="./module.js"></script>

<style>
    xy-input {
        width: 100%;
        height: 10rem;
    }
</style>

<xy-input></xy-input>
<!--xy-input name="points" value="100 0dB one 200 6dB two 2000 -6dB three" ymin="-18dB" ymax="18dB" xmin="20" xmax="20000" xlaw="logarithmic-96dB" ylaw="logarithmic-48dB" xaxis="Hz" yaxis="dB"></xy-input-->
```
**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';
import properties from './modules/properties.js';

const stylesheet = window.xyInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'xy-input-shadow.css';

export default element('<xy-input>', lifecycle, properties, stylesheet);
