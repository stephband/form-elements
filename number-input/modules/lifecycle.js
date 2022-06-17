
import Privates  from '../../../fn/modules/privates.js';
import Stream    from '../../../fn/modules/stream/stream.js';
import { clamp } from '../../../fn/modules/clamp.js';
import get       from '../../../fn/modules/get.js';
import noop      from '../../../fn/modules/noop.js';
import overload  from '../../../fn/modules/overload.js';
import create    from '../../../dom/modules/create.js';
import delegate  from '../../../dom/modules/delegate.js';
import events, { isPrimaryButton } from '../../../dom/modules/events.js';


export const toKeyValue = overload(get('keyCode'), {
    // Up arrow
    38: (e, min, max, step, value) => {
        // If we don't preventDefault the browser scrolls
        e.preventDefault();

        // Move in big increments if the shift key is down
        const increment = step ?
            e.shiftKey ? 5 * step : step :
            e.shiftKey ? 0.05 * (max - min) : 0.01 * (max - min) ;

        return clamp(min, max, value + increment);
    },

    // Down arrow
    40: (e, min, max, step, value) => {
        // If we don't preventDefault the browser scrolls
        e.preventDefault();

        // Move in big increments if the shift key is down
        const increment = step ?
            e.shiftKey ? -5 * step : -1 * step :
            e.shiftKey ? -0.05 * (max - min) : -0.01 * (max - min) ;

        return clamp(min, max, value + increment);
    },

    // Other keys
    default: noop
})


/*
Lifecycle
*/

function incrementValue(host, internal, e, input, increment) {
    const value     = parseFloat(input.value || 0);
    const min       = parseFloat(input.min);
    const max       = parseFloat(input.max);
    const step      = parseFloat(input.step);

    input.value = clamp(min, max, value + (step ?
        increment * step :
        increment
    ));

    // Prevent input text being selected
    e.preventDefault();

    // Unfortunately that also prevents focus on host
    host.focus();

    // Set form
    internal.setFormValue(input.value);
}

export default {
    mode: 'closed',

    focusable: true,

    construct: function(shadow, internal) {
        // DOM

        /**
        [slot="decrement-button"]
        **/

        /**
        [slot="increment-button"]
        **/

        const style     = create('style', ':host > * { visibility: hidden; }');
        const input     = create('input',  { type: 'number', part: 'input', name: 'value', min: '0', max: '1', step: 'any', value: 0 });
        const decrement = create('button', { type: 'button', part: 'decrement-button', name: 'decrement', value: '-1', html: '<slot name="decrement-button">-</slot>' });
        const increment = create('button', { type: 'button', part: 'increment-button', name: 'increment', value: '1', html: '<slot name="increment-button">+</slot>' });

        shadow.append(style, input, decrement, increment);

        // Components
        const privates   = Privates(this);
        const childStyle = style.sheet.cssRules[0].style;

        privates.host       = this;
        privates.shadow     = shadow;
        privates.childStyle = childStyle;
        privates.internal   = internal;
        privates.input      = input;

        // TODO: we must convert value to stream so that we can setFormValue
        // on internals whenever one comes in!
        privates.value      = Stream.of(0);

        // Decrement and increment buttons
        events('pointerdown', shadow)
        .filter(isPrimaryButton)
        .each(delegate({
            '[type="button"]':           (element, e) => incrementValue(this, internal, e, input, parseFloat(element.value) *  (parseFloat(input.step) || 1)),
            '[slot="decrement-button"]': (element, e) => incrementValue(this, internal, e, input, -1 * (parseFloat(input.step) || 1)),
            '[slot="increment-button"]': (element, e) => incrementValue(this, internal, e, input, parseFloat(input.step) || 1)
        }));

        // Keep value between min < value < max
        events({ type: 'input', select: '[type="number"]' }, shadow)
        .each((e) => {
            const value = parseFloat(input.value || 0);
            const min   = parseFloat(input.min);
            const max   = parseFloat(input.max);

            if (value < min || value > max) {
                input.value = clamp(min, max, value);
            }

            // Todo: constrain value to step
        });

        // While this is focused allow up and down arrows to change value
        events('keydown', this)
        .filter(() => document.activeElement === this || this.contains(document.activeElement))
        .map((e) => toKeyValue(e, parseFloat(input.min), parseFloat(input.max), parseFloat(input.step), parseFloat(input.value)))
        .each((value) =>
            // Attempt to avoid rounding errors
            input.value =
                Math.abs(value) < 0.1 ? value.toPrecision(1) :
                Math.abs(value) < 10  ? value.toPrecision(2) :
                Math.round(value)
        );
    },

    load: function(shadow) {
        const privates = Privates(this);
        privates.childStyle.visibility = '';
    }
};
