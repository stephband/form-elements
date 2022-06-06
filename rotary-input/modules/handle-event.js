
import overload from '../../../fn/modules/overload.js';
import trigger  from '../../../dom/modules/trigger.js';

import { transform } from '../../controls/control.js';


/* Events */

/**
"input"
Sent continuously during a fader movement.
**/

function touchstart(e) {
    const target = e.target.closest('button');

    // Ignore non-ticks
    if (!target) { return; }

    const unitValue = parseFloat(target.value);
    const value = transform(this.data.law, unitValue, this.data.min, this.data.max) ;
    this.element.value = value;

    // Refocus the input (should not be needed now we have focus
    // control on parent?) and trigger input event on element
    //            shadow.querySelector('input').focus();

    // Change event on element
    trigger('input', this.element);
}

function input(e) {
    const unitValue = parseFloat(e.target.value);
    const value = transform(this.data.law, unitValue, this.data.min, this.data.max) ;
    this.element.value = value;

    // If the range has steps make sure the handle snaps into place
    if (this.data.steps) {
        e.target.value = this.data.unitValue;
    }
}

export default overload((e) => e.type, {
    'touchstart': touchstart,
    'mousedown': touchstart,
    'input': input
});
