
import { Observer, getTarget } from '../../../fn/observer/observer.js';
import Privates        from '../../../fn/modules/privates.js';
import parseValues     from '../../modules/parse-values.js';
import stringifyValues from '../../modules/stringify-values.js';
import properties      from '../../modules/properties.js';


export default Object.assign({}, properties, {
    /**
    value="0 0"
    The initial value of the element. This is a series of space or comma
    separated `x, y` values such as:

    ```
    value="0,0 1,0.5 2,0"
    ```

    Values may also be given an optional label.

    ```
    value="0,0 First 1,0 Second 2,0 Last"
    ```

    An `<xy-input>` supports WebAudio automation data. Labels must be one of
    the types `'step'`, `'linear'`, `'exponential'` or `'target'`. The type
    `'target'` must be followed by a fourth parameter duration:

    ```
    value="0,0 step 1,0 linear 2,0 target 0.2"
    ```
    **/

    /**
    .value
    The value of the element, expressed as a string. When submitted as part of a
    form the array is serialised to a formdata parameters.
    **/

    value: {
        attribute: function(value) {
            this.value = value;
        },

        get: function() {
            const privates = Privates(this);
            return privates.state ? stringifyValues(privates.state.value) : '';
        },

        set: function(values) {
            const privates = Privates(this);
            privates.values.push(
                typeof values === 'string' ?
                    parseValues(values) :
                typeof values === 'number' ?
                    [{ value: values }] :
                    getTarget(values)
            );
        },

        enumerable: true
    },

    /**
    .data
    The value of the element. Returns a live array of objects representing
    each value in the input. Objects mutate in response to handles being moved,
    and handles are moved when the object values are mutated.
    **/

    data: {
        get: function() {
            const privates = Privates(this);
            return Observer(privates.value);
        },

        set: function(values) {
            const privates = Privates(this);
            privates.values.push(getTarget(values));
        },

        enumerable: true
    },
});
