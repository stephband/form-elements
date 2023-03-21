
/*
The CSS that makes this web component flexible may look a little funky. The
width of the component dictates the size of the handle, track and tick radius,
then those elements push the (automatic) height of the component. The ticks are
normally layed out vertically before being transformed. They are usually the
tallest element. If there are no ticks the component will collapse a bit
smaller.
*/

import get             from '../../../fn/modules/get.js';
import overload        from '../../../fn/modules/overload.js';
import Privates        from '../../../fn/modules/privates.js';
import { clamp }       from '../../../fn/modules/clamp.js';
import Stream          from '../../../fn/modules/stream.js';
import create          from '../../../dom/modules/create.js';
import events          from '../../../dom/modules/events.js';
import gestures        from '../../../dom/modules/gestures.js';
import { trigger }     from '../../../dom/modules/trigger.js';
import parseLength     from '../../../dom/modules/parse-length.js';
import parseValue      from '../../modules/parse-value.js';
import { updateData, updateValue } from '../../modules/data.js';
import { toDisplay }   from '../../modules/display.js';
import { toKeyValue }  from '../../modules/key.js';
import * as defaults   from '../../modules/defaults.js';

/*
Events
*/

function toTickValue(e) {
    const target = e.target.closest('[name="value"]');
    return parseFloat(target.value);
}

const toGestureValue = overload((pointer, e) => e.type, {
    'pointerdown': (data, e) => ({
        scale: data.scale,
        min:   data.min,
        max:   data.max,
        e0:    e,
        y0:    e.clientY,
        y:     data.normalValue,
        value: data.value,
        touchRange: parseLength(getComputedStyle(e.target).getPropertyValue('--touch-range'))
    }),

    default: (data, e) => {
        const { scale, min, max, y, y0, touchRange } = data;
        const dy        = y0 - e.clientY;
        const normalValue = clamp(0, 1, y + dy / touchRange);
        const value     = scale.denormalise(min, max, normalValue) ;
        data.value = value;
        return data;
    }
});


/*
Render
*/

function renderTick(buttons, tick) {
    buttons.push(
        create('button', {
            type: 'button',
            part: 'tick',
            name: 'value',
            value: tick.value,
            style: '--normal-value: ' + tick.normalValue + ';',
            children: [
                create('span', {
                    text: tick.label,
                    style: 'transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, calc(-1 * (var(--rotation-start) + ' + tick.normalValue + ' * var(--rotation-range)))) translate3d(calc(' + Math.sin(tick.normalValue * 6.28318531) + ' * -33%), 0, 0);'
                })
            ]
        })
    );

    return buttons;
}

function renderValue(style, internals, outputText, outputAbbr, unit, value, normalValue) {
    // Render handle position
    style.setProperty('--normal-value', normalValue);

    // Render display
    const display = toDisplay(unit, value);
    outputText.textContent = display.value;
    outputAbbr.textContent = display.unit;

    // Render form data
    internals.setFormValue(value);
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


/*
Lifecycle
*/

export default {
    mode: 'closed',

    focusable: true,

    construct: function(shadow, internals) {
        // DOM
        const style   = create('style', ':host {} :host > * { visibility: hidden; }');
        const label   = create('label', { for: 'input', part: 'label', html: '<slot></slot>' });
        const handle  = create('div', { class: 'handle' });
        const text    = create('text');
        const abbr    = create('abbr');
        const output  = create('output', { children: [text, abbr], part: 'output' });
        const marker  = create('text', '') ;
        const buttons = [];

        shadow.append(style, label, handle, output, marker);

        // Components
        const privates   = Privates(this);
        const data       = {};
        const hostStyle  = style.sheet.cssRules[0].style;
        const childStyle = style.sheet.cssRules[1].style;

        privates.host       = this;
        privates.shadow     = shadow;
        privates.hostStyle  = hostStyle;
        privates.childStyle = childStyle;
        privates.internals  = internals;
        privates.data       = data;

        // Inputs
        privates.shadow    = new Promise((resolve) => privates.load = resolve);
        privates.scale     = Stream.of(defaults.scale);
        privates.min       = Stream.of(defaults.min);
        privates.max       = Stream.of(defaults.max);
        privates.step      = Stream.of(defaults.step);
        privates.ticks     = Stream.of(defaults.ticks);
        privates.display   = Stream.of(defaults.display);
        privates.value     = Stream.of(defaults.value);

        // Updates
        const pushValue = (value) => {
            privates.value.push(value);
            trigger('input', this);
        };

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
        .scan(updateData, data)
        .broadcast();

        attributes
        .each((data) => renderData(hostStyle, data.scale, data.min, data.max, data.ticks, buttons, marker));

        // Track value updates
        Stream
        .combine({
            data:    attributes,
            value:   privates.value
        })
        .scan((data, state) => updateValue(data, state.data.scale, state.data.min, state.data.max, state.value), data)
        .each((data) => renderValue(hostStyle, internals, text, abbr, data.display, data.value, data.normalValue)) ;

        // Track pointer on ticks and update value
        events({ type: 'pointerdown', select: '[name="value"]' }, shadow)
        .map(toTickValue)
        .each(pushValue);

        // Track gestures on handle and update value
        gestures({ threshold: 1, select: '.handle' }, shadow)
        .each((events) =>
            events
            .scan(toGestureValue, data)
            .map(get('value'))
            .each(pushValue)
        );

        // While this is focused allow up and down arrows to change value
        events('keydown', this)
        .filter(() => document.activeElement === this || this.contains(document.activeElement))
        .map((e) => toKeyValue(e, data.scale, data.min, data.max, data.step, data.normalValue))
        .each(pushValue);
    },

    load: function(shadow) {
        const privates = Privates(this);
        privates.childStyle.visibility = '';
        privates.load(shadow);
    }
};
