
import overload      from '../../fn/modules/overload.js';
import parseTicks    from './parse-ticks.js';

function ceil(factor, n) {
    return Math.ceil(n / factor) * factor;
}

export const generateTicks = overload((unit) => unit.toLowerCase(), {
    'db': (unit, min, max) => parseTicks('-∞dB -96dB -90dB -84dB -78dB -72dB -66dB -60dB -54dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB 12dB 18dB 24dB'),

    default: (unit, min, max) => {
        const diff = max - min;

        const increment =
            diff < 0.8 ? ceil(0.05, diff / 10) :
            diff < 2   ? ceil(0.2, diff / 10) :
            diff < 8   ? ceil(0.5, diff / 10) :
            diff < 20  ? ceil(2, diff / 10) :
            diff < 80  ? ceil(5, diff / 10) :
            diff < 200 ? ceil(20, diff / 10) :
            ceil(200, diff) ;

        const ticks = [];

        let n =
            diff < 0.8 ? ceil(0.05, min) :
            diff < 2   ? ceil(0.2, min) :
            diff < 8   ? ceil(0.5, min) :
            diff < 20  ? ceil(2, min) :
            diff < 80  ? ceil(5, min) :
            diff < 200 ? ceil(20, min) :
            ceil(200, min) ;

        while (n <= max) {
            ticks.push({
                label: diff < 2 ?
                    n.toFixed(1) :
                    n,
                value: n
            });

            n += increment;
        }

        return ticks;
    }
});
