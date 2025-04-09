
import events  from 'dom/events.js';
import element from 'dom/element.js';
import { createReadonlyProperty } from 'dom/element/create-attribute.js';

export default element('<select is="menu-select">', {
    construct: function() {
        // We want menu to return to default state even if fn() throws
        events('input', this).each((e) => {
            const value   = e.target.value;
            const actions = this.actions;
            const fn      = actions[value] || actions['default'];

            // Allow options without handlers to act as normal select options
            if (!fn) return;

            // Allow handlers to return, if they return anything, an updated
            // value, otherwise default to the empty string value
            const option = this.selectedOptions[0];

            // We want menu to return to default state even if fn() throws
            try {
                this.value = fn(option) || '';
            }
            catch (error) {
                console.error(error);
                this.value = '';
            }

            // This does nothing practically, other than signal to other code
            // the event has been handled. Perhaps we should block change event
            // at this point?
            e.preventDefault();
        });
    },

    connect: function() {
        // We want menu to start in default state, nothing selected
        this.value = '';
        requestAnimationFrame(() => this.value = '');
    }
}, {
    actions: createReadonlyProperty('actions', {})
});
