
import toCamelCase        from '../../fn/modules/to-camel-case.js';
import * as normalisers   from '../../fn/modules/normalisers.js';
import * as denormalisers from '../../fn/modules/denormalisers.js';

export function denormalise(curve, min, max, value) {
    return denormalisers[toCamelCase(curve)](min, max, value) ;
}

export function normalise(curve, min, max, value) {
    return normalisers[toCamelCase(curve)](min, max, value) ;
}
