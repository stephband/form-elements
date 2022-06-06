/**
<range-input>

Import `<range-input>` custom element. This also registers the custom
element and upgrades instances already in the DOM.

```html
<script type="module" src="range-input.js"></script>
<range-control name="ratio" min="-1" max="1" ticks="-1 -0.8 -0.6 -0.4 -0.2 0 0.2 0.4 0.6 0.8 1" value="0">Scale</range-control>
<range-control name="gain" min="-48dB" max="0dB" ticks="-∞dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB" law="linear-logarithmic" unit="dB" value="-6dB">Volume</range-control>
<range-control name="frequency" min="20" max="20000" ticks="20Hz 100Hz 200Hz 1kHz 2kHz 10kHz 20kHz" law="logarithmic" unit="Hz" value="20Hz">Frequency</range-control>
<range-control name="rating" min="1" max="5" ticks="1 2 3 4 5" steps="ticks" law="linear" value="3">Rating</range-control>
```

**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';
import properties from '../modules/properties.js';

const stylesheet = window.rotaryInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'range-input-shadow.css';

export default element('<range-input>', lifecycle, properties, stylesheet);
