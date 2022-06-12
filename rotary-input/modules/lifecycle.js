
/*
The CSS that makes this web component flexible may look a little funky. The
width of the component dictates the size of the handle, track and tick radius,
then those elements push the (automatic) height of the component. The ticks are
normally layed out vertically before being transformed. They are usually the
tallest element. If there are no ticks the component will collapse a bit
smaller.
*/

import get           from '../../../fn/modules/get.js';
import noop          from '../../../fn/modules/noop.js';
import overload      from '../../../fn/modules/overload.js';
import Privates      from '../../../fn/modules/privates.js';
import { clamp }     from '../../../fn/modules/clamp.js';
import Stream        from '../../../fn/modules/stream.js';
import create        from '../../../dom/modules/create.js';
import events        from '../../../dom/modules/events.js';
import gestures      from '../../../dom/modules/gestures.js';
import trigger       from '../../../dom/modules/trigger.js';
import parseLength   from '../../../dom/modules/parse-length.js';
import parseValue    from '../../modules/parse-value.js';
import parseTicks    from '../../modules/parse-ticks.js';
import { normalise, denormalise } from '../../modules/normalise.js';
import { nearestStep, previousStep, nextStep } from './step.js';
import displayValue  from '../../modules/display-value.js';


const defaults = {
    law:   'linear',
    min:   0,
    max:   1,
    ticks: '',
    step:  'any',
    value: 0
};

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
        y:     data.unitValue,
        value: data.value,
        touchRange: parseLength(getComputedStyle(e.target).getPropertyValue('--touch-range'))
    }),

    default: (data, e) => {
        const { law, min, max, y, y0, touchRange } = data;
        const dy        = y0 - e.clientY;
        const unitValue = clamp(0, 1, y + dy / touchRange);
        const value     = denormalise(law, min, max, unitValue) ;
        data.value = value;
        return data;
    }
});

const toKeyValue = overload(get('keyCode'), {
    // Up arrow
    38: (e, law, min, max, steps, unitValue) => {
        // If we don't preventDefault the browser scrolls
        e.preventDefault();

        // Move in steps
        if (steps) {
            const step = nextStep(steps, unitValue);
            return step.value;
        }

        // Move in big increments if the shift key is down
        const diff = e.shiftKey ? 10 : 1 ;
        return denormalise(law, min, max, (Math.round(100 * unitValue) + diff) * 0.01);
    },
    // Down arrow
    40: (e, law, min, max, steps, unitValue) => {
        // If we don't preventDefault the browser scrolls
        e.preventDefault();

        // Move in steps
        if (steps) {
            const step = previousStep(steps, unitValue);
            return step.value;
        }

        // Move in big increments if the shift key is down
        const diff = e.shiftKey ? 10 : 1 ;
        return denormalise(law, min, max, (Math.round(100 * unitValue) - diff) * 0.01);
    },

    // Other keys
    default: noop
});


/* Update models */

function assignUnitValue(object, law, min,max) {
    object.unitValue = normalise(law, min, max, object.value);
    return object;
}

function update(data, law, min, max, ticks, step) {
    // Law
    data.law   = law;
    data.min   = min;
    data.max   = max;
    data.ticks = ticks
        // Filter to ticks within range min-max
        .filter((tick) => tick.value >= data.min && tick.value <= data.max)
        .map((tick) => assignUnitValue(tick, law, min, max));

    data.step =
        step === 'any' ? undefined :
        step === 'ticks' ? data.ticks :
        parseTicks(step)
        .filter((step) => step.value >= data.min && step.value <= data.max)
        .map((step) => assignUnitValue(step, law, min, max)) ;

    return data;
}

function updateValue(data, law, min, max, value) {
    //if (value === data.value) { console.log('REPEAT VALUE SET - ARE WE BOTHERED?', value); }
    data.value     = clamp(min, max, value);
    data.unitValue = normalise(law, min, max, data.value);

    // Round to nearest step
    if (data.step) {
        // We find the nearest visually by getting nearest to unitValue
        const step = nearestStep(data.step, data.unitValue);
        data.value     = step.value;
        data.unitValue = step.unitValue;
    }

    return data;

    // TODO: Should all these really be here?
    //data.displayValue = transformOutput(data.unit, value);
    //data.displayUnit  = transformUnit(data.unit, value);
    //data.unitValue    = unitValue;
}


/* Render to DOM */

function renderValue(style, internals, unit, value, unitValue) {
    internals.setFormValue(value);
    style.setProperty('--display-value', displayValue(unit, value));
    //style.setProperty('--display-unit',  data.displayUnit);
    style.setProperty('--unit-value', unitValue);
}

function renderTick(buttons, tick) {
    buttons.push(
        create('button', {
            type: 'button',
            part: 'tick',
            name: 'value',
            value: tick.value,
            style: '--unit-value: ' + tick.unitValue + ';',
            children: [
                create('span', {
                    text: tick.label,
                    style: 'transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, calc(-1 * (var(--rotation-start) + ' + tick.unitValue + ' * var(--rotation-range)))) translate3d(calc(' + Math.sin(tick.unitValue * 6.28318531) + ' * -33%), 0, 0);'
                })
            ]
        })
    );

    return buttons;
}

function renderUnit(displayUnit) {
    // Add and remove output > abbr
    if (displayUnit) {
        if (!abbr.parentNode) {
            output.appendChild(abbr);
        }

        // Update abbr text
        abbr.textContent = displayUnit;
    }
    else if (abbr.parentNode) {
        abbr.remove();
    }
}

function render(style, law, min, max, ticks, buttons, marker) {
    // Style
    style.setProperty('--unit-zero', normalise(law, min, max, 0));

    // Ticks
    buttons.forEach((node) => node.remove());
    buttons.length = 0;
    buttons = ticks.reduce(renderTick, buttons);
    marker.after.apply(marker, buttons);
}


/* Define the lifecycle */

export default {
    mode: 'closed',

    focusable: true,

    construct: function(shadow, internals) {
        // DOM
        const style   = create('style', ':host {}');
        const label   = create('label', { for: 'input', part: 'label', html: '<slot></slot>' });
        const handle  = create('div', { class: 'handle' });
        const text    = create('text');
        const abbr    = create('abbr');
        const output  = create('output', { children: [text, abbr], part: 'output' });
        const marker  = create('text', '') ;
        const buttons = [];

        shadow.append(style, label, handle, output, marker);

        // Components
        const privates = Privates(this);
        const data     = {};

        privates.host      = this;
        privates.shadow    = shadow;
        privates.style     = style.sheet.cssRules[0].style;
        privates.internals = internals;
        privates.data      = data;

        // Inputs
        privates.shadow    = new Promise((resolve) => privates.load = resolve);
        privates.law       = Stream.of(defaults.law);
        privates.min       = Stream.of(defaults.min);
        privates.max       = Stream.of(defaults.max);
        privates.step      = Stream.of(defaults.step);
        privates.ticks     = Stream.of(defaults.ticks);
        privates.value     = Stream.of(defaults.value);

        // Updates
        const pushValue = (value) => {
            privates.value.push(value);
            trigger('input', this);
        };

        // Track attribute updates
        const attributes = Stream
        .combine({
            //shadow: privates.shadow,
            law:    privates.law,
            min:    privates.min.map(parseValue),
            max:    privates.max.map(parseValue),
            ticks:  privates.ticks.map(parseTicks),
            step:   privates.step
        })
        .scan((data, state) => update(data, state.law, state.min, state.max, state.ticks, state.step), data)
        .broadcast();

        attributes
        .each((data) => render(privates.style, data.law, data.min, data.max, data.ticks, buttons, marker));

        // Track value updates
        Stream
        .combine({ data: attributes, value: privates.value })
        .scan((data, state) => updateValue(data, state.data.law, state.data.min, state.data.max, state.value), data)
        .each((data) => renderValue(privates.style, privates.internals, data.unit, data.value, data.unitValue)) ;

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
        .map((e) => toKeyValue(e, data.law, data.min, data.max, data.step, data.unitValue))
        .each(pushValue);
    },

    load: function(shadow) {
        const privates = Privates(this);
        privates.load(shadow);
    }
};
