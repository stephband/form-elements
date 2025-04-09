/**
<storage-select>

A select menu for saving data to localStorage.

## Import

Import and register the `<select is="storage-select">` custom element, upgrading
any instances already in the DOM:

```js
import StorageSelect from './build/storage-select.js';
```

## Use

You can now author `<select is="storage-select">` elements in your HTML. By
default the element shows a menu of all data contained in localStorage:

```html
<select is="storage-select"></select>
```

The `prefix` attribute makes `<select is="storage-select">` show only data whose
`localStorage` key begins with the given prefix:

```html
<select is="storage-select" prefix="setting/"></select>
```

When an item in the menu is selected `<select is="storage-select">` emits a
`"change"` event, its `.value` property is the (unprefixed) key and its `.data`
property is the corresponding data read from localStorage and parsed as JSON.
**/


import get      from 'fn/get.js';
import noop     from 'fn/noop.js';
import overload from 'fn/overload.js';
import Signal   from 'fn/signal.js';
import create   from 'dom/create.js';
import delegate from 'dom/delegate.js';
import events   from 'dom/events.js';
//import trigger  from 'dom/trigger.js';
import element, { getInternals } from 'dom/element.js';
import { createObjectAttribute, createStringAttribute } from 'dom/element/create-attribute.js';
//import createStringProperty from 'dom/element/create-string-property.js';

const isTopWindow = (() => {
    // Test that we are not running in an iframe
    try { return window.self === window.top; }
    catch(e) { return false; }
})();

function downloadAs(filename, data) {
    // Create blob from json
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

    // Create the blob URL
    const url = URL.createObjectURL(blob);

    // Create the `<a download>` element and append it invisibly.
    const a = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.hidden   = true;
    document.body.append(a);

    // Programmatically click the element.
    a.click();

    // Revoke the blob URL and remove the element.
    setTimeout(() => {
        URL.revokeObjectURL(url);
        a.remove();
    }, 1000);
}

async function saveAs(filename, data, id) {
    // create a new handle
    const file = await window.showSaveFilePicker({ id, suggestedName: filename });
    // create a FileSystemWritableFileStream to write to
    const writable = await file.createWritable();
    // write to file
    await writable.write(JSON.stringify(data, null, 2));
    // close the file and write the contents to disk.
    await writable.close();
}

/* `
    <link rel="stylesheet" href="${ window.fileMenuStylesheet || import.meta.url.replace(/js$/, 'css') }"/>

    <select name="setting">
        <option value selected disabled id="default-option">Settings</option>
        <hr/>
        <option value="$store">Store</option>
        <option value="$store-as">Store as&hellip;</option>
        <option value="$delete">Delete</option>
        <hr/>
        <option value="$save-as">Save as&hellip;</option>
    </select>

    <svg viewbox="0 0 24 24">
        <path d="M7,10 L17,10 L12,15 Z"/>
    </svg>

    <dialog>
        <form style="width: 320px; margin: 1.875rem auto;" method="dialog">
            <label>Save as</label>
            <input type="text" name="name" placeholder="Name" id="name" />
            <button name="cancel">Close</button>
            <button type="submit" name="save">Save</button>
        </form>
    </dialog>
` */

export default element('<select is="storage-select">', {
    construct: function(shadow, internals, data) {
        events('change', this).each(delegate({
            '[name="setting"]': overload(get('value'), {
                '': noop,

                '$store': (select, e) => {
                    // If there is no current name open the Store As dialog
                    if (!internals.filename) return dialog.showModal();
                    // Compose name
                    const key = this.prefix + internals.filename;
                    // Save under the current name
                    localStorage.setItem(key, JSON.stringify(this.data));
                    // Reselect the current option
                    select.value = key;
                },

                '$store-as': (select, e) => {
                    // Open the Save As dialog
                    dialog.showModal();
                },

                '$delete': (select, e) => {
                    const key = this.prefix + internals.filename;
                    // Remove data from localStorage
                    localStorage.removeItem(key);
                    // Remove option
                    select.querySelector('[value="' + key + '"]').remove();
                    // Select default option
                    internals.filename = select.value = '';
                },

                '$save-as': async (select, e) => {
                    // Use the FileSystem API if available
                    if (isTopWindow && window.showSaveFilePicker) {
                        saveAs(internals.filename + '.json', this.data, this.prefix);
                    }
                    // Fall back to an automatically clicked download link
                    else {
                        downloadAs(internals.filename + '.json', this.data);
                    }
                },

                default: (select, e) => {
                    // TODO: This is a cheeky backdoor to allow consumers to add
                    // actions (a la stage-node). There's probably a better way.
                    if (this.actions && this.actions[select.value]) {
                        this.actions[select.value](select, e);
                        return;
                    }

                    // If value starts with $preset data is taken from the
                    // presets object
                    if (select.value.startsWith('$/')) {
                        const name = select.value.slice(2);
                        const data = internals.presets[name];
                        internals.filename = name;
                        this.data = data;
                    }

                    // Get data from localStorage
                    else {
                        const json = localStorage.getItem(select.value);
                        const data = JSON.parse(json);
                        internals.filename = select.value.slice(this.prefix.length);
                        this.data  = data;
                    }
                }
            })
        }));

        /*
        events('click', shadow).each(delegate({
            '[name="save"]': (button, e) => {
                const input = shadow.getElementById('name');
                const name  = input.value;
                if (!name) throw new Error('Please give the setting a name');

                // Store
                const key = this.prefix + name;
                localStorage.setItem(key, JSON.stringify(this.data));
                if (!select.querySelector('option[value="' + key + '"]')) {
                    marker.after(create('option', { value: key, text: name }));
                }

                // Update state and close dialog
                select.value = key;
                internals.filename = name;
                dialog.close();

                // Emit change event to outer DOM
                trigger('change', this);
            },

            '[name="close"]': (button, e) => {
                const key = this.prefix + internals.filename;
                select.value = key;
                dialog.close();
            }
        }));
        */
    },

    connect: function(shadow, internals, data) {
        const marker = shadow.getElementById('default-option');

        // Return array of render signals
        return  Signal.frame(() => {
            const prefix = this.prefix;
            const options = Object.keys(localStorage)
                .filter((key) => key.startsWith(prefix))
                .map((key) => create('option', { value: key, text: key.slice(prefix.length) }));

            // Remove existing options
            while (marker.nextElementSibling.matches('option')) marker.nextElementSibling.remove();

            // Insert new options
            marker.after.apply(marker, options);

            // Select default option and update state
            internals.filename = this.value = '';
            this.data = null;

            // Emit change event
            //trigger('change', this);
        });
    }
}, {
    // Reserve the prefix '$' for internal use
    prefix: createStringAttribute('prefix', '', (string) => {
        if (/^\$/.test(string)) throw new Error('<storage-select> prefix may not start with "$"');
        return string;
    }),
    // Declare title property to make it an observable signal
    filename: createStringAttribute('filename'),
    // Data is the parsed data object from storage
    data:     createObjectAttribute('data'),
    //
    createPreset: function(name, data) {
        const internals = getInternals(this);
        const select = internals.shadowRoot.querySelector('select');
        const prefix = '$/';

        if (!internals.presets) {
            internals.presets = {};
            select.append(
                create('hr', { id: 'presets' }),
                create('option', { disabled: true, html: 'Presets' })
            );
        }

        const presets = internals.presets;

        if (presets[name]) throw new Error('Cannot overwrite preset');
        presets[name] = data;
        select.append(create('option', { value: prefix + name, html: name }));
    }
}, 'stephen.band/form-elements/storage-select/');
