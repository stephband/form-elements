
import compileFn  from 'fn/compile.js';

const scope = {};

// Add Math functions to scope
const descriptors = Object.getOwnPropertyDescriptors(Math);
let name;
for (name in descriptors) scope[name] = Math[name];

// Add other built-ins to scope
Object.assign(scope, {
    isFinite:  Number.isFinite,
    isInteger: Number.isInteger,
    isNaN:     Number.isNaN
});


/**
compile(source)
Compiles a literal template string to a function of the form `fn(value)`.
**/

// Store render functions against their source
export const compiled = {};

export default function compile(source) {
    const code = '"use strict"; return `' + source + '`;';

    // Return cached fn
    if (compiled[code]) { return compiled[code]; }

    // The quick version
    return compiled[code] = compileFn(scope, 'value', code);
}
