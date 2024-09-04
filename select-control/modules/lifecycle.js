
import Privates        from 'fn/privates.js';
import { clamp }       from 'fn/clamp.js';
import get             from 'fn/get.js';
import noop            from 'fn/noop.js';
import overload        from 'fn/overload.js';
import create          from '../../../dom/modules/create.js';
import delegate        from '../../../dom/modules/delegate.js';
import events          from '../../../dom/modules/events.js';
import isPrimaryButton from '../../../dom/modules/is-primary-button.js';
import trigger         from '../../../dom/modules/trigger.js';


const keyValues = {
    37: -1, // Left arrow
    38: 1,  // Up arrow
    39: 1,  // Right arrow
    40: -1  // Down arrow
};


/*
Lifecycle
*/

function incrementValue(host, internal, e, select, increment) {
    const option  = select.selectedOptions[0];
    const options = Array.from(select.querySelectorAll('option'));
    const i       = options.indexOf(option);
    const j       = clamp(0, options.length - 1, i + increment);
    const next    = options[j];

    if (next === option) { return; }

    // Set select value, which should select the correct option
    select.value = next.value;

    // Prevent select text being selected
    //e.preventDefault();

    // Unfortunately that also prevents focus on host
    //select.focus();

    // Send select and change events
    trigger('select', select);
    trigger('change', select);
}

export default {
    mode: 'closed',

    construct: function(shadow, internal) {

        /**
        [slot="previous-button"]
        **/

        /**
        [slot="next-button"]
        **/

        const style = create('style', ':host > * { visibility: hidden; }');
        const slot  = create('slot');
        const prev  = create('button', { type: 'button', part: 'previous-button', name: 'increment', value: '-1', html: '<slot name="previous-button">◀</slot>' });
        const next  = create('button', { type: 'button', part: 'next-button', name: 'increment', value: '1', html: '<slot name="next-button">▶</slot>' });
        shadow.append(style, slot, prev, next);

        // Components
        const privates      = Privates(this);
        privates.childStyle = style.sheet.cssRules[0].style;

        // Where <select-control> wraps an select, we enhance that with our
        // previous/next logic, otherwise we use the internal input.
        // Todo: maybe we should just get rid of the internal input and treat
        // this custom element as a wrapper, it would simplify everything - no
        // need to setFormValue or any of that malarky
        events('slotchange', slot)
        .each((e) => privates.select = this.querySelector('select'));

        // Previous and next buttons
        events('pointerdown', shadow)
        .filter(isPrimaryButton)
        .each(delegate({
            '[type="button"]':          (element, e) => incrementValue(this, internal, e, privates.select, parseFloat(element.value)),
            '[slot="previous-button"]': (element, e) => incrementValue(this, internal, e, privates.select, -1),
            '[slot="next-button"]':     (element, e) => incrementValue(this, internal, e, privates.select, 1)
        }));

        // While this is focused allow up and down arrows to change value
        events('keydown', this)
        .filter(() => document.activeElement === this || document.activeElement === privates.select || this.contains(document.activeElement))
        .each((e) => keyValues[e.keyCode] && incrementValue(this, internal, e, privates.select, keyValues[e.keyCode]));
    },

    load: function(shadow) {
        const privates = Privates(this);
        privates.childStyle.visibility = '';
    }
};
