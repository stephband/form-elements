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

function showDialog(select, internals, id) {
    const data   = select.data;
    const value  = select.value;
    const prefix = select.prefix;
    const dialog = select.getRootNode().getElementById(id) || document.getElementById(id);
    if (!dialog) throw new Error(`Store as dialog not found id="${ id }"`);
    dialog.showModal();

    events('click', dialog).each(delegate({
        '[name="store"]': (button, e) => {
            const input = dialog.querySelector('[name="name"]');
            const name  = input.value;
            if (!name) throw new Error('Please give the setting a name');

            // Store
            const key = prefix + name;
            localStorage.setItem(key, JSON.stringify(data));
            if (!select.querySelector('option[value="' + key + '"]')) {
                select.append(create('option', { value: key, text: name }));
            }

            // Update state and close dialog
            select.value = key;
            internals.filename = name;
            dialog.close();
        },

        '[name="cancel"]': (button, e) => {
            const key = prefix + internals.filename;
            select.value = key;
            dialog.close();
        }
    }));

    return dialog;
}

export default element('<select is="storage-select">', {
    construct: function(shadow, internals, data) {
        events('input', this).each(overload((e) => e.target.value, {
            '': noop,

            '$store': (e) => {
                // If there is no current name open the Store As dialog
                if (!internals.filename) {
                    const id = this.getAttribute('storagedialog');
                    // Find dialog in local root or fallback to dialog in document
                    const dialog = showDialog(this, internals, id);
                    // Return select to default state
                    this.value = '';
                    // Mark as handled
                    e.preventDefault();
                    return;
                }

                // Compose name
                const key = this.prefix + internals.filename;
                // Save under the current name
                localStorage.setItem(key, JSON.stringify(this.data));
                // Reselect the current option
                select.value = key;
                // Mark as handled
                e.preventDefault();
            },

            '$store-as': (e) => {
                const id = this.getAttribute('storagedialog');
                // Find dialog in local root or fallback to dialog in document
                const dialog = showDialog(this, internals, id);
                // Return select to default state
                this.value = '';
                // Mark as handled
                e.preventDefault();
                return;
            },

            '$delete': (e) => {
                const key = this.prefix + internals.filename;
                // Remove data from localStorage
                localStorage.removeItem(key);
                // Remove option
                this.querySelector('[value="' + key + '"]').remove();
                // Select default option
                internals.filename = select.value = '';
                // Mark as handled
                e.preventDefault();
            },

            '$save-as': async (e) => {
                // Use the FileSystem API if available
                if (isTopWindow && window.showSaveFilePicker) {
                    saveAs(internals.filename + '.json', this.data, this.prefix);
                }
                // Fall back to an automatically clicked download link
                else {
                    downloadAs(internals.filename + '.json', this.data);
                }
                // Mark as handled
                e.preventDefault();
            },

            default: (e) => {
                // If a prefixed option is has been selected...
                if (!this.value.startsWith(this.prefix)) return;

                // then parse it as .data
                const json = localStorage.getItem(this.value);
                const data = JSON.parse(json);
                internals.filename = this.value.slice(this.prefix.length);
                this.data = data;
                // Mark as handled
                e.preventDefault();
            }
        }));
    },

    connect: function(shadow, internals, data) {
        //const marker = shadow.getElementById('default-option');

        // Return array of render signals
        return  Signal.frame(() => {
            const prefix = this.prefix;
            const options = Object.keys(localStorage)
                .filter((key) => key.startsWith(prefix))
                .map((key) => create('option', { value: key, text: key.slice(prefix.length) }));

            this.append.apply(this, options);

            // Select default option and update state
            internals.filename = this.value = '';
            this.data = null;

            // We want menu to start in default state, nothing selected (??)
            this.value = '';
            requestAnimationFrame(() => this.value = '');
        });
    }
}, {
    // Reserve the prefix '$' for internal use
    storagedialog: createStringAttribute('storagedialog', ''),

    // Reserve the prefix '$' for internal use
    prefix: createStringAttribute('prefix', '', (string) => {
        if (/^\$/.test(string)) throw new Error('<storage-select> prefix may not start with "$"');
        return string;
    }),
    // Declare title property to make it an observable signal
    filename: createStringAttribute('filename'),
    // Data is the parsed data object from storage
    data:     createObjectAttribute('data')
}, 'stephen.band/form-elements/storage-select/');
