
import { clamp }   from '../../../fn/modules/clamp.js';
import get         from '../../../fn/modules/get.js';
import last        from '../../../fn/modules/last.js';
import overload    from '../../../fn/modules/overload.js';
import noop        from '../../../fn/modules/noop.js';
import { remove }  from '../../../fn/modules/remove.js';
import { Observer, notify } from '../../../fn/observer/observer.js';


import create      from '../../../dom/modules/create.js';
import delegate    from '../../../dom/modules/delegate.js';
import events      from '../../../dom/modules/events.js';
import gestures    from '../../../dom/modules/gestures.js';
import rect        from '../../../dom/modules/rect.js';
import { trigger } from '../../../dom/modules/trigger.js';
import { px }      from '../../../dom/modules/parse-length.js';

import Literal      from '../../../literal/renderers/template-renderer.js';

import { $state, maxTapDuration, maxDoubleTapDuration } from '../../modules/constants.js';

import Data        from './data.js';
import { setFormValue } from './form.js';

const assign = Object.assign;


/*
toCoordinates()
Turn gesture positions into coordinates
*/

function updateBoxes(element, pxbox, paddingbox, contentbox, rangebox) {
    const box           = rect(element);
    const computed      = getComputedStyle(element);
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

    rangebox[0] = 0;
    rangebox[2] = contentbox.width / fontsize;
    rangebox[1] = 0;
    rangebox[3] = -contentbox.height / fontsize;

    return box;
}

function setXY(e, data) {
    const box      = data.data.pxbox;
    const valuebox = data.data.valuebox;

    // New pixel position of control, compensating for initial
    // mousedown offset on the control
    const px = e.clientX - box.x - data.offset.x;
    const py = box.height - (e.clientY - box.y - data.offset.y);

    // Normalise to 0-1, allowing x position to extend beyond viewbox
    data.x = clamp(valuebox.x, valuebox.x + valuebox.width,  data.data.toValueX(px / box.width));
    data.y = clamp(valuebox.y, valuebox.y + valuebox.height, data.data.toValueY(py / box.height));
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

    '.control-handle': overload((element, data) => data.type, {
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

        'move': function(element, gesture) {
            const data = gesture.data;
            const points = Observer(data.points);

            points[element.dataset.index].x = gesture.x ;
            points[element.dataset.index].y = gesture.y ;

            const host = gesture.host;
            if (last(gesture.events).type !== 'pointermove') {
                // internal, formdata, name, value
                setFormValue(gesture.internal, gesture.formdata, host.name, data.points);
                trigger('change', host);
            }
            else {
                trigger('input', host);
            }

            return data;
        },

        default: function(element, data) {
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


function updateViewbox(element, data) {
    const observer = Observer(data);

    data.pxbox      || (observer.pxbox = {});
    data.paddingbox || (observer.paddingbox = {});
    data.contentbox || (observer.contentbox = {});
    data.rangebox   || (observer.rangebox = []);

    observer.box = updateBoxes(element, observer.pxbox, observer.paddingbox, observer.contentbox, observer.rangebox);
}

export default {
    construct: function(shadow, internal) {
        const literal  = new Literal('#xy-input-shadow');
        const data     = new Data(this);
        const formdata = new FormData();

        shadow.append(create('label', {
            part: 'label',
            children: [create('slot')]
        }));

        this[$state] = {
            rendered: literal.push(data),
            host:     this,
            data:     data,
            internal: internal,
            literal:  literal,
            formdata: formdata,
            viewbox:  literal.content.querySelector('svg').viewBox.baseVal
        };

        gestures({ threshold: 1 }, shadow)
        .reduce((previous, gesture) => {
            data.box = updateBoxes(this, data.pxbox, data.paddingbox, data.contentbox, data.rangebox);
            const state = assign({ previous, events: [] }, this[$state]);

            gesture
            .scan(toCoordinates, state)
            .filter(get('type'))
            .each(handle);

            return state;
        });

        events('resize', window).each((e) => updateViewbox(this, data));
    },

    load: function(shadow) {
        const literal = this[$state].literal;

        updateViewbox(this, this[$state].data);

        // Insert content now that CSS has loaded to avoid flash of unstyled
        // content.
        this[$state].rendered.then(() => {
            shadow.appendChild(literal.content);
            literal.connect();
        });
    }
};
