

import nothing         from '../../fn/modules/nothing.js';
import { clamp }       from '../../fn/modules/clamp.js';
import parseTicks      from './parse-ticks.js';
import { nearestStep } from './step.js';

function assignNormalValue(object, scale, min, max) {
    object.normalValue = scale.normalise(min, max, object.value);
    return object;
}

export function updateData(data, scale, min, max, ticks, step, display) {
    data.scale = scale;
    data.min   = min;
    data.max   = max;

    data.ticks = (ticks ? ticks :
        display ? generateTicks(display, min, max) :
        nothing)
        // Filter to ticks within range min-max
        .filter((tick) => tick.value >= data.min && tick.value <= data.max)
        .map((tick) => assignNormalValue(tick, scale, min, max)) ;

    data.step =
        step === 'any' ? undefined :
        step === 'tick' ? data.ticks :
        parseTicks(step)
        .filter((step) => step.value >= data.min && step.value <= data.max)
        .map((step) => assignNormalValue(step, scale, min, max)) ;

    data.display = display;
    return data;
}

export function updateValue(data, scale, min, max, value) {
    //if (value === data.value) { console.log('REPEAT VALUE SET - ARE WE BOTHERED?', value); }
    data.value       = clamp(min, max, value);
    data.normalValue = scale.normalise(min, max, data.value);

    // Round to nearest step
    if (data.step) {
        // We find the nearest visually by getting nearest to normalValue
        const step = nearestStep(data.step, data.normalValue);
        data.value       = step.value;
        data.normalValue = step.normalValue;
    }

    return data;
}
