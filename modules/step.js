
export function createSteps(min, max, step) {
    let value = min;
    const steps = [{ value: value }];

    while ((value = value + step) <= max) {
        steps.push({ value: value });
    }

    return steps;
}

export function nearestStep(steps, normal) {
    let n = steps.length;
    let diff = Infinity;
    let step;

    while (n--) {
        const d = Math.abs(normal - steps[n].normal);

        if (d < diff) {
            diff = d;
            step = steps[n];
        }
    }

    return step;
}

export function previousStep(steps, unitValue) {
    let n = steps.length;
    while (steps[--n] && steps[n].unitValue >= unitValue);
    return steps[n] || steps[0];
}

export function nextStep(steps, unitValue) {
    let n = -1;
    while (steps[++n] && steps[n].unitValue <= unitValue);
    return steps[n] || steps[steps.length - 1];
}
