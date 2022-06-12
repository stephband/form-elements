
import overload      from '../../fn/modules/overload.js';
import parseTicks    from './parse-ticks.js';

export const generateTicks = overload((unit) => unit.toLowerCase(), {
    'db': (unit, min, max) => parseTicks('-∞dB -96dB -90dB -84dB -78dB -72dB -66dB -60dB -54dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB 12dB 18dB 24dB'),

    default: (unit, min, max) => [{
        label: '0',
        value: 0
    }, {
        label: '1',
        value: 1
    }]
});
