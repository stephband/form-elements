
import { dB24, dB30, dB36, dB48, dB60, dB66, dB72, dB96 } from './constants.js';

const assign = Object.assign;


/*
Linear/logarithmic normaliser
*/

const linLogRanges = {};

function linLog(xover, max, value) {
    const v = value / (max * xover);
    return (v <= 1 ? v : (Math.log(v) + 1)) / linLogRanges[xover];
}

function linLogInv(xover, max, ratio) {
    const r = ratio * linLogRanges[xover];
    return max * xover * (r <= 1 ? r : Math.pow(Math.E, r - 1));
}

function LinLogScale(xover) {
    this.xover = xover;

    if (!linLogRanges[xover]) {
        // Cache linlog ranges for later use in calculations
        linLogRanges[xover] = Math.log(1 / xover) + 1;
    }
}

assign(LinLogScale.prototype, {
    normalise: function(min, max, value) {
        const rangeMin   = linLog(this.xover, max, min);
        const rangeValue = linLog(this.xover, max, value);
        return (rangeValue - rangeMin) / (1 - rangeMin);
    },

    denormalise: function(min, max, ratio) {
        const rangeMin   = linLog(this.xover, max, min);
        const rangeValue = ratio * (1 - rangeMin) + rangeMin;
        return linLogInv(this.xover, max, rangeValue);
    }
});


/*
Power normaliser
*/

function PowerScale(power) {
    this.power = power;
}

assign(PowerScale.prototype, {
    normalise: function(min, max, value) {
        return Math.pow((value - min) / (max - min), 1 / this.power);
    },

    denormalise: function(min, max, ratio) {
        return Math.pow(ratio, this.power) * (max - min) + min;
    }
});


/*
Scales
Names must be lowercase, as attribute values are converted to lowercase.
*/

export default {
    'linear': {
        normalise: function(min, max, value) {
            return (value - min) / (max - min);
        },

        denormalise: function(min, max, ratio) {
            return min + ratio * (max - min);
        }
    },

    'pow-2': new PowerScale(2),
    'pow-3': new PowerScale(3),
    'pow-4': new PowerScale(4),

    'log': {
        normalise: function(min, max, value) {
            return Math.log(value / min) / Math.log(max / min);
        },

        denormalise: function(min, max, ratio) {
            return min * Math.pow(max / min, ratio);
        }
    },

    'log-24db': new LinLogScale(dB24),
    'log-30db': new LinLogScale(dB30),
    'log-36db': new LinLogScale(dB36),
    'log-48db': new LinLogScale(dB48),
    'log-60db': new LinLogScale(dB60),
    'log-66db': new LinLogScale(dB66),
    'log-72db': new LinLogScale(dB72),
    'log-96db': new LinLogScale(dB96)
};
