
/** Installation

Download the latest release:

[github.com/stephband/form-elements/releases](https://github.com/stephband/form-elements/releases)

Include the JS and CSS files:

```html
<link rel="stylesheet" href="./build/form-elements.css" />
<script type="module" src="./build/form-elements.js"></script>
```
**/

/** API

A `form-elements` is a customised built-in select element that interprets its
option values as hrefs, turning it into a location selector. The example above
looks something like this:

```html
<select is="form-elements">
   <option value="/">Home</option>
   <option value="../form-elements/">The location select element</option>
   <option value="?param=1">Parameter</option>
   <option value="#1">Hash</option>
</select>
```

Where the `form-elements` contains an href that matches the current URL, that
option is selected. And it is updated when the URL changes and a `popstate`
event is emitted.

#### Stylesheet

The `form-elements` is deliberately left unstyled. Style it as you would any
other `<select>` element. The included stylesheet simply hides the
`form-elements` with `display: none` until it is initialised. This makes
sense as it relies on JavaScript, so it is not interactive until initialisation.

#### Browser support

Safari does not support customised built-in elements. Support is roughly
polyfilled in Safari, and `<select is="form-elements">` elements are
instantiated by selecting them at the time `form-elements.js` is run.
**/

import element   from '../dom/modules/element.js';
import lifecycle from './modules/lifecycle.js';

export default element('<select is="form-elements">', lifecycle);

// Log registration to console
window.console && window.console.log('%c<select is="form-elements">%c registered (docs at %chttps://stephen.band/form-elements/%c)', 'color: #3a8ab0; font-weight: 600;', 'color: #888888; font-weight: 400;', 'color: inherit; font-weight: 400;', 'color: #888888; font-weight: 400;');
