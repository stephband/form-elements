
import { Observer, notify, getTarget } from '../../../fn/observer/observer.js';

import parseValue  from '../../modules/parse-value.js';
import parseTicks  from '../../modules/parse-ticks.js';
import parsePoints from '../../modules/parse-points.js';
import { $state }  from '../../modules/constants.js';
import scales      from '../../modules/scales.js';

import axes        from './axes.js';
import { setFormValue } from './form.js';

export default {/*
    type: {
        value: 'array',
        enumerable: true
    },*/

    // Remember attributers are setup in this declared order

    xmin: {
        /**
        xmin="0"
        Value at lower limit of fader. Can interpret values with recognised units,
        eg. `"0dB"`.
        **/

        attribute: function(value) {
            this.xmin = value;
        },

        /**
        .xmin
        Value at lower limit of fader. Can interpret values with recognised units,
        eg. `"0dB"`.
        **/

        get: function() {
            return this[$state].data.xmin;
        },

        set: function(value) {
            value = parseValue(value);
            const data = this[$state].data;

            if (value === data.xmin) { return; }

            data.xmin = value;
            const isValueboxAttribute = this.getAttribute('valuebox');

            if (!isValueboxAttribute) {
                data.valuebox.x = value;
                data.valuebox.width = data.xmax - data.valuebox.x;
            }

            notify('xmin', data);

            if (!isValueboxAttribute) {
                notify('valuebox.x', data);
                notify('valuebox.width', data);
            }
        }
    },

    xmax: {
        /**
        xmax="1"
        Value at upper limit of fader. Can interpret values with recognised units,
        eg. `"0dB"`.
        **/

        attribute: function(value) {
            this.xmax = value;
        },

        /**
        .xmax
        Value at upper limit of fader. Can interpret values with recognised units,
        eg. `"0dB"`.
        **/

        get: function() {
            return this[$state].data.xmax;
        },

        set: function(value) {
            value = parseValue(value);

            if (Number.isNaN(value)) {
                if (window.DEBUG) {
                    throw new Error('Invalid value max = ' + value + ' set on <xy-input>');
                }

                value = 1;
            }

            const data = this[$state].data;

            if (value === data.xmax) { return; }

            data.xmax = value;

            const isValueboxAttribute = this.getAttribute('valuebox');
            !isValueboxAttribute && (data.valuebox.width = value - data.valuebox.x);
            notify('xmax', data);
            !isValueboxAttribute && notify('valuebox.width', data);
        }
    },

    xlaw: {
        /**
        xlaw="linear"
        Scale on the x axis. This is the name of a transform to be applied over the
        x domain of the fader travel. Possible values are:

        - `"linear"`
        - `"quadratic"`
        - `"cubic"`
        - `"db-linear-24"`
        - `"db-linear-48"`
        - `"db-linear-60"`
        - `"db-linear-96"`
        - `"lin-24dB-log"`
        **/

        attribute: function(value) {
            const data = this[$state].data;

            if (window.DEBUG && !scales[value]) {
                throw new Error('<xy-input> invalid attribute scale="' + value + '" (valid values "' + Object.keys(scales).join('" ,"') + '")');
            }

            Observer(data).xScale = value;
        }
    },

    xstep: {
        /**
        xstep="any"
        Not yet implemented.
        **/
    },

    xaxis: {
        /**
        xaxis=""

        A space separated list of values at which to display tick marks. Values
        may be listed with or without units, eg:

        ```html
        <xy-input yticks="0 0.2 0.4 0.6 0.8 1">
        <xy-input yticks="-48dB -36dB -24dB -12dB 0dB">
        ```
        **/
        attribute: function(value) {
            const data = this[$state].data;
            Observer(data).xaxis = value !== null ?
                axes[value] || parseTicks(value) :
                axes.default ;
        }
    },

    ymin: {
        /**
        ymin="0"
        Value at lower limit of fader. Can interpret values with recognised units,
        eg. `"0dB"`.
        **/

        attribute: function(value) {
            this.ymin = value;
        },

        /**
        .ymin
        Value at lower limit of fader. Can interpret values with recognised units,
        eg. `"0dB"`.
        **/

        get: function() {
            return this[$state].data.min;
        },

        set: function(value) {
            value = parseValue(value);
            const data = this[$state].data;

            if (value === data.min) { return; }
            data.min = value;

            const isValueboxAttribute = this.getAttribute('valuebox');
            if (!isValueboxAttribute) {
                data.valuebox.y = value;
                data.valuebox.height = data.max - data.valuebox.y;
            }

            notify('min', data);

            if (!isValueboxAttribute) {
                notify('valuebox.y', data);
                notify('valuebox.height', data);
            }
        }
    },

    ymax: {
        /**
        ymax="1"
        Value at upper limit of fader. Can interpret values with recognised units,
        eg. `"0dB"`.
        **/

        attribute: function(value) {
            this.ymax = value;
        },

        /**
        .ymax
        Value at upper limit of fader. Can interpret values with recognised units,
        eg. `"0dB"`.
        **/

        get: function() {
            return this[$state].data.max;
        },

        set: function(value) {
            value = parseValue(value);

            if (Number.isNaN(value)) {
                if (window.DEBUG) {
                    throw new Error('Invalid value max = ' + value + ' set on <xy-input>');
                }

                value = 1;
            }

            const data = this[$state].data;

            if (value === data.max) { return; }
            data.max = value;

            const isValueboxAttribute = this.getAttribute('valuebox');
            !isValueboxAttribute && (data.valuebox.height = value - data.valuebox.y);
            notify('max', data);
            !isValueboxAttribute && notify('valuebox.height', data);
        }
    },

    ylaw: {
        /**
        ylaw="linear"
        Scale on the y axis. This is the name of a transform to be applied over the
        y range of the fader travel. Possible values are:

        - `"linear"`
        - `"db-linear-24"`
        - `"db-linear-48"`
        - `"db-linear-60"`
        - `"db-linear-96"`
        - `"logarithmic"`
        - `"quadratic"`
        - `"cubic"`
        **/

        attribute: function(value) {
            const data = this[$state].data;

            if (window.DEBUG && !scales[value]) {
                throw new Error('<xy-input> invalid attribute scale="' + value + '" (valid values "' + Object.keys(scales).join('" ,"') + '")');
            }

            Observer(data).yScale = value;

            /*
            data.transformY = value === 'db-linear-96' ? dbLinear96 :
                value === 'db-linear-60' ? dbLinear60 :
                value === 'db-linear-48' ? dbLinear48 :
                value === 'linear' ? id :
                id ;
            */

            /*
            if (data.ticksAttribute) {
                data.ticks = createTicks(data, data.ticksAttribute);
            }

            if (data.step) {
                data.steps = createSteps(data, value === 'ticks' ?
                    data.ticksAttribute || '' :
                    data.stepsAttribute );
            }
            */
        }
    },

    ystep: {
        /**
        ystep="any"

        Either:

        - A space separated list of values. Values may be listed with units.
        - The string `"yticks"`. Values in the `yticks` attribute are used as steps.
        **/

        attribute: function(value) {
            const data = this[$state].data;
            //data.ystepAttribute = value;

            // If steps is 'ticks' use ticks attribute as step value list
            data.ystep = createSteps(data, value === 'yticks' ?
                data.yticks || '' :
                value
            );
        }
    },

    yaxis: {
        /**
        yaxis=""

        A space separated list of values at which to display tick marks. Values
        may be listed with or without units, eg:

        ```html
        <xy-input yticks="0 0.2 0.4 0.6 0.8 1">
        <xy-input yticks="-48dB -36dB -24dB -12dB 0dB">
        ```
        **/
        attribute: function(value) {
            const data = this[$state].data;

            Observer(data).yaxis = value !== null ?
                axes[value] || parseTicks(value) :
                axes.default ;

            // Create ticks
            //scope.ticks(createTicks(data, value));

            // If step is 'ticks' update steps
            if (data.stepsAttribute === 'ticks') {
                data.ystep = createSteps(data, value || '');
            }
        },
    },

    properties: {
        /**
        properties="x y"
        By default the points data `element.value` use the property keys `'x'`
        and `'y'` of a point to render. Where `.value` is data owned by you, you
        may require the element to use other keys. They may be set with this
        attribute.
        **/
        attribute: function(value) {
            const [x, y] = value ?
                value.trim().split(/\s+|\s*,\s*/) :
                ['x', 'y'] ;

            this[$state].data.xname = value || 'x';
            this[$state].data.yname = value || 'y';
        }
    },

    valuebox: {
        /**
        valuebox=""
        Defines an `"x y width height"` box to use as the range of values that
        map to the padding box of the `<xy-input>`. The origin is at the
        bottom and y increases upwards.

        Where not given, `valuebox` defaults to the limits of `min` and `max`.
        Most often this is what you want, and the valuebox attribute is safe to
        ignore.
        **/

        attribute: function(value) {
            // TODO: parse valuebox
        }
    },

    ordered: {
        /**
        ordered=""
        Boolean attribute. When set, data points may not overlap their
        neighbours, keeping the order of points on the x axis constant.
        **/
        attribute: function(value) {
            this[$state].data.ordered = value !== null;
        }
    },

    value: {
        /**
        value=""
        The initial value of the element.
        **/
        attribute: function(value) {
            this.value = value;
        },

        /**
        .value
        The value of the element.
        **/
        get: function() {
            return Observer(this[$state].data.points);
        },

        set: function(values) {
            const { data, internal, formdata } = this[$state];

            Observer(data).points = typeof values === 'string' ?
                parsePoints(values) :
                getTarget(values) ;

            setFormValue(internal, formdata, this.name, data.points);
        },

        enumerable: true
    },
    /*
    include: {
        /**
        include=""
        **/
    /*    attribute: function(url) {
            const data = this[$state].data;
            Observer(data).include = url;
        }
    },*/

    /**
    "input"
    Event sent when one of the handles moves.
    **/

    /**
    "change"
    Event sent on conclusion of a move (and after formdata is updated).
    **/
};
