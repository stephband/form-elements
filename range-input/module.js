
/**
<range-input>

A horizontal slide input with scaling, steps, ticks, support for various units
and formatted output display.

<range-input name="frequency" min="20" max="20000" ticks="20Hz 40Hz 100Hz 200Hz 400Hz 1kHz 2kHz 4kHz 10kHz 20kHz" scale="log" display="Hz">
    Frequency
</range-input>


## Import

Import and register the `<range-input>` custom element, upgrading any
instances already in the DOM:

```js
import RangeInput from './range-input.js';
```


## Use

You can now write `<range-input>` elements in your HTML:

```html
<range-input name="ratio" min="-1" max="1" ticks="-1 -0.8 -0.6 -0.4 -0.2 0 0.2 0.4 0.6 0.8 1" value="0">Scale</range-input>
<range-input name="gain" min="-48dB" max="0dB" ticks="-∞dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB" scale="log-60dB" display="dB" value="-6dB">Volume</range-input>
<range-input name="frequency" min="20" max="20000" ticks="20Hz 50Hz 100Hz 200Hz 500Hz 1kHz 2kHz 5kHz 10kHz 20kHz" scale="log" display="Hz" value="20Hz">Frequency</range-input>
<range-input name="rating" min="1" max="5" ticks="1 2 3 4 5" step="tick" scale="linear" value="3">Rating</range-input>
```
**/

/*
About volume controls:
https://www.dr-lex.be/info-stuff/volumecontrols.html
Safari 14 crashes when clicking on elements with delegateFocus:
https://github.com/material-components/material-components-web-components/issues/1720
*/

import Privates                    from 'fn/privates.js';
import { clamp }                   from 'fn/clamp.js';
import Stream                      from 'fn/stream/stream.js';
import create                      from 'dom/create.js';
import element                     from 'dom/element.js';
import events                      from 'dom/events.js';
import { trigger }                 from 'dom/trigger.js';
import parseValue                  from '../modules/parse-value.js';
import { updateData, updateValue } from '../modules/data.js';
import { toDisplay }               from '../modules/display.js';
import { nearestStep }             from '../modules/step.js';
import { toKeyValue }              from '../modules/key.js';
import * as defaults               from '../modules/defaults.js';
import { createAttributeProperty } from '../modules/attributes.js';
import properties                  from '../modules/properties.js';


const DEBUG  = true;
const assign = Object.assign;
const define = Object.defineProperties;


/*
Events
*/

function toTickValue(e) {
    const target = e.target.closest('[name="value"]');
    return parseFloat(target.value);
}


/*
Render
*/

function renderTick(buttons, tick) {
    buttons.push(create('button', {
        type: 'button',
        part: 'tick',
        name: 'value',
        value: tick.value,
        style: '--normal-value: ' + tick.normal + ';',
        text: tick.label
    }));

    return buttons;
}

function renderData(style, scale, min, max, ticks, buttons, marker) {
    // Style
    style.setProperty('--normal-zero', scale.normalise(min, max, 0));

    // Ticks
    buttons.forEach((node) => node.remove());
    buttons.length = 0;
    buttons = ticks.reduce(renderTick, buttons);
    marker.after.apply(marker, buttons);
}

function renderValue(style, input, internals, outputText, outputAbbr, unit, value, normal) {
    // Render handle position
    // TODO: Safari (of course) is not updating style consistently, set this way,
    // we may need to devise another strategy
    style.setProperty('--normal-value', normal);
    input.value = normal;

    // Render display
    const display = toDisplay(unit, value);
console.log(unit, value);
    outputText.textContent = display.value;
    outputAbbr.textContent = display.unit;

    // Render form data
    internals.setFormValue(value);
}


/*
Lifecycle
*/

function getHostStyle(style) {
    return style.sheet.cssRules[0].style;
}

export default element('<range-input>', {
    focusable: true,

    shadow: `
        <style>:host {}</style>
        <link rel="stylesheet" href="${ window.rangeInputStylesheet || import.meta.url.replace(/module\.js$/, 'shadow.css') }"/>
    `,

    construct: function(shadow, internals) {
        // DOM
        const style   = shadow.querySelector('style');
        const label   = create('label', { part: 'label', for: 'input', html: '<slot></slot>' });
        // TODO: For some reason in Safari, the input does not get focus, with or without tabindex
        const input   = create('input', { part: 'input', type: 'range', id: 'input', name: 'unit-value', min: '0', max: '1', step: 'any', tabindex: '0' });
        const text    = document.createTextNode('');
        const abbr    = create('abbr');
        const output  = create('output', { children: [text, abbr], part: 'output' });
        const marker  = document.createTextNode('');
        const buttons = [];

        shadow.append(label, input, output, marker);

        // Components
        const privates     = Privates(this);
        const data         = {};

        privates.host      = this;
        privates.shadow    = shadow;
        privates.internals = internals;
        privates.data      = data;
        privates.shadow    = new Promise((resolve) => privates.load = resolve);
        privates.scale     = Stream.of(defaults.scale);
        privates.min       = Stream.of(defaults.min);
        privates.max       = Stream.of(defaults.max);
        privates.step      = Stream.of(defaults.step);
        privates.ticks     = Stream.of(defaults.ticks);
        privates.display   = Stream.of(defaults.display);
        privates.value     = Stream.of(defaults.value);
console.log(Stream.combine);
        // Track attribute updates
        const attributes = Stream
        .combine({
            shadow:  privates.shadow,
            scale:   privates.scale,
            min:     privates.min,
            max:     privates.max,
            ticks:   privates.ticks,
            display: privates.display,
            step:    privates.step
        })
        .scan(updateData, data);

        attributes
        .each((data) => renderData(getHostStyle(style), data.scale, data.min, data.max, data.ticks, buttons, marker));

        // Track value updates
        Stream
        .combine({
            data:    attributes,
            value:   privates.value
        })
        .scan((data, state) => updateValue(data, state.data.scale, state.data.min, state.data.max, state.data.step, state.value), data)
        .each((data) => renderValue(getHostStyle(style), input, internals, text, abbr, data.display, data.value, data.normal)) ;

        // Track pointer on ticks and update value
        events({ type: 'pointerdown', select: '[name="value"]' }, shadow)
        .map(toTickValue)
        .each((value) => {
            privates.value.push(value);
            trigger('input', this);
        });

        // Track input changes
        events('input', shadow)
        .each((e) => {
            const normal = parseFloat(e.target.value);
            const value  = data.scale.denormalise(data.min, data.max, normal);
            privates.value.push(value);
        });

        // While this is focused allow up and down arrows to change value
        events('keydown', this)
        .filter(() => document.activeElement === this || this.contains(document.activeElement))
        .map((e) => toKeyValue(e, data.scale, data.min, data.max, data.step, data.normal))
        .each((value) => {
            privates.value.push(value);
            trigger('input', this);
        });
    },

    load: function(shadow) {
        const privates = Privates(this);
        privates.load(shadow);
    },

    connect: function() {
        //console.log('RANGE CONNECT', this.nnn, document.body.contains(this));
    },

    disconnect: function() {
        //console.log('RANGE DISCONNECT', this.nnn, document.body.contains(this));
    }
}, Object.assign({}, properties, {
    /**
    value=""
    The initial value of the input.
    **/

    /**
    .value
    Current value of the input.
    **/

    value: createAttributeProperty('value', 0, parseValue)
}), 'stephen.band/form-elements/');
