
import overload       from 'fn/overload.js';
import todB           from 'fn/to-db.js';
import { formatTime } from 'fn/time.js';
import compile        from './compile.js';

function outputMilli() {
    return {
        unit: value < 1 ? 'm' + unit : unit,
        value: value < 0.001 ? (value * 1000).toFixed(2) :
            value < 1 ? (value * 1000).toPrecision(3) :
            value.toPrecision(3)
    };
}

function outputMilliKilo(unit, value) {
    return {
        unit: value < 1 ? 'm' + unit :
            value >= 1000 ? 'k' + unit :
            unit ,
        value: value < 0.001 ? (value * 1000).toFixed(2) :
            value < 1 ? (value * 1000).toPrecision(3) :
            value >= 1000 ? (value / 1000).toPrecision(3) :
            value.toPrecision(3)
    };
}

function outputMilliCentiKilo(unit, value) {
    return {
        unit: value < 0.01 ? 'm' + unit :
            value < 1      ? 'c' + unit :
            value >= 1000  ? 'k' + unit :
            unit ,
        value: value < 0.001 ? (value * 1000).toFixed(2) :
            value < 0.01 ? (value * 1000).toPrecision(3) :
            value < 1 ? (value * 100).toPrecision(3) :
            value >= 1000 ? (value / 1000).toPrecision(3) :
            value.toPrecision(3)
    };
}

function outputTime(format) {
    return (unit, value) => ({
        unit: '',
        value: formatTime(format)
    });
}

export const formatters = {
    'pan': (unit, value) => ({
        unit: '',
        value: value === -1 ? '-1.00' :
            value === 0 ? '0.00' :
            value === 1 ? '1.00' :
            value.toFixed(2)
    }),

    // Input value is a unity gain
    'db': (unit, value) => {
        const db = todB(value) ;
        return {
            unit: 'dB',
            value: isFinite(db) ?
                    db < -1 ? db.toPrecision(3) :
                    db.toFixed(2) :
                db < 0 ? '-∞' :
                    '∞'
        };
    },

    'hz': (unit, value) => ({
        unit:  value >= 1000 ? 'kHz' : 'Hz',
        value: value < 1 ? value.toFixed(2) :
            value >= 1000 ? (value / 1000).toPrecision(3) :
            value.toPrecision(3)
    }),

    // Input value is a detune in cents
    'semitone': (unit, value) => ({
        unit: '',
        value: value === 0 ? '0' :
            value < 0 ?
                '♭' + (-value / 100).toFixed(2) :
                '♯' + (value / 100).toFixed(2)
    }),

    // seconds
    's': outputMilli,

    // metres
    'm': outputMilliCentiKilo,

    // Input value is a frequency
    'bpm': (unit, value) => {
        const bpm = value * 60;
        return {
            unit: 'bpm',
            value: bpm < 100 ?
                bpm.toFixed(1) :
                bpm.toFixed(0)
        };
    },

    'int': (unit, value) => ({
        unit: '',
        value: Math.round(value)
    }),

    '': (unit, value) => {
        const abs = Math.abs(value);
        return {
            unit: '',
            value: abs < 1 ? value.toFixed(2) :
                abs < 1000 ? value.toPrecision(3) :
                Math.round(value)
        };
    },

    default: overload((unit) => (/[YMWwdhms]/.test(unit) ? 'time' : 'default'), {
        time: (unit, value) => ({
            unit: '',
            value: formatTime(unit, value)
        }),

        default: outputMilliKilo
    })
};

export const toDisplay = overload((unit) => unit.toLowerCase(), formatters);

export default function parseDisplay(format) {
    return /\$\\*\{/.test(format) ?
        compile(format.replaceAll(/\$\\*\{/g, '${')) :
        (value) => toDisplay(format, value) ;
}
