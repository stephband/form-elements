
import Privates          from '../../../fn/modules/privates.js';
import { clamp }         from '../../../fn/modules/clamp.js';
import id                from '../../../fn/modules/id.js';
import Stream            from '../../../fn/modules/stream.js';
import get               from '../../../fn/modules/get.js';
import last              from '../../../fn/modules/last.js';
import overload          from '../../../fn/modules/overload.js';
import observe           from '../../../fn/observer/observe.js';
import { Observer }      from '../../../fn/observer/observer.js';
import create            from '../../../dom/modules/create.js';
import delegate          from '../../../dom/modules/delegate.js';
import events            from '../../../dom/modules/events.js';
import { trigger }       from '../../../dom/modules/trigger.js';
import gestures          from '../../../dom/modules/gestures.js';
import rect              from '../../../dom/modules/rect.js';
import { px }            from '../../../dom/modules/parse-length.js';

import parseValue        from '../../modules/parse-value.js';
import { updateData }    from '../../modules/data.js';
import { normalise, denormalise } from '../../modules/scales.js';
import { toDisplay }     from '../../modules/display.js';
import { nearestStep }   from '../../modules/step.js';
import { maxTapDuration, maxDoubleTapDuration } from '../../modules/constants.js';
import * as defaults     from '../../modules/defaults.js';

import { setFormValue }  from './form.js';



/* Streams */

function stop(stream) {
    stream.stop();
}

function toObserver(observer, object) {
    observer && observer.stop();
    return observe('.', object);
}


/* Coordinates */

/**
"input"
Emitted from the element during the movement of an xy handle.
**/

/**
"change"
Emitted from the element when an xy handle has been moved.
**/

function updateBoxes(track, computed, pxbox, paddingbox, contentbox, rangebox) {
    const box           = rect(track);
    const fontsize      = px(computed['font-size']);
    const borderTop     = px(computed.borderTopWidth) || 0;
    const borderBottom  = px(computed.borderBottomWidth) || 0;
    const paddingTop    = px(computed.paddingTop) || 0;
    const paddingBottom = px(computed.paddingBottom) || 0;

    pxbox.y      = box.y + borderTop + paddingTop;
    pxbox.height = box.height - borderTop - paddingTop - borderBottom - paddingBottom;

    paddingbox.y      = 0;
    paddingbox.height = box.height - borderTop - borderBottom;

    contentbox.y      = paddingTop;
    contentbox.height = box.height - borderTop - paddingTop - borderBottom - paddingBottom;

    // rangebox is contentbox in ems with reversed y axis (+ve is up). All a bit
    // confusing and ought to be cleaned up
    rangebox.y = (0 - paddingBottom - borderBottom) / fontsize;
    rangebox.height = -contentbox.height / fontsize;

    return box;
}

function updateViewbox(track, style, computed, svg, data) {
    // Make sure that automatic height of SVG does not affect measurements
    svg.style.width = '';
    svg.style.height = '0';

    data.box = updateBoxes(track, computed, data.pxbox, data.paddingbox, data.contentbox, data.rangebox);

    style.setProperty('--range-y',      data.rangebox.y);
    style.setProperty('--range-height', data.rangebox.height);

    svg.setAttribute('viewBox', 0 + ' '
        + (data.rangebox.y + data.rangebox.height) + ' '
        + 1 + ' '
        + (-data.rangebox.height)
    );

    svg.style.width = '1em';
    svg.style.height = -data.rangebox.height + 'em';
}

function setXY(e, data) {
    const box      = data.pxbox;
    const valuebox = data.valuebox;

    // New pixel position of control, compensating for initial
    // mousedown offset on the control
    const py = box.height - (e.clientY - box.y - data.offset.y);

    // Normalise to 0-1, allowing x position to extend beyond viewbox
    data.y = clamp(valuebox.y, valuebox.y + valuebox.height, denormalise(valuebox.y, valuebox.y + valuebox.height, py / box.height));
}

const toCoordinates = overload((data, e) => e.type, {
    'pointerdown': (data, e) => {
        data.target = e.target;
        data.time   = e.timeStamp / 1000;

        // If it's within maxDoubleTapDuration of the previous gesture,
        // it's a double tap
        if (data.previous
            && data.previous.type === 'tap'
            && data.time - data.previous.time < maxDoubleTapDuration
        ) {
            data.type   = 'double-tap';
            data.target = data.previous.target;
        }

        const controlBox = rect(e.target);
        data.offset = e.target === e.currentTarget ? {
            // Target is the SVG
            //x: 0,
            y: 0
        } : {
            // Target is an object in the SVG
            //x: e.clientX - (controlBox.x + controlBox.width / 2),
            y: e.clientY - (controlBox.y + controlBox.height / 2)
        } ;

        data.events.length = 0;
        data.events.push(e);

        return data;
    },

    'pointermove': (data, e) => {
        data.events.push(e);
        const e0 = data.events[0];

        // If the duration is too short or the mouse has not travelled far
        // enough it is too early to call this a move gesture
        if ((e.timeStamp - e0.timeStamp) < maxTapDuration
            //&& (e.clientX - e0.clientX) < 4
            && (e.clientY - e0.clientY) < 4) {
            return data;
        }

        data.type = 'move';
        setXY(e, data);

        return data;
    },

    'default': (data, e) => {
        data.events.push(e);
        data.duration = e.timeStamp / 1000 - data.time;

        // If the gesture does not yet have a type, check whether duration is
        // short and call it a tap
        if (!data.type && (data.duration < maxTapDuration)) {
            data.type = 'tap';
        }

        return data;
    }
});

const handle = delegate({
    '.control-handle': overload((target, data) => data.type, {
        'double-tap': function(element, data) {
            // TODO: return to 0
            return data;
        },

        'move': function(target, data) {
            const { internals, formdata, events, host, value, y } = data;
            const index = target.dataset.index;

            // Render is handled by observers
            const point = Observer(value[index]);
            point.value = y;

            if (last(events).type !== 'pointermove') {
                // internal, formdata, name, value
                setFormValue(internals, formdata, host.name, value);
                trigger('change', host);
            }
            else {
                trigger('input', host);
            }

            return data;
        },

        default: function(data) {
            console.log('Untyped gesture', data);
        }
    })
});


/* Rendering */

function renderTick(buttons, tick, axis) {
    buttons.push(
        create('label', {
            part:  axis + '-tick tick',
            style: '--normal-' + axis + ': ' + tick.normalValue + ';',
            html:  '<span>' + tick.label + '</span>'
        })
    );

    return buttons;
}

function updateHandle(handle, rangebox, scale, min, max, point, index) {
    handle.setAttribute('transform', 'translate('
        + 0.5
        + ' '
        + denormalise(rangebox.y, rangebox.y + rangebox.height, scale.normalise(min, max, point.value))
        + ')'
    );

    handle.firstElementChild.innerHTML = (point.label ? (point.label + ' ') : '')
        + point.value;

    handle.dataset.index = index;
}

function renderHandle(rangebox, scale, min, max, point, index) {
    return create('path', {
        part:  'handle',
        class: 'control control-handle control-point',
        // FF is a little sensitive about where commas occur, let's not use any
        d:     'M 0 0 m -0.5 0 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0',
        tabindex: '0',

        // Position it
        transform: 'translate('
            + 0.5
            + ' '
            + denormalise(rangebox.y, rangebox.y + rangebox.height, scale.normalise(min, max, point.value))
            + ')',

        // Hover tooltip contains "label x, y"
        html: '<title>'
            + (point.label ? (point.label + ' ') : '')
            + point.value
            + '</title>',

        // Keep a track of which point this path is from
        data:  { index: index }
    });
}

function renderHandles(handles, svg, rangebox, axis, points) {
    let n = -1;
    let point, handle;

    // Update or add handles for all points
    while(point = points[++n]) {
        if (handles[n]) {
            handle = handles[n];
            updateHandle(handle, rangebox, axis.scale, axis.min, axis.max, point, n);
        }
        else {
            handle = renderHandle(rangebox, axis.scale, axis.min, axis.max, point, n);
            handles.push(handle);
            svg.append(handle);
        }
    }

    // Remove any leftover handles
    --n;
    while(handle = handles[++n]) {
        handle.remove();
    }
}

function renderData(axis, style, scale, min, max, ticks, buttons, marker) {
    // Style
    style.setProperty('--' + axis + '-normal-zero', scale.normalise(min, max, 0));

    // Ticks
    buttons.forEach((node) => node.remove());
    buttons.length = 0;
    buttons = ticks.reduce((buttons, tick) => renderTick(buttons, tick, axis), buttons);
    marker.after.apply(marker, buttons);
}

function updateOutput(output, point) {
    output.value = point.value.toPrecision(3);
}

/* Element */

export default {
    mode: 'closed',
    focusable: true,

    construct: function(shadow, internals) {
        // DOM
        const style   = create('style', ':host {} :host > * { visibility: hidden; }');
        const label   = create('label', { for: 'input', part: 'label', html: '<slot></slot>' });
        const track   = create('div',   { part: 'track' });
        const svg     = create('svg');
        const marker  = create('text', '');
        const output  = create('output', { for: 'number', part: 'output' });
        const input   = create('input', { type: 'number', id: 'number' });
        const ticks   = [];
        const handles = [];

        track.append(svg);
        output.append(input);
        shadow.append(style, label, track, marker, output);

        // Components
        const privates   = Privates(this);
        const data       = { value: [] };
        const computed   = getComputedStyle(track);
        const hostStyle  = style.sheet.cssRules[0].style;
        const childStyle = style.sheet.cssRules[1].style;
        const formdata   = new FormData();

        privates.host       = this;
        privates.hostStyle  = hostStyle;
        privates.childStyle = childStyle;
        privates.internals  = internals;
        privates.data       = data;
        privates.formdata   = formdata;
        privates.shadow     = new Promise((resolve) => privates.load = resolve);

        privates.pxbox      = {};
        privates.paddingbox = {};
        privates.contentbox = {};
        privates.rangebox   = { y: 6.75, width: 6.75 };
        privates.valuebox   = { y: 0,    width: 1 };

        privates.scale      = Stream.of(defaults.scale);
        privates.min        = Stream.of(defaults.min);
        privates.max        = Stream.of(defaults.max);
        privates.step       = Stream.of(defaults.step);
        privates.ticks      = Stream.of(null);
        privates.display    = Stream.of(defaults.display);
        privates.values     = Stream.of([{ value: 0 }]);

        const resizes = Stream
        .merge(privates.shadow, events('resize', window))
        .broadcast();

        resizes.each(() =>
            updateViewbox(track, hostStyle, computed, svg, privates)
        );

        const axis = Stream.combine({
            shadow:  privates.shadow,
            scale:   privates.scale,
            min:     privates.min,
            max:     privates.max,
            ticks:   privates.ticks,
            step:    privates.step,
            display: privates.display
        })
        .scan(updateData, {})
        .broadcast();

        axis.each((data) => {
            privates.valuebox.y      = data.min;
            privates.valuebox.height = data.max - data.min;
        });

        // Render DOM
        axis
        .each((data) => renderData('y', hostStyle, data.scale, data.min, data.max, data.ticks, ticks, marker));

        // Track value and mutations of value
        const values = privates.values
        .scan(toObserver, null)
        .flatMap(id)
        .broadcast();

        values.each((value) => privates.value = value);

        // Render canvas
        Stream
        .combine({
            axis,
            resizes,
            value: values
        })
        .each((state) => {
            privates.state = state;
            renderHandles(handles, svg, privates.rangebox, state.axis, state.value);
            updateOutput(output, state.value[0]);
        });

        // Track mutations to points inside value
        privates.valueObservers = values.reduce((observers, value) => {
            // Stop previous observers
            observers.forEach(stop);

            // Register new observers for each point in value
            observers.push.apply(observers, value.map((point, index, points) =>
                observe('.', point, point).each((point) => {
                    const handle = svg.querySelectorAll('[part=handle]')[index];
                    updateHandle(handle, privates.rangebox, privates.state.axis.scale, privates.state.axis.min, privates.state.axis.max, point, index);
                    updateOutput(output, point);
                })
            ));

            // Render initial value to output
            updateOutput(output, value[0]);

            return observers;
        }, []);

        // Track gestures on handles
        gestures({ select: '[part=handle]', threshold: 1 }, shadow)
        .each((gesture) => {
            // Update boxes - we don't know the current scrolling position
            updateBoxes(track, computed, privates.pxbox, privates.paddingbox, privates.contentbox, privates.rangebox);

            gesture
            .scan(toCoordinates, {
                handles,
                internals,
                host:       this,
                track,
                pxbox:      privates.pxbox,
                valuebox:   privates.valuebox,
                formdata:   privates.formdata,
                value:      privates.state.value,
                events:     []
            })
            .filter(get('type'))
            .each(handle);

            this.focus();
        });

        // On double click focus the number input
        events('pointerup', output)
        .reduce((e1, e2) => {
            if (e1 && (e2.timeStamp - e1.timeStamp < 800)) {
                // Double tap!
                input.focus();
                return;
            }

            return e2;
        });
    },

    load: function(shadow) {
        const privates = Privates(this);
        privates.childStyle.visibility = '';
        privates.load(shadow);
    }
};
