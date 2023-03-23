
/** <y-input>

A vertical slider input with scaling, ticks, units, output display and
multiple values.

<y-input value="0" ticks="0 0.2 0.4 0.6 0.8 1">
    Value
</y-input>

<y-input min="0" max="2" scale="log-30dB" ticks="-∞dB -24dB -18dB -12dB -6dB 0dB 6dB" display="dB" value="0dB">
    Gain
</y-input>

<y-input min="-1" max="1" value="-0.5 0.5" ticks="-1 -0.5 0 0.5 1">
    Range
</y-input>


## Import

Import and register the `<y-input>` custom element, upgrading any
instances already in the DOM:

```js
import YInput from './y-input.js';
```


## Use

Author vertical sliders:

```html
<y-input>Volume</y-input>
```
**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';
import properties from './modules/properties.js';

const stylesheet = window.yInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'shadow.css';

export default element('<y-input>', lifecycle, properties, stylesheet);
