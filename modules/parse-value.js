
import toGain from 'fn/to-gain.js';

/**
parseValue(string)
Takes a unit value as a string and returns a number. Units may be any letters.

- Units starting with `"m"` cause the number to be multiplied by `0.001`
- Units starting with `"k"` cause the number to be multiplied by `1000`
- Numbers with units `"dB"` return a unit gain converted from decibels
- Numbers with units `"bpm"` return a frequency, ie. beats per second
**/

export default function parseValue(string) {
    // Coerce null, undefined, false, '', 'any' to 0. Not sure why.
    // Should perhaps error.
    if (!string) { return 0; }

    // Return numbers without units
    const number = +string;
    if (number || number === 0) { return number; }

    // Detect units
    const tokens = /^(?:(-?[\d.]+)|(-?∞))(?:(db|bpm)|(m|k)?(\w+))$/.exec(string.toLowerCase());
    if (!tokens) { return 0; }

    const value = tokens[2] ?
            tokens[2] === '-∞' ? -Infinity :
            Infinity :
        parseFloat(tokens[1]) ;

    return tokens[3] === 'db' ? toGain(value) :
        // BPM to frequency in beats per second
        tokens[3] === 'bpm' ? value / 60 :
        // milli-
        tokens[4] === 'm' ? value / 1000 :
        // kilo-
        tokens[4] === 'k' ? value * 1000 :
        value ;
}
