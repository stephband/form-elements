
import toGain from '../../fn/modules/to-gain.js';

export default function parseValue(string) {
    // Coerce null, undefined, false, '' to 0
    if (!string) { return 0; }

    // Returns numbers without units
    const number = +string;
    if (number || number === 0) { return number; }

    // Detect units
    const tokens = /^(-?[\d.]+)(?:(db|bpm)|(m|k)?(\w+))$/.exec(string.toLowerCase());
    if (!tokens) { return 0; }

    const value = parseFloat(tokens[1]) ;
    return tokens[2] === 'dB' ? toGain(value) :
        // BPM to `rate` in beats per second
        tokens[2] === 'bpm' ? value / 60 :
        // milli-
        tokens[3] === 'm' ? value / 1000 :
        // kilo-
        tokens[3] === 'k' ? value * 1000 :
        value ;
}
