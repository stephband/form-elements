
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

//import Privates                    from 'fn/privates.js';
import { clamp }                   from 'fn/clamp.js';
import nothing                     from 'fn/nothing.js';
import Signal                      from 'fn/signal.js';
import create                      from 'dom/create.js';
import element, { getInternals }   from 'dom/element.js';
//import { createAttributeProperty } from 'dom/element/create-attribute.js';
import events                      from 'dom/events.js';
import { trigger }                 from 'dom/trigger.js';
import parseValue                  from '../modules/parse-value.js';
import { getScale }                from '../modules/scales.js';
//import { updateData, updateValue } from '../modules/data.js';
import { toDisplay }               from '../modules/display.js';
import { nearestStep }             from '../modules/step.js';
import { toKeyValue }              from '../modules/key.js';
//import * as defaults               from '../modules/defaults.js';
import properties                  from '../modules/properties.js';


const DEBUG  = true;
const assign = Object.assign;
const define = Object.defineProperties;



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
        const input   = create('input', { part: 'input', type: 'range', id: 'input', name: 'unit-value', min: '0', max: '1', step: 'any', tabindex: '0' });
        const text    = document.createTextNode('');
        const abbr    = create('abbr');
        const output  = create('output', { children: [text, abbr], part: 'output' });
        const marker  = document.createTextNode('');
        const buttons = [];

        shadow.append(label, input, output, marker);

        internals.style    = style;
        internals.buttons  = buttons;
        internals.input    = input;
        internals.abbr     = abbr;
        internals.text     = text;
        internals.marker   = marker;
        internals.$loaded  = Signal.of(false);
        internals.$display = Signal.of('');
        internals.$scale   = Signal.of(getScale('linear'));
        internals.$step    = Signal.of('any');
        internals.$ticksin = Signal.of('');
        internals.$min     = Signal.of(0);
        internals.$max     = Signal.of(1);
        internals.$valuein = Signal.of(0);

        internals.$value   = Signal.compute(() => {
            const {
                $min:     { value: min },
                $max:     { value: max },
                $valuein: { value: value }
            } = internals ;

            return clamp(min, max, value);
        });

        internals.$normal = Signal.compute(() => {
            const {
                $scale: { value: scale },
                $min:   { value: min },
                $max:   { value: max },
                $value: { value: value }
            } = internals ;

            return scale.normalise(min, max, value);
        });

        internals.$ticks = Signal.compute(() => {
            const {
                $scale:   { value: scale },
                $ticksin: { value: ticks },
                $min:     { value: min },
                $max:     { value: max },
                $value:   { value: value }
            } = internals ;

            return (ticks ?
                ticks.length ? ticks :
                generateTicks(internals.$display.value, min, max) :
            nothing)
            // Filter to ticks within range min-max inclusive
            .filter((tick) => tick.value >= min && tick.value <= max)
            .map((tick) => tick.normal = scale.normalise(min, max, tick.value)) ;
        });

        internals.$step = Signal.compute(() =>
            // "any"
            step === 'any' ? undefined :
            // "ticks"
            step === 'ticks' ? data.ticks :
            // Multiple values
            /\s|,/.test(step) ? parseTicks(step)
                .filter((step) => step.value >= data.min && step.value <= data.max)
                .map((step) => assignNormal(step, scale, min, max, step.value)) :
            // Generate from a single step value
            createSteps(min, max, parseValue(step))
            .map((step) => assignNormal(step, scale, min, max, step.value))
        );

        // Track pointer on ticks and update value
        events({ type: 'pointerdown', select: '[name="value"]' }, shadow)
        .each((e) => {
            this.value = parseFloat(e.target.value);
            trigger('input', this);
        });

        // Track input changes
        events('input', shadow)
        .each((e) => {
            const {
                $min:   { value: min },
                $max:   { value: max },
                $scale: { value: scale }
            } = internals ;

            const normal = parseFloat(e.target.value);
            this.value = scale.denormalise(min, max, normal);
        });

        // While this is focused allow up and down arrows to change value
        events('keydown', this)
        .filter(() => document.activeElement === this || this.contains(document.activeElement))
        .each((e) => {
            const {
                $min:    { value: min },
                $max:    { value: max },
                $normal: { value: normal },
                $scale:  { value: scale },
                $step:   { value: step }
            } = internals ;

            this.value = toKeyValue(e, scale, min, max, step, normal);
            trigger('input', this);
        });
    },

    load: function(shadow) {
        const internals = getInternals(this);
        internals.$loaded.value = true;
    },

    connect: function() {
        const internals = getInternals(this);
        const style     = getHostStyle(internals.style);
        const { text, abbr, input, buttons, marker } = internals;

        return [
            // Form data
            Signal.tick(() => internals.setFormValue(internals.$value.value)),

            // Normal 0
            Signal.frame(() => {
                const {
                    $scale: { value: scale },
                    $min:   { value: min },
                    $max:   { value: max }
                } = internals ;

                style.setProperty('--normal-zero', scale.normalise(min, max, 0));
            }),

            // Normal value
            Signal.frame(() => {
                const normal = internals.$normal.value;
                style.setProperty('--normal-value', normal);
                if (input.getRootNode().activeElement !== input) input.value = normal;
            }),

            // Ticks
            Signal.frame(() => {
                if (!internals.$loaded.value) return;
                const ticks = internals.$ticks.value ;
                buttons.forEach((node) => node.remove());
                buttons.length = 0;

                let n = -1, tick;
                while (tick = ticks[++n]) buttons.push(create('button', {
                    type:  'button',
                    part:  'tick',
                    name:  'value',
                    value: tick.value,
                    style: '--normal-value: ' + tick.normal + ';',
                    text:  tick.label
                }));

                marker.after.apply(marker, buttons);
            }),

            // Output display
            Signal.frame(() => {
                if (!internals.$loaded.value) return;

                const {
                    $display: { value: unit },
                    $value:   { value: value }
                } = internals ;

                // Render display
                const display = toDisplay(unit, value);
                text.textContent = display.value;
                abbr.textContent = display.unit;
            })
        ];
    }
}, Object.assign({
    /**
    value=""
    The initial value of the input.
    **/

    /**
    .value
    Current value of the input.
    **/

    value: {
        attribute: function(value) {
            this[name] = value === null ? 0 : value.trim() ;
        },

        get: function() {
            const internals = getInternals(this);
            const signal = internals.$value;
            return signal.value;
        },

        set: function(value) {
            const internals = getInternals(this);
            const signal = internals.$valuein;
            signal.value = parseValue(value) || 0;
        },

        enumerable: true
    }
}, properties), 'stephen.band/form-elements/');
