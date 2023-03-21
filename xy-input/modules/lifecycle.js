
import Privates             from '../../../fn/modules/privates.js';
import { clamp }            from '../../../fn/modules/clamp.js';
import id                   from '../../../fn/modules/id.js';
import Stream               from '../../../fn/modules/stream.js';
import get                  from '../../../fn/modules/get.js';
import last                 from '../../../fn/modules/last.js';
import overload             from '../../../fn/modules/overload.js';
import noop                 from '../../../fn/modules/noop.js';
import { remove }           from '../../../fn/modules/remove.js';
import observe              from '../../../fn/observer/observe.js';
import { Observer, notify } from '../../../fn/observer/observer.js';
import create               from '../../../dom/modules/create.js';
import delegate             from '../../../dom/modules/delegate.js';
import events               from '../../../dom/modules/events.js';
import { trigger }          from '../../../dom/modules/trigger.js';
import gestures             from '../../../dom/modules/gestures.js';
import rect                 from '../../../dom/modules/rect.js';
import { px }               from '../../../dom/modules/parse-length.js';

import { updateData }       from '../../modules/data.js';
import { normalise, denormalise } from '../../modules/scales.js';
import { toDisplay }        from '../../modules/display.js';
import { nearestStep }      from '../../modules/step.js';
import { maxTapDuration, maxDoubleTapDuration } from '../../modules/constants.js';
import * as defaults        from '../../modules/defaults.js';

import { setFormValue } from './form.js';
import { requestDrawCurve, clear, drawXLines, drawYLines, drawCrosshair } from './canvas.js';
import { drawAudioEnvelope } from './draw-audio.js';

const assign = Object.assign;



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

function updateBoxes(host, computed, pxbox, paddingbox, contentbox, rangebox) {
    const box           = rect(host);
    const fontsize      = px(computed['font-size']);
    const borderLeft    = px(computed.borderLeftWidth) || 0;
    const borderTop     = px(computed.borderTopWidth) || 0;
    const borderRight   = px(computed.borderRightWidth) || 0;
    const borderBottom  = px(computed.borderBottomWidth) || 0;
    const paddingLeft   = px(computed.paddingLeft) || 0;
    const paddingTop    = px(computed.paddingTop) || 0;
    const paddingRight  = px(computed.paddingRight) || 0;
    const paddingBottom = px(computed.paddingBottom) || 0;

    pxbox.x      = box.x + borderLeft + paddingLeft;
    pxbox.y      = box.y + borderTop + paddingTop;
    pxbox.width  = box.width  - borderLeft - paddingLeft - borderRight - paddingRight;
    pxbox.height = box.height - borderTop - paddingTop - borderBottom - paddingBottom;

    paddingbox.x      = 0;
    paddingbox.y      = 0;
    paddingbox.width  = box.width - borderLeft - borderRight;
    paddingbox.height = box.height - borderTop - borderBottom;

    contentbox.x      = paddingLeft;
    contentbox.y      = paddingTop;
    contentbox.width  = box.width  - borderLeft - paddingLeft - borderRight - paddingRight;
    contentbox.height = box.height - borderTop - paddingTop - borderBottom - paddingBottom;

    // rangebox is contentbox in ems with reversed y axis (+ve is up)
    rangebox.x = 0;
    rangebox.width = contentbox.width / fontsize;
    rangebox.y = 0;
    rangebox.height = -contentbox.height / fontsize;

    return box;
}

function updateViewbox(host, style, computed, canvas, svg, data) {
    data.box = updateBoxes(host, computed, data.pxbox, data.paddingbox, data.contentbox, data.rangebox);

    canvas.width  = data.paddingbox.width * 2;
    canvas.height = data.paddingbox.height * 2;

    style.setProperty('--range-x',      data.rangebox.x);
    style.setProperty('--range-y',      data.rangebox.y);
    style.setProperty('--range-width',  data.rangebox.width);
    style.setProperty('--range-height', data.rangebox.height);

    svg.setAttribute('viewBox', data.rangebox.x + ' '
        + (data.rangebox.y + data.rangebox.height) + ' '
        + data.rangebox.width + ' '
        + (-data.rangebox.height)
    );
}

function setXY(e, data) {
    const box      = data.pxbox;
    const valuebox = data.valuebox;

    // New pixel position of control, compensating for initial
    // mousedown offset on the control
    const px = e.clientX - box.x - data.offset.x;
    const py = box.height - (e.clientY - box.y - data.offset.y);

    // Normalise to 0-1, allowing x position to extend beyond viewbox
    data.x = clamp(valuebox.x, valuebox.x + valuebox.width,  denormalise(valuebox.x, valuebox.x + valuebox.width, px / box.width));
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
            x: 0,
            y: 0
        } : {
            // Target is an object in the SVG
            x: e.clientX - (controlBox.x + controlBox.width / 2),
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
            && (e.clientX - e0.clientX) < 4
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
    '.duration-handle': overload((element, data) => data.type, {
        'pointermove': function(element, data) {
            //const scope =  getScope(data.target);
            const y = denormalise[data.yTransform](data.yMin, data.yMax, -data.y);

            scope[3] = data.x <= scope[0] ?
                // Just using it for a small number... Todo: check why this
                // objects being set to 0
                minExponential :
                data.x - scope[0] ;
            scope[2] = y;

            //notify(data.collection, '.', data.collection);

            return data;
        },

        default: noop
    }),

    '.control-handle': overload((target, data) => data.type, {
        'tap': function(element, data) {
            //const scope = getScope(data.target);
            //cycleType(scope);
            //notify(data.collection, '.', data.collection);

            // We store scope on data here so that we may pick it up on
            // double-tap, at whcih time the target will no longer have scope
            // because it will have been replaced by another node.
            //
            // Two other approaches:
            //
            // 1. Get scope earlier in the chain. Not elegant, as earlier steps
            // really have nothing to do with scope.
            //
            // 2. Delay tap for 300ms or so until we can be certain it's not
            // going to turn into a double-tap. This is probably most
            // reasonable but will require a little guddling about.
            data.scope = scope;

            return data;
        },

        'double-tap': function(element, data) {
            // Pick up scope from previous tap data as outlined above.
            const scope = data.previous.scope;
            remove(data.collection, scope);
            //notify(data.collection, '.', data.collection);
            return data;
        },

        'move': function(target, data) {
            const { internals, formdata, events, host, value, x, y } = data;
            const index = target.dataset.index;

            // Render is handled by observers
            const point = Observer(value[index]);

            point.x = x;
            point.y = y;

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
    }),

    '*': overload((element, data) => data.type, {
        'double-tap': function(data) {
            const x = data.x;
            const y = denormalise[data.yTransform](data.yMin, data.yMax, -data.y);

            // Insert new control point
            insert(getTime, data.collection, [x, 'step', y]);
            notify(data.collection, '.', data.collection);
            return data;
        },

        default: noop
    })
});


/* Rendering */

function getPropertyColor(style, property) {
    const color = style.getPropertyValue(property).trim();
    return color === 'none' ? undefined : color ;
}

function renderCanvas(canvas, ctx, computed, contentbox, valuebox, xaxis, yaxis, points, drawEnvelopeFlag = true) {
    const viewbox    = {
        x:      contentbox.x * 2,
        y:      contentbox.y * 2,
        width:  contentbox.width * 2,
        height: contentbox.height * 2
    };

    const xGridColor     = getPropertyColor(computed, '--line-color-x');
    const yGridColor     = getPropertyColor(computed, '--line-color-y');
    const crosshairColor = getPropertyColor(computed, '--crosshair-color');
    const plotColor      = getPropertyColor(computed, '--envelope-color');

    clear(ctx, { x: 0, y: 0, width: canvas.width, height: canvas.height });

    if (xGridColor) {
        drawXLines(ctx, viewbox, xaxis.ticks
            .filter((line) => valuebox.x + valuebox.width >= line.value && line.value >= valuebox.x)
            .map((line) => line.normalValue),
            xGridColor
        );
    }

    if (yGridColor) {
        drawYLines(ctx, viewbox, yaxis.ticks
            .filter((line) => valuebox.y + valuebox.height >= line.value && line.value >= valuebox.y)
            .map((line) => line.normalValue),
            yGridColor
        );
    }

    if (crosshairColor) {
        points
        && points.length
        && points.forEach((point) => drawCrosshair(ctx, viewbox, 28, {
            x: xaxis.scale.normalise(xaxis.min, xaxis.max, point.x),
            y: yaxis.scale.normalise(yaxis.min, yaxis.max, point.y),
        }, crosshairColor))
    }

    if (plotColor && drawEnvelopeFlag) {
        points
        && points.length
        && drawAudioEnvelope(ctx, viewbox, valuebox, xaxis.scale, xaxis.min, xaxis.max, yaxis.scale, yaxis.min, yaxis.max, points, plotColor, () =>
            // Asynchronously render again once waveform data has been calculated
            renderCanvas(canvas, ctx, computed, contentbox, valuebox, xaxis, yaxis, points, false)
        );
    }
}

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

function updateHandle(handle, rangebox, xscale, xmin, xmax, yscale, ymin, ymax, point, index) {
    handle.setAttribute('transform', 'translate('
        + denormalise(rangebox.x, rangebox.x + rangebox.width, xscale.normalise(xmin, xmax, point.x))
        + ' '
        + denormalise(rangebox.y, rangebox.y + rangebox.height, yscale.normalise(ymin, ymax, point.y))
        + ')'
    );

    handle.firstElementChild.innerHTML = (point.label ? (point.label + ' ') : '')
        + point.x + ', ' + point.y;

    handle.dataset.index = index;
}

function renderHandle(rangebox, xscale, xmin, xmax, yscale, ymin, ymax, point, index) {
    return create('path', {
        part:  'handle',
        class: 'control control-handle control-point',
        // FF is a little sensitive about where commas occur, let's not use any
        d:     'M 0 0 m -0.5 0 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0',

        // Position it
        transform: 'translate('
            + denormalise(rangebox.x, rangebox.x + rangebox.width, xscale.normalise(xmin, xmax, point.x))
            + ' '
            + denormalise(rangebox.y, rangebox.y + rangebox.height, yscale.normalise(ymin, ymax, point.y))
            + ')',

        // Hover tooltip contains "label x, y"
        html: '<title>'
            + (point.label ? (point.label + ' ') : '')
            + point.x + ', ' + point.y
            + '</title>',

        // Keep a track of which point this path is from
        data:  { index: index }
    });
}

function renderHandles(handles, svg, rangebox, xaxis, yaxis, points) {
    let n = -1;
    let point, handle;

    // Update or add handles for all points
    while(point = points[++n]) {
        if (handles[n]) {
            handle = handles[n];
            updateHandle(handle, rangebox, xaxis.scale, xaxis.min, xaxis.max, yaxis.scale, yaxis.min, yaxis.max, point, n);
        }
        else {
            handle = renderHandle(rangebox, xaxis.scale, xaxis.min, xaxis.max, yaxis.scale, yaxis.min, yaxis.max, point, n);
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

function renderData(axis, style, scale, min, max, ticks, lines, buttons, marker) {
    // Style
    style.setProperty('--' + axis + '-normal-zero', scale.normalise(min, max, 0));

    // Ticks
    buttons.forEach((node) => node.remove());
    buttons.length = 0;
    buttons = ticks.reduce((buttons, tick) => renderTick(buttons, tick, axis), buttons);
    marker.after.apply(marker, buttons);
}


/* Element */

export default {
    construct: function(shadow, internals) {
        // DOM
        const style   = create('style', ':host {} :host > * { visibility: hidden; }');
        const label   = create('label', { for: 'input', html: '<slot></slot>', part: 'label' });
        const canvas  = create('canvas');
        const svg     = create('svg');
        const xmarker = create('text', '');
        const ymarker = create('text', '');
        const xlines  = [];
        const ylines  = [];
        const xticks  = [];
        const yticks  = [];
        const handles = [];

        shadow.append(style, label, canvas, svg, xmarker, ymarker);

        // Components
        const privates   = Privates(this);
        const data       = { value: [] };
        const computed   = getComputedStyle(this);
        const hostStyle  = style.sheet.cssRules[0].style;
        const childStyle = style.sheet.cssRules[1].style;
        const ctx        = canvas.getContext('2d');
        const formdata   = new FormData();

        privates.host       = this;
        privates.hostStyle  = hostStyle;
        privates.childStyle = childStyle;
        privates.internals  = internals;
        privates.data       = data;
        privates.ctx        = ctx;
        privates.formdata   = formdata;
        privates.shadow     = new Promise((resolve) => privates.load = resolve);

        privates.pxbox      = {};
        privates.paddingbox = {};
        privates.contentbox = {};
        privates.rangebox   = { x: 0, y: 6.75, width: 6.75, height: -6.75 };
        privates.valuebox   = { x: 0, y: 0,    width: 1,    height: 1 };

        // Inputs
        privates.xscale   = Stream.of(defaults.scale);
        privates.xmin     = Stream.of(defaults.min);
        privates.xmax     = Stream.of(defaults.max);
        privates.xstep    = Stream.of(defaults.step);
        privates.xticks   = Stream.of(null);
        privates.xdisplay = Stream.of(defaults.display);

        privates.yscale   = Stream.of(defaults.scale);
        privates.ymin     = Stream.of(defaults.min);
        privates.ymax     = Stream.of(defaults.max);
        privates.ystep    = Stream.of(defaults.step);
        privates.yticks   = Stream.of(null);
        privates.ydisplay = Stream.of(defaults.display);
        privates.value    = Stream.of([{ x: 0, y: 0, type: 'step' }]);

        const resizes = Stream
        .merge(privates.shadow, events('resize', window))
        .broadcast();

        resizes.each(() =>
            updateViewbox(this, hostStyle, computed, canvas, svg, privates)
        );

        // Track attribute updates
        const xaxis = Stream.combine({
            shadow:  privates.shadow,
            scale:   privates.xscale,
            min:     privates.xmin,
            max:     privates.xmax,
            ticks:   privates.xticks,
            step:    privates.xstep,
            display: privates.xdisplay
        })
        .scan(updateData, {})
        .broadcast();

        const yaxis = Stream.combine({
            shadow:  privates.shadow,
            scale:   privates.yscale,
            min:     privates.ymin,
            max:     privates.ymax,
            ticks:   privates.yticks,
            step:    privates.ystep,
            display: privates.ydisplay
        })
        .scan(updateData, {})
        .broadcast();

        xaxis.each((data) => {
            privates.valuebox.x      = data.min;
            privates.valuebox.width  = data.max - data.min;
        });

        yaxis.each((data) => {
            privates.valuebox.y      = data.min;
            privates.valuebox.height = data.max - data.min;
        });

        // Render DOM
        xaxis
        .each((data) => renderData('x', hostStyle, data.scale, data.min, data.max, data.ticks, xlines, xticks, xmarker));

        yaxis
        .each((data) => renderData('y', hostStyle, data.scale, data.min, data.max, data.ticks, ylines, yticks, ymarker));

        // Track value and mutations of value
        const values = privates.value
        .scan(toObserver, null)
        .flatMap(id)
        .broadcast();

        // Render canvas
        Stream
        .combine({
            xaxis,
            yaxis,
            resizes,
            value: values
        })
        .each((state) => {
            /*
            console.table({
                pxbox:      privates.pxbox,
                paddingbox: privates.paddingbox,
                contentbox: privates.contentbox,
                rangebox:   privates.rangebox,
                valuebox:   privates.valuebox
            });
            */

            privates.state = state;
            renderCanvas(canvas, ctx, computed, privates.contentbox, privates.valuebox, state.xaxis, state.yaxis, state.value);
            renderHandles(handles, svg, privates.rangebox, state.xaxis, state.yaxis, state.value);
        });

        // Track mutations to points inside value
        privates.valueObservers = values.reduce((observers, value) => {
            // Stop previous observers
            observers.forEach(stop);

            // Register new observers for each point in value
            observers.push.apply(observers, value.map((point, index, points) =>
                observe('.', point, point).each((point) => {
                    const handle = svg.querySelectorAll('[part=handle]')[index];
                    renderCanvas(canvas, ctx, computed, privates.contentbox, privates.valuebox, privates.state.xaxis, privates.state.yaxis, points);
                    updateHandle(handle, privates.rangebox, privates.state.xaxis.scale, privates.state.xaxis.min, privates.state.xaxis.max, privates.state.yaxis.scale, privates.state.yaxis.min, privates.state.yaxis.max, point, index);
                })
            ));

            return observers;
        }, []);

        // Track gestures on handles
        gestures({ select: '[part=handle]', threshold: 1 }, shadow)
        .each((gesture) => {
            // Update boxes - we don't know the current scrolling position
            updateBoxes(this, computed, privates.pxbox, privates.paddingbox, privates.contentbox, privates.rangebox);

            gesture
            .scan(toCoordinates, {
                handles,
                internals,
                host:       this,
                pxbox:      privates.pxbox,
                valuebox:   privates.valuebox,
                formdata:   privates.formdata,
                value:      privates.state.value,
                events:     []
            })
            .filter(get('type'))
            .each(handle)
        });
    },

    load: function(shadow) {
        const privates = Privates(this);
        privates.childStyle.visibility = '';
        privates.load(shadow);
    }
};
