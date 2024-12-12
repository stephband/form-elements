import normalise   from 'fn/normalise.js';
import denormalise from 'fn/denormalise.js';
import events      from 'dom/events.js';
import element     from 'dom/element.js';

const assign = Object.assign;
const pow    = Math.pow;
const roots  = new WeakSet();

// The original input.value descriptor. We extend this to apply our own value
// descriptor so that sets may be observed. Remarkably, this works. Mostly.
const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

function setStyleNormal(input) {
    input.style.setProperty('--normal', input.normal);
}

export default element('<input is="normal-input">', {
    connect: function(shadow, internals) {
        // Update normal on entry into the DOM
        setStyleNormal(this);

        // The element has no shadow. We use event delegation on the root node
        // to respond to all inputs at once, so delegate once per root node.
        const root = this.getRootNode();
        if (roots.has(root)) return;
        roots.add(root);

        events({ type: 'input', select: '[is="normal-input"]' }, root)
        .each((e) => setStyleNormal(e.target));
    }
}, {
    /**
    .normal
    A get/set property describing the position of the handle in the range `0-1`,
    regardless of the values of `min` and `max`. Setting `.normal` changes
    `.value` accordingly.
    **/
    normal: {
        set: function(normal) {
            const min   = this.min === '' ? 0   : parseFloat(this.min);
            const max   = this.max === '' ? 100 : parseFloat(this.max);
            const value = denormalise(min, max, normal);

            // Set without calling normalise observer
            descriptor.set.call(this, value);
        },

        get: function() {
            const min   = this.min === '' ? 0   : parseFloat(this.min);
            const max   = this.max === '' ? 100 : parseFloat(this.max);
            const value = this.valueAsNumber || parseFloat(this.value);
            return normalise(min, max, value);
        }
    },

    value: {
        // Extend the original input.value descriptor. I'm surprised this works
        // at all. The attribute observer does not function 100% in Safari. It
        // DOES pick up the initial attribute when HTML is parsing - a Good
        // Thing - but does not respond to input.setAttribute(). Better than
        // nothing!
        attribute: function(value) {
            this.value = value;
        },

        set: function(value) {
            descriptor.set.apply(this, arguments);
            setStyleNormal(this);
        },

        get: descriptor.get
    }
});
