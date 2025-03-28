
/** <xy-input>

A two axis input with scaling, ticks, units and multiple handles.

<xy-input value="0 0, 0.2 0.4 step 0.4 1.5 exponential 0.6 1 linear 0.8 0 target 0.4" ymin="-0.5" ymax="2" yticks xmin="0" xmax="1.4" xticks>
    Envelope
</xy-input>


## Import

Import and register the `<xy-input>` custom element, upgrading any
instances already in the DOM:

```js
import XYInput from './xy-input.js';
```


## Use

The `<xy-input>` element may now be written in your HTML:

```html
<xy-input value="0 0, 0.2 0.4 step 0.4 1.5 exponential 0.6 1 linear 0.8 0 target 0.4" ymin="-0.5" ymax="2" yticks xmin="0" xmax="1.4" xticks>
    Envelope
</xy-input>
```
**/

import element    from 'dom/element-1.js';
import lifecycle  from './modules/lifecycle.js';
import properties from './modules/properties.js';

const stylesheet = window.xyInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'shadow.css';

export default element('<xy-input>', lifecycle, properties, stylesheet);
