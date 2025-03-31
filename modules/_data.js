

import nothing           from 'fn/nothing.js';
import clamp             from 'fn/clamp.js';
import parseTicks        from './parse-ticks.js';
import parseValue        from './parse-value.js';
import { createSteps, nearestStep } from './step.js';
import { generateTicks } from './ticks.js';

export function assignNormal(data, scale, min, max, value) {
    data.normal = scale.normalise(min, max, value);
    return data;
}

export function updateData(data, axis) {
console.log('UPDATE data', data, axis);
    const { scale, min, max, step, ticks, display } = axis;

    data.scale = scale;
    data.min   = min;
    data.max   = max;

    data.ticks = (ticks ?
            ticks.length ? ticks :
            generateTicks(display, min, max) :
        nothing)
        // Filter to ticks within range min-max
        .filter((tick) => tick.value >= data.min && tick.value <= data.max)
        .map((tick) => assignNormal(tick, scale, min, max, tick.value)) ;

    data.step =
        // "any"
        step === 'any' ? undefined :
        // "ticks"
        step === 'ticks' ? data.ticks :
        // Multiple values
        /\s|,/.test(step) ? parseTicks(step)
            .filter((step) => step.value >= data.min && step.value <= data.max)
            .map((step) => assignNormal(step, scale, min, max, step.value)) :
        // Generate from a single step value
        createSteps(min, max, parseValue(step))
        .map((step) => assignNormal(step, scale, min, max, step.value)) ;

    data.display = display;

    return data;
}

const point = {};

export function valueFromValue(scale, min, max, step, value) {
    point.value  = clamp(min, max, value);
    point.normal = scale.normalise(min, max, point.value);

    return step ?
        // Round to nearest step by normal value, as that is visually the nearest
        nearestStep(step, point.normal) :
        // Return point data
        point ;
}

export function valueFromNormal(scale, min, max, step, normal) {
    point.normal = clamp(0, 1, normal);
    point.value  = scale.denormalise(min, max, point.normal);

    return step ?
        // Round to nearest step by normal value, as that is visually the nearest
        nearestStep(step, point.normal) :
        // Return point data
        point ;
}

export function updateValue(data, scale, min, max, step, value) {
    const state = valueFromValue(scale, min, max, step, value);
    data.value  = state.value;
    data.normal = state.normal;
    return data;
}
