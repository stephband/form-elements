
import Privates           from 'fn/privates.js';
import clamp              from 'fn/clamp.js';
import id                 from 'fn/id.js';
import Stream             from 'fn/stream.js';
import get                from 'fn/get.js';
import last               from 'fn/last.js';
import normalise          from 'fn/normalise.js';
import denormalise        from 'fn/denormalise.js';
import overload           from 'fn/overload.js';
import observe            from '../../../fn/observer/observe.js';
import { Observer }       from '../../../fn/observer/observer.js';
import create             from 'dom/create.js';
import delegate           from 'dom/delegate.js';
import events             from 'dom/events.js';
import { trigger }        from 'dom/trigger.js';
import gestures           from 'dom/gestures.js';
import rect               from 'dom/rect.js';
import { px }             from 'dom/parse-length.js';

import { loads, resizes } from '../../modules/window.js';
import parseValue         from '../../modules/parse-value.js';
import { assignNormal, updateData, valueFromNormal } from '../../modules/data.js';
import { toDisplay }      from '../../modules/display.js';
import { nearestStep }    from '../../modules/step.js';
import { maxTapDuration, maxDoubleTapDuration } from '../../modules/constants.js';
import * as defaults      from '../../modules/defaults.js';

import { setFormValue }   from './form.js';

const assign  = Object.assign;
const mutable = { mutable: true };


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
Emitted from the element during the movement of a handle.
**/

/**
"change"
Emitted from the element when a handle has been moved.
**/

function updateBoxes(track, computed, pxbox, paddingbox, contentbox, rangebox) {
    const box           = rect(track);
    const fontsize      = px(computed['font-size']);
    const borderTop     = px(computed.borderTopWidth) || 0;
    const borderBottom  = px(computed.borderBottomWidth) || 0;
    const paddingTop    = px(computed.paddingTop) || 0;
    const paddingBottom = px(computed.paddingBottom) || 0;

    pxbox.y           = box.y + borderTop + paddingTop;
    pxbox.height      = box.height - borderTop - paddingTop - borderBottom - paddingBottom;

    paddingbox.y      = 0;
    paddingbox.height = box.height - borderTop - borderBottom;

    contentbox.y      = paddingTop;
    contentbox.height = box.height - borderTop - paddingTop - borderBottom - paddingBottom;

    // rangebox is contentbox in ems with reversed y axis (+ve is up). All a bit
    // confusing and ought to be cleaned up
    rangebox.y        = (0 - paddingBottom - borderBottom) / fontsize;
    rangebox.height   = -contentbox.height / fontsize;

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

function setNormal(e, data) {
    const axis     = data.axis;
    const scale    = axis.scale;
    const box      = data.pxbox;

    // Pixel position of control, compensating for initial mousedown offset on
    // the control
    const py = box.height - (e.clientY - box.y - data.offset.y);

    // Normalised position, unclamped
    data.normal = py / box.height;
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
        setNormal(e, data);
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
        else if (data.type === 'move') {
            data.type = 'moveend';
        }

        return data;
    }
});

const handle = overload((data) => data.type, {
    'double-tap': function(data) {
        console.log('TODO: Implement double tap to reset to default');
    },

    'move': function(data) {
        const { target, axis, host, value: points, y, normal } = data;
        const index = target.dataset.index;
        const point = points[index];
        const step  = valueFromNormal(axis.scale, axis.min, axis.max, axis.step, normal);

        // If value has not changed do nothing
        if (point.value === step.value) { return; }

        // Rendering is handled by mutation observers
        const observer = Observer(point);
        observer.value  = step.value;
        observer.normal = step.normal;

        // Notify UI
        trigger('input', host);
    },

    'moveend': function(data) {
        const { internals, formdata, host, value: points } = data;
        setFormValue(internals, formdata, host.name, points);
        trigger('change', host);
    },

    default: function(data) {
        console.log('Untyped gesture, shouldnt happen', data);
    }
});


/* Rendering */

function renderTick(buttons, tick, axis) {
    buttons.push(
        create('label', {
            part:  axis + '-tick tick',
            style: '--normal-' + axis + ': ' + tick.normal + ';',
            html:  '<span>' + tick.label + '</span>'
        })
    );

    return buttons;
}

function updateHandle(handle, style, rangebox, scale, min, max, point, index) {
    // Transform position of the handle
    handle.setAttribute('transform', 'translate('
        + 0.5
        + ' '
        + denormalise(rangebox.y, rangebox.y + rangebox.height, point.normal)
        + ')'
    );

    // Fill the <title> inside the path with 'label value'
    handle.firstElementChild.textContent = (point.label ? (point.label + ' ') : '')
        + point.value;

    // Keep a note of the handles index
    handle.dataset.index = index;

    // Set CSS normals
    style.setProperty('--normal-value-' + (index + 1), point.normal);
}

function renderHandle(rangebox, scale, min, max, point, index) {
    // FF is a little sensitive about commas in <path> data, so don't use any
    return create('path', {
        part:     'handle',
        class:    'control control-handle control-point',
        d:        'M 0 0 m -0.5 0 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0',
        tabindex: '0',
        html:     '<title></title>'
    });
}

function renderHandles(handles, style, svg, rangebox, axis, points) {
    let n = -1;
    let point, handle;

    // Update or add handles for all points
    while(point = points[++n]) {
        if (handles[n]) {
            handle = handles[n];
            updateHandle(handle, style, rangebox, axis.scale, axis.min, axis.max, point, n);
        }
        else {
            handle = renderHandle(rangebox, axis.scale, axis.min, axis.max, point, n);
            updateHandle(handle, style, rangebox, axis.scale, axis.min, axis.max, point, n);
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
    style.setProperty('--normal-zero', scale.normalise(min, max, 0));

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
        const marker  = document.createTextNode('');
        const output  = create('output', { for: 'number', part: 'output' });
        const input   = create('input', { type: 'number', id: 'number' });
        const ticks   = [];
        const handles = [];

        track.append(svg);
        output.append(input);
        shadow.append(style, label, track, marker, output);

        // Components
        const privates   = Privates(this);
        const computed   = getComputedStyle(track);
        const hostStyle  = style.sheet.cssRules[0].style;
        const childStyle = style.sheet.cssRules[1].style;

        privates.host       = this;
        privates.childStyle = childStyle;
        privates.internals  = internals;
        privates.formdata   = new FormData();
        privates.load       = new Promise((resolve) => privates.resolveLoad = resolve);

        privates.pxbox      = {};
        privates.paddingbox = {};
        privates.contentbox = {};
        privates.rangebox   = { y: 6.75, width: 6.75 };

        privates.scale      = Stream.of(defaults.scale);
        privates.min        = Stream.of(defaults.min);
        privates.max        = Stream.of(defaults.max);
        privates.step       = Stream.of(defaults.step);
        privates.ticks      = Stream.of(defaults.ticks);
        privates.display    = Stream.of(defaults.display);
        privates.values     = Stream.of([{ value: 0, normal: 0 }]);

        const reflows = Stream
            .merge(privates.load, loads, resizes)
            .broadcast();

        const axis = Stream.combine({
                load:    privates.load,
                scale:   privates.scale,
                min:     privates.min,
                max:     privates.max,
                ticks:   privates.ticks,
                step:    privates.step,
                display: privates.display
            }, mutable)
            .scan(updateData, {})
            .broadcast();

        // Track value and mutations of value
        const values = Stream
            // Wait for axis scale, min and max
            .combine({ axis, points: privates.values }, mutable)
            // Update points with normals
            .map(({ axis, points }) => {
                points.forEach((point) => assignNormal(point, axis.scale, axis.min, axis.max, point.value));
                return points;
            })
            // Convert to stream that outputs whenever points are added or removed (I think... TODO check)
            .scan(toObserver, null)
            .flatMap(id)
            .broadcast();

        reflows.each(() =>
            updateViewbox(track, hostStyle, computed, svg, privates)
        );

        // Render DOM
        axis.each((axis) =>
            renderData('y', hostStyle, axis.scale, axis.min, axis.max, axis.ticks, ticks, marker)
        );

        // Expose data so it may be got by the .data property
        values.each((data) =>
            privates.data = data
        );

        // Render canvas
        Stream
        .combine({ axis, reflows, value: values }, mutable)
        .each((state) => {
            privates.state = state;
            renderHandles(handles, hostStyle, svg, privates.rangebox, state.axis, state.value);
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
                    updateHandle(handle, hostStyle, privates.rangebox, privates.state.axis.scale, privates.state.axis.min, privates.state.axis.max, point, index);
                    updateOutput(output, point);
                })
            ));

            // Render initial value to output
            updateOutput(output, value[0]);

            return observers;
        }, []);

        Stream.combine({
            axis:    axis,
            gesture: gestures({ select: '[part=handle]', threshold: 0 }, shadow)
        }, mutable)
        .each(({ axis, gesture }) => {
            // Update boxes - we don't know the current scrolling position
            updateBoxes(track, computed, privates.pxbox, privates.paddingbox, privates.contentbox, privates.rangebox);

            gesture
            .scan(toCoordinates, {
                axis,
                handles,
                internals,
                host:     this,
                track,
                pxbox:    privates.pxbox,
                formdata: privates.formdata,
                value:    privates.state.value,
                events:   []
            })
            .filter(get('type'))
            .each(handle);

            this.focus();
        });

        // On double click on output focus the number input
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
        privates.resolveLoad();
    }
};
