

/** <rotary-input>

A rotating knob form input with scaling, ticks, units and formatted output
display.

<rotary-input name="pan" min="-1" max="1" ticks="-1 -0.8 -0.6 -0.4 -0.2 0 0.2 0.4 0.6 0.8 1">
    Pan
</rotary-input>

<rotary-input name="gain" min="0" max="2" ticks="-∞dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB" law="log-48dB" display="dB" value="-6dB">
    Volume
</rotary-input>

<rotary-input name="frequency" min="20" max="20000" ticks="25Hz 50Hz 100Hz 250Hz 500Hz 1kHz 2.5kHz 5kHz 10kHz 20kHz" law="log" display="Hz" value="1000">
    Frequency
</rotary-input>


## Import

Import and register the `<rotary-input>` custom element, upgrading any
instances already in the DOM:

```js
import RotaryInput from './rotary-input.js';
```

## Use

You can now author rotating knobs in forms:

```html
<rotary-input name="pan" min="-1" max="1" ticks="-1 -0.8 -0.6 -0.4 -0.2 0 0.2 0.4 0.6 0.8 1">Pan</rotary-input>
<rotary-input name="gain" min="0" max="2" ticks="-∞dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB" law="log-48dB" display="dB" value="-6dB">Volume</rotary-input>
<rotary-input name="frequency" min="20" max="20000" ticks="20Hz 30Hz 50Hz 100Hz 200Hz 300Hz 500Hz 1kHz 2kHz 3kHz 5kHz 10kHz 20kHz" law="log" display="Hz" value="1000">Frequency</rotary-input>
```

**/



/*
The CSS that makes this web component flexible may look a little funky. The
width of the component dictates the size of the handle, track and tick radius,
then those elements push the (automatic) height of the component. The ticks are
normally layed out vertically before being transformed. They are usually the
tallest element. If there are no ticks the component will collapse a bit
smaller.
*/

import get             from 'fn/get.js';
import overload        from 'fn/overload.js';
import Privates        from 'fn/privates.js';
import { clamp }       from 'fn/clamp.js';
import Stream          from 'fn/stream.js';
import Signal          from 'fn/signal.js';
import create          from 'dom/create.js';
import element         from 'dom/element.js';
import events          from 'dom/events.js';
import gestures        from 'dom/gestures.js';
import { trigger }     from 'dom/trigger.js';
import parseLength     from 'dom/parse-length.js';
import { createNumberAttribute } from 'dom/element/create-attribute.js';
import { updateData, updateValue } from '../modules/data.js';
import properties      from '../modules/properties.js';
import parseValue      from '../modules/parse-value.js';
import { toDisplay }   from '../modules/parse-display.js';
import { toKeyValue }  from '../modules/key.js';
import * as defaults   from '../modules/defaults.js';


const assign = Object.assign;


/* Events */

function toTickValue(e) {
    const target = e.target.closest('[name="value"]');
    return parseFloat(target.value);
}

const toGestureValue = overload((pointer, e) => e.type, {
    'pointerdown': (data, e) => ({
        law:   data.law,
        min:   data.min,
        max:   data.max,
        e0:    e,
        y0:    e.clientY,
        y:     data.normal,
        value: data.value,
        touchRange: parseLength(getComputedStyle(e.target).getPropertyValue('--touch-range'))
    }),

    default: (data, e) => {
        const { law, min, max, y, y0, touchRange } = data;
        const dy     = y0 - e.clientY;
        const normal = clamp(0, 1, y + dy / touchRange);
        const value  = law.denormalise(min, max, normal) ;
        data.value = value;
        return data;
    }
});


/* Render */

function renderTick(buttons, tick) {
    buttons.push(
        create('button', {
            type: 'button',
            part: 'tick',
            name: 'value',
            value: tick.value,
            style: '--normal-value: ' + tick.normal + ';',
            children: [
                create('span', {
                    text: tick.label,
                    style: 'transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, calc(-1 * (var(--rotation-start) + ' + tick.normal + ' * var(--rotation-range)))) translate3d(calc(' + Math.sin(tick.normal * 6.28318531) + ' * -33%), 0, 0);'
                })
            ]
        })
    );

    return buttons;
}

function renderValue(style, internals, outputText, outputAbbr, unit, value, normal) {
    // Render handle position
    style.setProperty('--normal-value', normal);

    // Render display
    const display = toDisplay(unit, value);
    outputText.textContent = display.value;
    outputAbbr.textContent = display.unit;

    // Render form data
    internals.setFormValue(value);
}

function renderData(style, law, min, max, ticks, buttons, marker) {
    // Style
    style.setProperty('--normal-zero', law.normalise(min, max, 0));

    // Ticks
    buttons.forEach((node) => node.remove());
    buttons.length = 0;

    if (!ticks) return;
    buttons = ticks.reduce(renderTick, buttons);
    marker.after.apply(marker, buttons);
}


/* Element */

/**
"input"
Emitted from the element during the movement of a handle.
**/

/**
"change"
Emitted from the element when a handle has been moved.
**/

export default element('<rotary-input>', {
    mode: 'closed',
    focusable: true,

    shadow: `
        <link rel="stylesheet" href="${ window.rhythmSynthStylesheet || import.meta.url.replace(/js$/, 'css') }"/>
        <style>:host {} :host > * { visibility: hidden; }</style>
        <label part="label" for="input"><slot></slot></label>
        <div part="handle" class="handle"></div>
        <output part="output">
            <abbr part="unit"></abbr>
        </output>
    `,

    construct: function(shadow, internals) {
        // DOM
        // TODO: DOes element.js not handle style now? I think so.
        const style      = shadow.querySelector('style');
        const label      = shadow.querySelector('label');
        const handle     = shadow.querySelector('.handle');
        const output     = shadow.querySelector('output');
        const outputText = document.createTextNode('');
        const outputAbbr = shadow.querySelector('abbr');
        const marker     = document.createTextNode('');
        const buttons    = [];

        output.prepend(outputText);
        shadow.append(marker);

        const data       = {};
        const hostStyle  = style.sheet.cssRules[0].style;
        const childStyle = style.sheet.cssRules[1].style;
        const display    = Signal.of(defaults.display);
        const law        = Signal.of(defaults.law);
        const min        = Signal.of(defaults.min);
        const max        = Signal.of(defaults.max);
        const step       = Signal.of(defaults.step);
        const ticks      = Signal.of(defaults.ticks);
        const value      = Signal.of(defaults.value);

        assign(internals, {
            host: this,
            hostStyle, childStyle, outputText, outputAbbr, buttons,
            law, min, max, step, ticks, display, value
        });

        // ???
        internals.data       = data;

        // Updates
        const pushValue = (value) => {
            console.log('PUSH VALUE');
            privates.value.push(value);
            trigger('input', this);
        };




        // Track pointer on ticks and update value
        events({ type: 'pointerdown', select: '[name="value"]' }, shadow)
        .map(toTickValue)
        .each(pushValue);

        // Track gestures on handle and update value
        gestures({ threshold: 1, select: '[part="handle"]' }, shadow)
        .each((events) => {
            events
            .scan(toGestureValue, data)
            .map(get('value'))
            .each(pushValue)
        });

        // While this is focused allow up and down arrows to change value
        events('keydown', this)
        .filter(() => document.activeElement === this || this.contains(document.activeElement))
        .map((e) => toKeyValue(e, law.value, min.value, max.value, step.value, data.normal))
        .each(pushValue);
    },

    load: function(shadow, { childStyle }) {
        childStyle.visibility = '';
    },

    connect: function(shadow, internals) {
        const { hostStyle, outputAbbr, outputText, buttons, marker, law, min, max, step, ticks, display, value, data } = internals;
        return [
            // Observe attribute updates
            Signal.frame(() => {
                renderData(hostStyle, law.value, min.value, max.value, ticks.value, buttons, marker);
            }),

            // Observe value attribute updates
            Signal.frame(() => {
                if (value.value === undefined) return;
                updateValue(data, law.value, min.value, max.value, step.value, value.value);
                renderValue(hostStyle, internals, outputText, outputAbbr, display.value, value.value, data.normal);
            })
        ];
    }
}, assign({}, properties, {
    /**
    value=""
    The initial value of the input.
    **/

    /**
    .value
    Current value of the input.
    **/
    value: createNumberAttribute('value', 0, -Infinity, Infinity, parseValue)
}), 'stephen.band/form-elements/');
