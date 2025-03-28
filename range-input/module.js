
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

import clamp           from 'fn/clamp.js';
import nothing         from 'fn/nothing.js';
import Signal          from 'fn/signal.js';
import create          from 'dom/create.js';
import element, { getInternals } from 'dom/element.js';
import events          from 'dom/events.js';
import { trigger }     from 'dom/trigger.js';
import compile         from '../modules/compile.js';
import parseValue      from '../modules/parse-value.js';
import { getScale }    from '../modules/law.js';
import { nearestStep } from '../modules/step.js';
import { toKeyValue }  from '../modules/key.js';
import properties      from '../modules/properties.js';


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

        // Signals
        const $loaded    = Signal.of(false);
        const $display   = Signal.of(() => '');
        const $scale     = Signal.of(getScale('linear'));
        const $stepattr  = Signal.of('any');
        const $ticks     = Signal.of();
        const $min       = Signal.of(0);
        const $max       = Signal.of(1);
        const $valueattr = Signal.of(0);

        const $value = Signal.compute(() => {
            const { value: min }   = $min;
            const { value: max }   = $max;
            const { value: value } = $valueattr;
            return clamp(min, max, value);
        });

        const $normal = Signal.compute(() => {
            const { value: scale } = $scale;
            const { value: min }   = $min;
            const { value: max }   = $max;
            const { value: value } = $value;
            return scale.normalise(min, max, value);
        });

        const $ticklist = Signal.compute(() => {
            const { value: scale } = $scale;
            const { value: ticks } = $ticks;
            const { value: min }   = $min;
            const { value: max }   = $max;
            const { value: value } = $value;
            return (ticks ?
                ticks.length ? ticks :
                generateTicks(internals.$display.value, min, max) :
            nothing)
            // Filter to ticks within range min-max inclusive
            .filter((tick) => tick.value >= min && tick.value <= max)
            .map((tick) => tick.normal = scale.normalise(min, max, tick.value)) ;
        });

        const $step = Signal.compute(() => {
            const { value: step } = internals.$stepattr;

            if (step === 'any') return;
            if (step === 'ticks') return internals.$ticklist.value;

            const { value: scale } = $scale;
            const { value: min }   = $min;
            const { value: max }   = $max;

            return /\s|,/.test(step) ?
                // Multiple step values
                parseTicks(step)
                .filter((step) => step.value >= min && step.value <= max)
                .map((step) => assignNormal(step, scale, min, max, step.value)) :
                // Single step value
                createSteps(min, max, parseValue(step))
                .map((step) => assignNormal(step, scale, min, max, step.value)) ;
        });

        assign(internals, {
            style, buttons, input, abbr, text, marker,
            $display, $min, $max, $normal, $scale, $ticklist, $valueattr, $value
        });

        // Track pointer on ticks and update value
        events({ type: 'pointerdown', select: '[name="value"]' }, shadow)
        .each((e) => {
            this.value = parseFloat(e.target.value);
            trigger('input', this);
        });

        // Track input changes
        events('input', shadow)
        .each((e) => {
            const { value: min }   = $min;
            const { value: max }   = $max;
            const { value: scale } = $scale;
            const normal = parseFloat(e.target.value);
            this.value = scale.denormalise(min, max, normal);
        });

        // While this is focused allow up and down arrows to change value
        events('keydown', this)
        .filter(() => document.activeElement === this || this.contains(document.activeElement))
        .each((e) => {
            const { value: min }    = $min;
            const { value: max }    = $max;
            const { value: normal } = $normal;
            const { value: scale }  = $scale;
            const { value: step }   = $step;
            this.value = toKeyValue(e, scale, min, max, step, normal);
            trigger('input', this);
        });
    },

    /*load: function(shadow) {
        const internals = getInternals(this);
        internals.$loaded.value = true;
    },*/

    connect: function() {
        const internals = getInternals(this);
        const style     = getHostStyle(internals.style);
        const { text, abbr, input, buttons, marker, $display, $scale, $min, $max, $value, $normal, $ticklist } = internals;

        return [
            // Set form data
            Signal.tick(() => internals.setFormValue(internals.$value.value)),

            // Render normal 0
            Signal.frame(() => {
                const { value: scale } = $scale;
                const { value: min }   = $min;
                const { value: max }   = $max;
                style.setProperty('--normal-zero', scale.normalise(min, max, 0));
            }),

            // Render normal value
            Signal.frame(() => {
                const normal = $normal.value;
                style.setProperty('--normal-value', normal);
                if (input.getRootNode().activeElement !== input) input.value = normal;
            }),

            // Render ticks
            Signal.frame(() => {
                //if (!internals.$loaded.value) return;
                const ticks = $ticklist.value ;
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

            // Render output display
            Signal.frame(() => {
                const { value: display } = $display;
                const { value: value }   = $value;
                const string = display(value);
                text.textContent = string.replace(/[^\d]*$/, '');
                abbr.textContent = /[^\d]*$/.exec(string)[0];
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
            this.value = value === null ? 0 : value.trim() ;
        },

        get: function() {
            const { $value } = getInternals(this);
            return $value.value;
        },

        set: function(value) {
            const { $valueattr } = getInternals(this);
            $valueattr.value = parseValue(value) || 0;
        },

        enumerable: true
    }
}, properties), 'stephen.band/form-elements/');
