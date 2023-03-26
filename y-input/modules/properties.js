
import { Observer, getTarget } from '../../../fn/observer/observer.js';
import Privates        from '../../../fn/modules/privates.js';
import parseValues     from '../../modules/parse-values.js';
import stringifyValues from '../../modules/stringify-values.js';
import properties      from '../../modules/properties.js';


export default Object.assign({}, properties, {
    /**
    value="0 0"
    The initial value of the element. This is a series of space or comma
    separated values such as:

    ```
    value="0 1 2"
    ```

    Values may also be given an optional label which appears as a handle's
    title (it is announced to screen readers, and appears when hovering
    on a handle):

    ```
    value="0 [First] 1 [Second] 2 [Last]"
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

    /*
    .data
    The value of the element as an array of objects representing the values of
    the input. The array is 'live' – objects mutate in response to moved handles,
    and handles move when the object values are set.

    data: {
        get: function() {
            const privates = Privates(this);
            return Observer(privates.data);
        },

        set: function(values) {
            const privates = Privates(this);
            privates.values.push(getTarget(values));
        },

        enumerable: true
    }
    */
});
