
import { Observer, getTarget } from '../../../fn/observer/observer.js';
import Privates        from 'fn/privates.js';
import parseValues     from '../../modules/parse-values.js';
import stringifyValues from '../../modules/stringify-values.js';
import properties      from '../../modules/properties.js';


export default Object.assign({}, properties, {
    /**
    value="0"
    The initial value of the element. As a `<y-input>` can handle any number of
    values, this may be series of space or comma separated values such as:

    ```
    value="0 1 2"
    ```

    Values may also be given an optional label, rendered as a handle's title
    (a title is announced to screen readers and appears when hovering on a handle):

    ```
    value="0 [First] 1 [Second] 2 [Last]"
    ```
    **/

    /**
    .value
    The value of the element expressed as a string of space-separated numbers.

    (Note that the value string is not the same as the serialized form data
    submitted when the `<y-input>` is part of a form.)
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
    The value of the element as an array of objects.

    Objects represent the values of the input. The array and objects are 'live'
    – they mutate in response to moved handles, and handles move when object
    values are changed.
    **/

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
});
