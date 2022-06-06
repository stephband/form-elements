

/**
<rotary-input>

Import `<rotary-input>` custom element. This also registers the custom
element and upgrades instances already in the DOM.

```html
<script type="module" src="./rotary-input.js"></script>
<rotary-input name="pan" min="-1" max="1" ticks="-1 -0.8 -0.6 -0.4 -0.2 0 0.2 0.4 0.6 0.8 1">Pan</rotary-input>
<!--rotary-input name="gain" min="-48dB" max="0dB" ticks="-∞dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB" law="linear-logarithmic" unit="dB" value="-6dB">Volume</rotary-input-->
```

**/

import element    from '../../dom/modules/element.js';
import lifecycle  from './modules/lifecycle.js';
import properties from '../modules/properties.js';

const stylesheet = window.rotaryInputStylesheet
    || import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/') + 'rotary-input-shadow.css';

export default element('<rotary-input>', lifecycle, properties, stylesheet);
