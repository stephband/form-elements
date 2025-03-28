import clamp       from 'fn/clamp.js';
import normalise   from 'fn/normalise.js';
import denormalise from 'fn/denormalise.js';
import events      from 'dom/events.js';
import element     from 'dom/element.js';
import getLaw      from '../modules/law.js';


const assign = Object.assign;
const roots  = new WeakSet();

// The original input.value descriptor. We extend this to apply our own value
// descriptor so that sets may be observed. Remarkably, this actually works. Mostly.
const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');


function setStyleNormal(input) {
    input.style.setProperty('--normal', input.normal);
}

export default element('<input is="normal-input">', {
    connect: function(shadow, internals) {
        // Set initial again now that we have upgraded and law is available.
        // There's some odd behaviour here. An input authored in HTML will have
        // a correct .getAttribute('value'), while an input rendered by Literal
        // has a correct descriptor.get.apply(this). Likely this is because
        // Literal's first render happens while it is still in a fragment, so
        // the input is still raw - it has not yet been upgraded.
        this.value = this.getAttribute('value') || descriptor.get.apply(this);

        // The element has no shadow. We use event delegation on the root node
        // to respond to all inputs in that root.
        const root = this.getRootNode();
        if (roots.has(root)) return;
        roots.add(root);

        events({ type: 'input', select: '[is="normal-input"]', capture: true }, root)
        .each((e) => setStyleNormal(e.target));
    }
}, {
    /**
    law="linear"
    Identifies a fader law to apply to value. Possible identifiers are:
    - `'linear'`
    - `'log'`
    - `'pow-2'` to `'pow-4'`
    - `'log-6db'`, `'log-12db'`, `'log-18db'` to `'log-96dB'`
    **/
    /* No need to declare it! */

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

            // Set value without calling this.value setter
            descriptor.set.call(this, value);
            setStyleNormal(this);
        },

        get: function() {
            const min   = this.min === '' ? 0   : parseFloat(this.min);
            const max   = this.max === '' ? 100 : parseFloat(this.max);
            const value = this.valueAsNumber || parseFloat(descriptor.get.apply(this));
            return normalise(min, max, value);
        }
    },

    /**
    .value
    The `.value` property is an override of the input's native value property
    which updates the normal whenever set. There is one caveat: in Safari the
    initial attribute value _is_ picked up, but calls to `.setAttribute('value', n)`
    are not observed. Set the `.value` property instead.
    **/
    value: {
        attribute: function(value) {
            // Use the property as the single source of value truth
            this.value = value;
        },

        set: function(value) {
            const attr  = this.getAttribute('law');
            if (!attr) {
                descriptor.set.call(this, value);
                setStyleNormal(this);
                return;
            }

            const law = getLaw(attr);
            const min = this.min === '' ? 0   : parseFloat(this.min);
            const max = this.max === '' ? 100 : parseFloat(this.max);

            this.normal = law.normalise(min, max, value);
        },

        get: function() {
            const attr = this.getAttribute('law');
            if (!attr) {
                return this.valueAsNumber || parseFloat(descriptor.get.apply(this));
            }

            const law   = getLaw(attr);
            const min   = this.min === '' ? 0   : parseFloat(this.min);
            const max   = this.max === '' ? 100 : parseFloat(this.max);
            const value = law.denormalise(min, max, this.normal);

            // Depending on the law rounding errors may have crept in so we
            // re-clamp the value to be extra sure
            return clamp(min, max, value);
        }
    }
});
