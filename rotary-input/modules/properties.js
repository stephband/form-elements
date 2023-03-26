
import { createAttributeProperty } from '../../modules/attributes.js';
import parseValue                  from '../../modules/parse-value.js';
import properties                  from '../../modules/properties.js';

export default Object.assign({}, properties, {
    /**
    value=""
    The initial value of the input.
    **/

    /**
    .value
    Current value of the input.
    **/

    value: createAttributeProperty('value', 0, parseValue)
});
