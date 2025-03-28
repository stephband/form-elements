

import nothing           from 'fn/nothing.js';
import clamp             from 'fn/clamp.js';
import { wrap }          from 'fn/wrap.js';
import parseTicks        from './parse-ticks.js';
import parseValue        from './parse-value.js';
import { createSteps, nearestStep } from './step.js';
import { generateTicks } from './ticks.js';

export function assignNormal(data, law, min, max, value) {
    data.normal = law.normalise(min, max, value);
    return data;
}

export function updateData(law, min, max, step, ticks, display, data) {
    data.law = law;
    data.min = min;
    data.max = max;

    data.ticks = (ticks ?
            ticks.length ? ticks :
            generateTicks(display, min, max) :
        nothing)
        // Filter to ticks within range min-max
        .filter((tick) => tick.value >= data.min && tick.value <= data.max)
        .map((tick) => assignNormal(tick, law, min, max, tick.value)) ;

    data.step =
        // "any"
        step === 'any' ? undefined :
        // "ticks"
        step === 'ticks' ? data.ticks :
        // Multiple values
        /\s|,/.test(step) ? parseTicks(step)
            .filter((step) => step.value >= data.min && step.value <= data.max)
            .map((step) => assignNormal(step, law, min, max, step.value)) :
        // Generate from a single step value
        createSteps(min, max, parseValue(step))
        .map((step) => assignNormal(step, law, min, max, step.value)) ;

    data.display = display;

    return data;
}

const point = {};

export function valueFromValue(law, min, max, step, value, wrapped = false) {
    point.value  = wrapped ?
        wrap(min, max, value) :
        clamp(min, max, value) ;

    point.normal = law.normalise(min, max, point.value);

    return step ?
        // Round to nearest step by normal value, as that is visually the nearest
        nearestStep(step, point.normal) :
        // Return point data
        point ;
}

export function valueFromNormal(law, min, max, step, normal) {
    point.normal = clamp(0, 1, normal);
    point.value  = law.denormalise(min, max, point.normal);

    return step ?
        // Round to nearest step by normal value, as that is visually the nearest
        nearestStep(step, point.normal) :
        // Return point data
        point ;
}

export function updateValue(data, law, min, max, step, value) {
    const state = valueFromValue(law, min, max, step, value);
    data.value  = state.value;
    data.normal = state.normal;
    return data;
}
