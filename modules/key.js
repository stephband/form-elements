
import get      from '../../fn/modules/get.js';
import noop     from '../../fn/modules/noop.js';
import overload from '../../fn/modules/overload.js';

import { previousStep, nextStep } from './step.js';

export const toKeyValue = overload(get('keyCode'), {
    // Up arrow
    38: (e, scale, min, max, steps, normal) => {
        // If we don't preventDefault the browser scrolls
        e.preventDefault();

        // Move in steps
        if (steps) {
            const step = nextStep(steps, normal);
            return step.value;
        }

        // Move in big increments if the shift key is down
        const diff = e.shiftKey ? 10 : 1 ;
        return scale.denormalise(min, max, (Math.round(100 * normal) + diff) * 0.01);
    },

    // Down arrow
    40: (e, scale, min, max, steps, normal) => {
        // If we don't preventDefault the browser scrolls
        e.preventDefault();

        // Move in steps
        if (steps) {
            const step = previousStep(steps, normal);
            return step.value;
        }

        // Move in big increments if the shift key is down
        const diff = e.shiftKey ? 10 : 1 ;
        return scale.denormalise(min, max, (Math.round(100 * normal) - diff) * 0.01);
    },

    // Other keys
    default: noop
});
