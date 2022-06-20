
import Privates  from '../../../fn/modules/privates.js';
import { clamp } from '../../../fn/modules/clamp.js';
import get       from '../../../fn/modules/get.js';
import noop      from '../../../fn/modules/noop.js';
import overload  from '../../../fn/modules/overload.js';
import create    from '../../../dom/modules/create.js';
import delegate  from '../../../dom/modules/delegate.js';
import events, { isPrimaryButton } from '../../../dom/modules/events.js';


function getIncrement(min, max, step, shift) {
    return step ?
        // Move in big increments if the shift key is down
        shift ? 5 * step : step :
        shift ? 0.05 * (max - min) : 0.01 * (max - min) ;
}

export const toKeyValue = overload(get('keyCode'), {
    // Up arrow
    38: (e, min, max, step, value) => {
        // If we don't preventDefault the browser scrolls
        e.preventDefault();

        return (typeof min === 'number' && typeof max === 'number') ?
            clamp(min, max, value + getIncrement(min, max, step, e.shiftKey)) :
            value + 1 ;
    },

    // Down arrow
    40: (e, min, max, step, value) => {
        // If we don't preventDefault the browser scrolls
        e.preventDefault();

        return (typeof min === 'number' && typeof max === 'number') ?
            clamp(min, max, value - getIncrement(min, max, step, e.shiftKey)) :
            value - 1 ;
    },

    // Other keys
    default: noop
});


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
    input.focus();
}

export default {
    mode: 'closed',

    //focusable: true,

    construct: function(shadow, internal) {

        /**
        [slot="decrement-button"]
        **/

        /**
        [slot="increment-button"]
        **/

        const style     = create('style', ':host > * { visibility: hidden; }');
        const slot      = create('slot');
        const decrement = create('button', { type: 'button', part: 'decrement-button', name: 'decrement', value: '-1', html: '<slot name="decrement-button">-</slot>' });
        const increment = create('button', { type: 'button', part: 'increment-button', name: 'increment', value: '1', html: '<slot name="increment-button">+</slot>' });

        shadow.append(style, slot, decrement, increment);

        // Components
        const privates      = Privates(this);
        privates.childStyle = style.sheet.cssRules[0].style;

        // Where <increment-control> wraps an input, we enhance that with our
        // decrement/increment logic, otherwise we use the internal input.
        // Todo: maybe we should just get rid of the internal input and treat
        // this custom element as a wrapper, it would simplify everything - no
        // need to setFormValue or any of that malarky
        events('slotchange', slot)
        .each((e) => {
            const input = this.querySelector('[type="number"], [type="range"]');
            privates.input = input;

            if (!input.value) {
                input.value = clamp(
                    input.min ? parseFloat(input.min) : -Infinity,
                    input.max ? parseFloat(input.max) :  Infinity,
                    0
                );
            }
        });

        // Decrement and increment buttons
        events('pointerdown', shadow)
        .filter(isPrimaryButton)
        .each(delegate({
            '[type="button"]':           (element, e) => incrementValue(this, internal, e, privates.input, parseFloat(element.value) *  (parseFloat(privates.input.step) || 1)),
            '[slot="decrement-button"]': (element, e) => incrementValue(this, internal, e, privates.input, -1 * (parseFloat(privates.input.step) || 1)),
            '[slot="increment-button"]': (element, e) => incrementValue(this, internal, e, privates.input, parseFloat(privates.input.step) || 1)
        }));

        // Keep value between min < value < max
        events({ type: 'input', select: '[type="number"]' }, shadow)
        .each((e) => {
            const value = parseFloat(privates.input.value || 0);
            const min   = parseFloat(privates.input.min);
            const max   = parseFloat(privates.input.max);

            if (value < min || value > max) {
                privates.input.value = clamp(min, max, value);
            }

            // Todo: constrain value to step
        });

        // While this is focused allow up and down arrows to change value
        events('keydown', this)
        .filter(() => document.activeElement === this || document.activeElement === privates.input || this.contains(document.activeElement))
        .map((e) => toKeyValue(
            e,
            privates.input.min && parseFloat(privates.input.min),
            privates.input.max && parseFloat(privates.input.max),
            parseFloat(privates.input.step),
            parseFloat(privates.input.value)
        ))
        .each((value) =>
            // Attempt to avoid rounding errors
            privates.input.value =
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
