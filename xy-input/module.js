
/** <xy-input>

A graph input with two axis scaling and ticks, support for various units, output
display and multiple handles:

<xy-input>
    XY Input
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
<style>
    xy-input {
        width: 100%;
        height: 10rem;
    }
</style>

<xy-input value="0 0, 0.2 0.4 step 0.4 1.5 exponential 0.6 1 linear 0.8 0 target 0.4" ymin="-0.5" ymax="2" yticks xmin="0" xmax="1.4" xticks>Envelope</xy-input>
<!--xy-input name="points" value="100 0dB one 200 6dB two 2000 -6dB three" ymin="-18dB" ymax="18dB" xmin="20" xmax="20000" xlaw="logarithmic-96dB" ylaw="logarithmic-48dB" xaxis="Hz" yaxis="dB"></xy-input-->
```
**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';
import properties from './modules/properties.js';

const stylesheet = window.xyInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'shadow.css';

export default element('<xy-input>', lifecycle, properties, stylesheet);
