
/*
About volume controls:
https://www.dr-lex.be/info-stuff/volumecontrols.html

Safari 14 crashes when clicking on elements with delegateFocus:
https://github.com/material-components/material-components-web-components/issues/1720
*/

import Privates        from '../../../fn/modules/privates.js';
import { clamp }       from '../../../fn/modules/clamp.js';
import Stream          from '../../../fn/modules/stream.js';
import create          from '../../../dom/modules/create.js';
import events          from '../../../dom/modules/events.js';
import { trigger }     from '../../../dom/modules/trigger.js';
import parseValue      from '../../modules/parse-value.js';
import { updateData, updateValue } from '../../modules/data.js';
import { toDisplay }   from '../../modules/display.js';
import { nearestStep } from '../../modules/step.js';
import { toKeyValue }  from '../../modules/key.js';
import * as defaults   from '../../modules/defaults.js';


const DEBUG  = true;
const assign = Object.assign;
const define = Object.defineProperties;

// Get path to dir of this module
const path   = import.meta.url.replace(/\/[^\/]*([?#].*)?$/, '/');


/*
Events
*/

function toTickValue(e) {
    const target = e.target.closest('[name="value"]');
    return parseFloat(target.value);
}


/*
Render
*/

function renderTick(buttons, tick) {
    buttons.push(create('button', {
        type: 'button',
        part: 'tick',
        name: 'value',
        value: tick.value,
        style: '--normal-value: ' + tick.normal + ';',
        text: tick.label
    }));

    return buttons;
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

function renderValue(style, input, internals, outputText, outputAbbr, unit, value, normal) {
    // Render handle position
    // TODO: Safari (of course) is not updating style consistently, set this way,
    // we may need to devise another strategy
    style.setProperty('--normal-value', normal);
    input.value = normal;

    // Render display
    const display = toDisplay(unit, value);
    outputText.textContent = display.value;
    outputAbbr.textContent = display.unit;

    // Render form data
    internals.setFormValue(value);
}


/*
Lifecycle
*/

function getHostStyle(style) {
    return style.sheet.cssRules[0].style;
}

function getChildStyle(style) {
    return style.sheet.cssRules[1].style;
}

//var n = 0;

export default {
    mode: 'closed',
    focusable: true,

    construct: function(shadow, internals) {
        // DOM
        const style   = create('style', ':host {} :host > * { visibility: hidden; }');
        const label   = create('label', { part: 'label', for: 'input', html: '<slot></slot>' });
        // TODO: For some reason in Safari, the input does not get focus, with or without tabindex
        const input   = create('input', { part: 'input', type: 'range', id: 'input', name: 'unit-value', min: '0', max: '1', step: 'any', tabindex: '0' });
        const text    = create('text');
        const abbr    = create('abbr');
        const output  = create('output', { part: 'output', children: [text, abbr] });
        const marker  = create('text', '');
        const buttons = [];

        shadow.append(style, label, input, output, marker);

        // Components
        const privates     = Privates(this);
        const data         = {};

        privates.host      = this;
        privates.shadow    = shadow;
        privates.style     = style;
        privates.internals = internals;
        privates.data      = data;
        privates.shadow    = new Promise((resolve) => privates.load = resolve);
        privates.scale     = Stream.of(defaults.scale);
        privates.min       = Stream.of(defaults.min);
        privates.max       = Stream.of(defaults.max);
        privates.step      = Stream.of(defaults.step);
        privates.ticks     = Stream.of(defaults.ticks);
        privates.display   = Stream.of(defaults.display);
        privates.value     = Stream.of(defaults.value);

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
        .each((data) => renderData(getHostStyle(style), data.scale, data.min, data.max, data.ticks, buttons, marker));

        // Track value updates
        Stream
        .combine({
            data:    attributes,
            value:   privates.value
        })
        .scan((data, state) => updateValue(data, state.data.scale, state.data.min, state.data.max, state.data.step, state.value), data)
        .each((data) => renderValue(getHostStyle(style), input, internals, text, abbr, data.display, data.value, data.normal)) ;

        // Track pointer on ticks and update value
        events({ type: 'pointerdown', select: '[name="value"]' }, shadow)
        .map(toTickValue)
        .each((value) => {
            privates.value.push(value);
            trigger('input', this);
        });

        // Track input changes
        events('input', shadow)
        .each((e) => {
            const normal = parseFloat(e.target.value);
            const value  = data.scale.denormalise(data.min, data.max, normal);
            privates.value.push(value);
        });

        // While this is focused allow up and down arrows to change value
        events('keydown', this)
        .filter(() => document.activeElement === this || this.contains(document.activeElement))
        .map((e) => toKeyValue(e, data.scale, data.min, data.max, data.step, data.normal))
        .each((value) => {
            privates.value.push(value);
            trigger('input', this);
        });
    },

    load: function(shadow) {
        //console.log('RANGE LOAD', this.nnn, document.body.contains(this));
        const privates = Privates(this);
        getChildStyle(privates.style).visibility = '';
        privates.load(shadow);
    },

    connect: function() {
        //console.log('RANGE CONNECT', this.nnn, document.body.contains(this));
    },

    disconnect: function() {
        //console.log('RANGE DISCONNECT', this.nnn, document.body.contains(this));
    }
};
