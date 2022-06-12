
import id       from '../../fn/modules/id.js';
import overload from '../../fn/modules/overload.js';
import todB     from '../../fn/modules/to-db.js';

function outputMilliKilo(unit, value) {
    return value < 0.001 ? (value * 1000).toFixed(2) :
        value < 1 ? (value * 1000).toPrecision(3) :
        value > 1000 ? (value / 1000).toPrecision(3) :
        value.toPrecision(3) ;
}

export default overload(id, {
    pan: function(unit, value) {
        return value === -1 ? '-1.00' :
            value === 0 ? '0.00' :
            value === 1 ? '1.00' :
            value.toFixed(2) ;
    },

    dB: function(unit, value) {
        const db = todB(value) ;
        return isFinite(db) ?
            db < -1 ? db.toPrecision(3) :
                db.toFixed(2) :
            db < 0 ?
                '-∞' :
                '∞' ;
    },

    Hz: function(unit, value) {
        return value < 1 ? value.toFixed(2) :
            value > 1000 ? (value / 1000).toPrecision(3) :
            value.toPrecision(3) ;
    },

    semitone: function(unit, value) {
        // detune value is in cents
        return value === 0 ? '0' :
            value < 0 ?
                '♭' + (-value / 100).toFixed(2) :
                '♯' + (value / 100).toFixed(2) ;
    },

    s: outputMilliKilo,

    bpm: function(unit, value) {
        // Input value is a rate in beats per second
        const bpm = value * 60;
        return bpm < 100 ?
            bpm.toFixed(1) :
            bpm.toFixed(0) ;
    },

    int: function(unit, value) {
        return Math.round(value);
    },

    default: function(unit, value) {
        return value < 0.1 ? value.toFixed(3) :
            value < 999.5 ? value.toPrecision(3) :
            value.toFixed(0) ;
    }
});
