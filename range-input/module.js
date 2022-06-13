/**
<range-input>

Import the `<range-input>` custom element. This registers the custom element and
upgrades instances already in the DOM:

```html
<script type="module" src="range-input.js"></script>
```

You can now write `<range-input>` elements in your HTML:

```html
<range-input name="ratio" min="-1" max="1" ticks="-1 -0.8 -0.6 -0.4 -0.2 0 0.2 0.4 0.6 0.8 1" value="0">Scale</range-input>
<range-input name="gain" min="-48dB" max="0dB" ticks="-∞dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB" scale="log-60dB" display="dB" value="-6dB">Volume</range-input>
<range-input name="frequency" min="20" max="20000" ticks="20Hz 50Hz 100Hz 200Hz 500Hz 1kHz 2kHz 5kHz 10kHz 20kHz" scale="log" display="Hz" value="20Hz">Frequency</range-input>
<range-input name="rating" min="1" max="5" ticks="1 2 3 4 5" step="tick" scale="linear" value="3">Rating</range-input>
```
**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';
import properties from '../modules/properties.js';

const stylesheet = window.rangeInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'range-input-shadow.css';

export default element('<range-input>', lifecycle, properties, stylesheet);
