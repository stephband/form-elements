
/*

*/

import Privates        from '../../../fn/modules/privates.js';
import Stream          from '../../../fn/modules/stream.js';
import create          from '../../../dom/modules/create.js';
import events          from '../../../dom/modules/events.js';
import * as defaults   from '../../modules/defaults.js';


/*
Lifecycle
*/

export default {
    mode: 'closed',

    focusable: true,

    construct: function(shadow, internals) {
        // DOM
        const style     = create('style', ':host {} :host > * { visibility: hidden; }');
        const input     = create('input', { type: 'number', name: 'value', min: '0', max: '1', step: 'any' });
        const decrement = create('button', { type: 'button', name: 'increment', value: '-1', html: '<slot name="decrement-button">-</slot>' });
        const increment = create('button', { type: 'button', name: 'increment', value: '1', html: '<slot name="increment-button">+</slot>' });

        shadow.append(style, input, decrement, increment);

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
        privates.min       = Stream.of(defaults.min);
        privates.max       = Stream.of(defaults.max);
        privates.step      = Stream.of(defaults.step);
        privates.value     = Stream.of(defaults.value);

        events({ type: 'pointerdown', select: '[name="increment"]' }, shadow)
        .each((e) => {
            const button = e.selectedTarget;
            console.log('TING', e.target, input.value, button.value);
            input.value = parseFloat(input.value || 0) + parseFloat(button.value);
        });
    },

    load: function(shadow) {
        const privates = Privates(this);
        privates.childStyle.visibility = '';
        privates.load(shadow);
    }
};
