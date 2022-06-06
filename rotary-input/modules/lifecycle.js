
/*
The CSS that makes this web component flexible may look a little funky. The
width of the component dictates the size of the handle, track and tick radius,
then those elements push the (automatic) height of the component. The ticks are
normally layed out vertically before being transformed. They are usually the
tallest element. If there are no ticks the component will collapse a bit
smaller.
*/

import overload      from '../../../fn/modules/overload.js';
import Privates      from '../../../fn/modules/privates.js';
import { clamp }     from '../../../fn/modules/clamp.js';
import create        from '../../../dom/modules/create.js';
import { transform } from '../../controls/control.js';
import gestures      from '../../../dom/modules/gestures.js';
import parseValue    from '../../../dom/modules/parse-length.js';
import trigger       from '../../../dom/modules/trigger.js';
import handleEvent   from '../../modules/handle-event.js';

const assign = Object.assign;

const defaults = {
    law: 'linear',
    min: 0,
    max: 1
};


/* Shadow */

function createTemplate(elem, shadow, internals) {
    const style  = create('style', ':host {}');
    const label  = create('label', { for: 'input', part: 'label', html: '<slot></slot>' });
    const handle = create('div', { class: 'handle' });
    const text   = create('text');
    const abbr   = create('abbr');
    const output = create('output', { children: [text, abbr], part: 'output' });
    const marker = create('text', '') ;

    shadow.appendChild(style);
    shadow.appendChild(label);
    shadow.appendChild(handle);
    shadow.appendChild(output);
    shadow.appendChild(marker);

    // Get the :host {} style rule from style
    const css = style.sheet.cssRules[0].style;

    return {
        'unitValue': function(unitValue) {
            css.setProperty('--unit-value', unitValue);
        },

        'unitZero': function(unitZero) {
            css.setProperty('--unit-zero', unitZero);
        },

        'displayValue': function(displayValue) {
            text.textContent = displayValue;
            css.setProperty('--display-value', displayValue);
        },

        'displayUnit': function(displayUnit) {
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
        },

        'ticks': (function(buttons) {
            return function(scopes) {
                // Clear out existing ticks
                buttons.forEach((node) => node.remove());
                buttons.length = 0;

                // Create new ticks and put them in the dom
                scopes.forEach(function(scope) {
                    const span = create('span', {
                        text: scope.displayValue,
                        style: 'transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, calc(-1 * (var(--rotation-start) + ' + scope.unitValue + ' * var(--rotation-range)))) translate3d(calc(' + Math.sin(scope.unitValue * 6.28318531) + ' * -33%), 0, 0);'
                    });

                    const button = create('button', {
                        type: 'button',
                        name: 'unit-value',
                        value: scope.unitValue,
                        style: '--unit-value: ' + scope.unitValue + ';',
                        children: [span],
                        part: 'tick'
                    });

                    marker.before(button);
                    buttons.push(button);
                });
            };
        })([])
    };
}


/* Events */

const toValueUpdates = overload((pointer, e) => e.type, {
    'pointerdown': (data, e) => ({
        host: data.host,
        law:  data.law,
        min:  data.min,
        max:  data.max,
        e0:   e,
        y0:   e.clientY,
        y:    data.unitValue,
        touchRange: parseValue(data.style.getPropertyValue('--touch-range'))
    }),

    default: (scope, e) => {
        const { host, law, min, max, y, y0, touchRange } = scope;
        const dy        = y0 - e.clientY;
        const unitValue = clamp(0, 1, y + dy / touchRange);
        const value     = transform(law, unitValue, min, max) ;

        host.value = value;
        trigger('input', host);
        return scope;
    }
});

export default {
    mode:       'closed',
    focusable:  true,
    construct: function(shadow, internals) {
        const privates = Privates(this);
        const data     = privates.data  = assign({}, defaults);

        data.host  = this;
        data.style = getComputedStyle(this);

        privates.scope       = createTemplate(this, shadow);
        privates.element     = this;
        privates.shadow      = shadow;
        privates.internals   = internals;
        privates.handleEvent = handleEvent;

        shadow.addEventListener('mousedown', privates);

        gestures({ threshold: 1, select: 'div' }, shadow)
        .each((events) => events.reduce(toValueUpdates, data));
    },

    connect: function(shadow) {
        const privates = Privates(this);
        const data     = privates.data;

        // Rotary control must have value
        if (data.value === undefined) {
            this.value = clamp(data.min, data.max, 0);
        }
    }
};
