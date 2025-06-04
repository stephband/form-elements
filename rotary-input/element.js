

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

import id              from 'fn/id.js';
import get             from 'fn/get.js';
import overload        from 'fn/overload.js';
import Privates        from 'fn/privates.js';
import clamp           from 'fn/clamp.js';
import wrap            from 'fn/wrap.js';
import Stream          from 'fn/stream.js';
import Signal          from 'fn/signal.js';
import create          from 'dom/create.js';
import element, { getInternals } from 'dom/element.js';
import events          from 'dom/events.js';
import gestures        from 'dom/gestures.js';
import isSafari        from 'dom/is-safari.js';
import { trigger }     from 'dom/trigger.js';
import parseLength     from 'dom/parse-length.js';
import { createNumberAttribute, createBooleanAttribute } from 'dom/element/create-attribute.js';
import { updateData, valueFromValue } from '../modules/data.js';
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

const toGestureValue = overload((internals, e) => e.type, {
    'pointerdown': ({ $normal }, e) => ({
        e0:    e,
        y0:    e.clientY,
        y:     $normal.value,
        touchRange: parseLength(getComputedStyle(e.target).getPropertyValue('--touch-range'))
    }),

    default: (data, e) => {
        const { y, y0, touchRange } = data;
        const dy = y0 - e.clientY;
        data.normal = y + dy / touchRange;
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
            style: '--normal: ' + tick.normal + ';',
            children: [
                create('span', {
                    text: tick.label,
                    style: 'transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, calc(-1 * (180deg + var(--rotation-start) + ' + tick.normal + ' * var(--rotation-range)))) translate3d(calc(' + Math.sin(tick.normal * 6.28318531) + ' * -33%), 0, 0);'
                })
            ]
        })
    );

    return buttons;
}

function renderValue(host, style, internals, outputText, outputAbbr, unit, value, normal) {
    // Render handle position.
    style.setProperty('--normal', normal);

    // Apple pants. Safari has a bug where it does not reliably update style
    // from variables set in the shadow DOM, so set them on the element to keep
    // it alert.
    if (isSafari) host.style.setProperty('--normal', normal);

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

    // <label part="label" for="input"><slot></slot></label>
    shadow: `
        <link rel="stylesheet" href="${ window.rhythmSynthStylesheet || import.meta.url.replace(/js$/, 'css') }"/>
        <style>:host {} :host > * { visibility: hidden; }</style>
        <div class="track" part="track"></div>
        <div class="static-handle handle"></div>
        <div class="rotate-handle handle" part="handle"></div>
        <output part="output">
            <abbr part="unit"></abbr>
        </output>
    `,

    construct: function(shadow, internals) {
        // DOM
        // TODO: Does element.js not handle hidden style now? I think it does.
        const style      = shadow.querySelector('style');
        //const label      = shadow.querySelector('label');
        const handle     = shadow.querySelector('.handle');
        const output     = shadow.querySelector('output');
        const outputText = document.createTextNode('');
        const outputAbbr = shadow.querySelector('abbr');
        const marker     = document.createTextNode('');
        const buttons    = [];

        output.prepend(outputText);
        shadow.append(marker);

        // Style
        const hostStyle  = style.sheet.cssRules[0].style;
        const childStyle = style.sheet.cssRules[1].style;

        // Attribute/property signals
        const $law    = Signal.of(defaults.law);
        const $min    = Signal.of(defaults.min);
        const $max    = Signal.of(defaults.max);
        const $wrap   = Signal.of(false);
        const $step   = Signal.of(defaults.step);
        const $ticks  = Signal.of(defaults.ticks);
        const $unit   = Signal.of(defaults.unit);
        const $value  = Signal.of(defaults.value);
        const $normal = Signal.from(() => $law.value.normalise($min.value, $max.value, $value.value));

        assign(internals, {
            host: this,
            hostStyle, childStyle, outputText, outputAbbr, buttons, marker,
            $law, $min, $max, $step, $ticks, $unit, $value, $normal, $wrap
        });

        // Update
        const setValue = (unclamped) => {
            const law    = $law.value;
            const value  = $wrap.value ?
                wrap($min.value, $max.value, unclamped) :
                clamp($min.value, $max.value, unclamped) ;

            $value.value  = value;
            trigger('input', this);
        };

        const setNormal = (normal) => {
            const law   = $law.value;
            const value = law.denormalise($min.value, $max.value, normal);
            return setValue(value);
        };

        // Track pointer on ticks and update value
        events({ type: 'pointerdown', select: '[name="value"]' }, shadow)
        .map(toTickValue)
        .each(setValue);

        // Track gestures on handle and update value
        // Safari has a bug where the handle is put back to its starting
        // position at the end of a gesture, at least until the document is
        // resized
        gestures({ threshold: 1, select: '[part="handle"]' }, shadow)
        .each((events) => events
            .scan(toGestureValue, internals)
            .map(get('normal'))
            .each(setNormal)
        );

        // While this is focused allow up and down arrows to change value
        events('keydown', this)
        .filter(() => document.activeElement === this || this.contains(document.activeElement))
        .map((e) => toKeyValue(e, $law.value, $min.value, $max.value, $step.value, $normal.value))
        .each(setValue);
    },

    load: function(shadow, { childStyle }) {
        childStyle.visibility = '';
    },

    connect: function(shadow, internals) {
        const { host, hostStyle, outputAbbr, outputText, buttons, marker, $law, $min, $max, $step, $wrap, $ticks, $unit, $value, $normal } = internals;
        return [
            // Observe attribute updates
            Signal.frame(() => {
                const law   = $law.value;
                const min   = $min.value;
                const max   = $max.value;
                const ticks = $ticks.value;

                // Define tick.normal on each tick
                if (ticks) ticks.forEach((tick) => tick.normal = law.normalise(min, max, tick.value));

                renderData(hostStyle, law, min, max, ticks, buttons, marker);
            }),
            // Observe value updates
            Signal.frame(() => renderValue(host, hostStyle, internals, outputText, outputAbbr, $unit.value, $value.value, $normal.value))
        ];
    }
}, assign({}, properties, {
    /**
    .normal
    The normal of the input, a readonly number in the range `0`-`1`. This
    corresponds to the ratio of the input's handle position over its travel.
    Also available to CSS as `var(--normal)`.
    **/
    normal: {
        get: function() {
            const { $normal } = getInternals(this);
            return $normal.value;
        }
    },

    /**
    value=""
    The initial value of the input.
    **/

    /**
    .value
    Current value of the input.
    **/
    value: createNumberAttribute('value', 0, -Infinity, Infinity, parseValue),

    /**
    wrap=""
    Boolean attribute indicating whether rotation is continuous and value
    'wraps' around between `min` and `max`.
    **/

    /**
    .wrap
    Boolean indicating whether rotation is continuous and value 'wraps' around
    between `.min` and `.max`.
    **/
    wrap: createBooleanAttribute('wrap')
}), 'stephen.band/form-elements/');
