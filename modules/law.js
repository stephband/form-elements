
import normalise   from 'fn/normalise.js';
import denormalise from 'fn/denormalise.js';
import { dB6, dB12, dB18, dB24, dB30, dB36, dB48, dB60, dB66, dB72, dB96 } from './constants.js';

const assign = Object.assign;


/*
Linear/logarithmic normaliser
*/

function linLog(xover, range, max, value) {
    const v = value / (max * xover);
    return (v <= 1 ? v : (Math.log(v) + 1)) / range;
}

function linLogInv(xover, range, max, ratio) {
    const r = ratio * range;
    return max * xover * (r <= 1 ? r : Math.pow(Math.E, r - 1));
}

function LinLogScale(xover) {
    this.xover = xover;
    this.range = Math.log(1 / xover) + 1;
}

assign(LinLogScale.prototype, {
    normalise: function(min, max, value) {
        const rangeMin   = linLog(this.xover, this.range, max, min);
        const rangeValue = linLog(this.xover, this.range, max, value);
        return (rangeValue - rangeMin) / (1 - rangeMin);
    },

    denormalise: function(min, max, ratio) {
        const rangeMin   = linLog(this.xover, this.range, max, min);
        const rangeValue = ratio * (1 - rangeMin) + rangeMin;
        return linLogInv(this.xover, this.range, max, rangeValue);
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
Laws
Names must be lowercase, as attribute values are converted to lowercase.
*/

export const laws = {
    'linear': { normalise, denormalise, name: 'Linear' },

    'pow-2':  new PowerScale(2),
    'pow-3':  new PowerScale(3),
    'pow-4':  new PowerScale(4),

    'log': {
        normalise: function(min, max, value) {
            return Math.log(value / min) / Math.log(max / min);
        },

        denormalise: function(min, max, ratio) {
            return min * Math.pow(max / min, ratio);
        }
    },

    'log-6db':  new LinLogScale(dB6),
    'log-12db': new LinLogScale(dB12),
    'log-18db': new LinLogScale(dB18),
    'log-24db': new LinLogScale(dB24),
    'log-30db': new LinLogScale(dB30),
    'log-36db': new LinLogScale(dB36),
    'log-48db': new LinLogScale(dB48),
    'log-60db': new LinLogScale(dB60),
    'log-66db': new LinLogScale(dB66),
    'log-72db': new LinLogScale(dB72),
    'log-96db': new LinLogScale(dB96)
};

export function getScale(name) {
    return laws[name && name.toLowerCase() || 'linear'];
}

// Used by ./music
export default getScale;
