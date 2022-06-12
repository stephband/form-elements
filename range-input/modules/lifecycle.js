
/*
About volume controls:
https://www.dr-lex.be/info-stuff/volumecontrols.html

Safari 14 crashes when clicking on elements with delegateFocus:
https://github.com/material-components/material-components-web-components/issues/1720
*/

import Privates    from '../../../fn/modules/privates.js';
import { clamp }   from '../../../fn/modules/clamp.js';
import overload    from '../../../fn/modules/overload.js';
import create      from '../../../dom/modules/create.js';
import element     from '../../../dom/modules/element.js';
import handleEvent from '../../controls/handle-event.js';

const DEBUG = true;

const assign = Object.assign;
const define = Object.defineProperties;

// Get path to dir of this module
const path   = import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/');

const defaults = {
    law: 'linear',
    min: 0,
    max: 1
};


/* Shadow */

function createTemplate(elem, shadow) {
    const link   = create('link',  { rel: 'stylesheet', href: path + 'module.css' });
    const style  = create('style', ':host {}');
    const label  = create('label', { for: 'input', html: '<slot></slot>', part: 'label' });
    const input  = create('input', { type: 'range', id: 'input', name: 'unit-value', min: '0', max: '1', step: 'any' });
    const text   = create('text');
    const abbr   = create('abbr');
    const output = create('output', { children: [text, abbr], part: 'output' });
    const marker = create('text', '');

    shadow.appendChild(link);
    shadow.appendChild(style);
    shadow.appendChild(label);
    shadow.appendChild(input);
    shadow.appendChild(output);
    shadow.appendChild(marker);

    // Get the :host {} style rule from style
    const css = style.sheet.cssRules[0].style;

    return {
        'unitValue': function(unitValue) {
            if (input.value !== unitValue + '') {
                input.value = unitValue + '';
            }

            css.setProperty('--normal-value', unitValue);
        },

        'normalZero': function(normalZero) {
            css.setProperty('--normal-zero', normalZero);
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
                    const button = create('button', {
                        type: 'button',
                        name: 'unit-value',
                        value: scope.unitValue,
                        style: '--tick-value: ' + scope.unitValue + ';',
                        text: scope.displayValue,
                        part: 'tick'
                    });

                    marker.before(button);
                    buttons.push(button);
                });
            };
        })([])
    };
}

/* Element */

export default {
    mode:       'closed',
    focusable:  true,

    construct: function(shadow, internals) {
        // Setup internal data store `privates`
        const privates = Privates(this);
        const data     = privates.data  = assign({}, defaults);

        privates.scope       = createTemplate(this, shadow);
        privates.element     = this;
        privates.shadow      = shadow;
        privates.internals   = internals;
        privates.handleEvent = handleEvent;

        // Listen to touches on ticks
        shadow.addEventListener('mousedown', privates);
        shadow.addEventListener('touchstart', privates);

        // Listen to range input
        shadow.addEventListener('input', privates);
    },

    connect: function(shadow) {
        const privates = Privates(this);
        const data     = privates.data;

        // Range control must have value
        if (data.value === undefined) {
            this.value = clamp(data.min, data.max, 0);
        }
    }
};
