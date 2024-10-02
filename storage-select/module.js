/**
<storage-select>

A select menu for saving data to localStorage.

## Import

Import and register the `<storage-select>` custom element, upgrading any
instances already in the DOM:

```js
import RangeInput from './build/storage-select.js';
```

## Use

You can now author `<storage-select>` elements in your HTML. By default the
element shows a menu of all data contained in localStorage:

```html
<storage-select></storage-select>
```

The `prefix` attribute makes `<storage-select>` show only data whose `localStorage`
key begins with the given prefix:

```html
<storage-select prefix="setting/"></storage-select>
```

The title attribute is reflected as the name of the default option:

```html
<storage-select prefix="setting/" title="Settings"></storage-select>
```

When an item in the menu is selected `<storage-select>` emits a `"change"` event,
its `.value` property is the (unprefixed) key and its `.data` property is the
corresponding data read from localStorage and parsed as JSON.
**/


import get      from 'fn/get.js';
import noop     from 'fn/noop.js';
import overload from 'fn/overload.js';
import create   from 'dom/create.js';
import delegate from 'dom/delegate.js';
import events   from 'dom/events.js';
import trigger  from 'dom/trigger.js';
import element, { render }  from 'dom/element-2.js';

//const stylesheet = new URL('./shadow.css', import.meta.url);
const stylesheet = import.meta.url.replace(/js$/, 'css');
const isTopWindow = (() => {
    // Test that we are not running in an iframe
    try { return window.self === window.top; }
    catch(e) { return false; }
})();

function stop(object) {
    object.stop();
}

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

export default element('storage-select', {
    shadow: `
        <link rel="stylesheet" href="${ stylesheet }"/>

        <select name="setting">
            <option value selected disabled id="default-option">Settings</option>
            <hr id="marker"/>
            <hr/>
            <option value="$store">Store</option>
            <option value="$store-as">Store As</option>
            <option value="$delete">Delete</option>
            <hr/>
            <option value="$save-as">Save as</option>
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
    `,

    construct: function(shadow, internals, data) {
        const select = shadow.querySelector('select');
        const dialog = shadow.querySelector('dialog');
        const marker = shadow.getElementById('marker');

        events('change', shadow).each(delegate({
            '[name="setting"]': overload(get('value'), {
                '': noop,

                '$store': (select, e) => {
                    // If there is no current name open the Save As dialog
                    if (!this.value) return dialog.showModal();
                    // Compose name
                    const key = this.prefix + this.value;
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
                    const key = this.prefix + this.value;
                    // Remove data from localStorage
                    localStorage.removeItem(key);
                    // Remove option
                    select.querySelector('[value="' + key + '"]').remove();
                    // Select default option
                    this.value = select.value = '';
                },

                '$save-as': async (select, e) => {
                    // Use the FileSystem API if available
                    if (isTopWindow && window.showSaveFilePicker) {
                        saveAs(this.value + '.json', this.data, this.prefix);
                    }
                    // Fall back to an automatically clicked download link
                    else {
                        downloadAs(this.value + '.json', this.data);
                    }
                },

                default: (select, e) => {
                    const json = localStorage.getItem(select.value);
                    const data = JSON.parse(json);

                    // If that worked update state
                    this.value = select.value.slice(this.prefix.length);
                    this.data  = data;

                    // Change events do not cross the shadow boundary. Emulate
                    // a change event when data has actually changed.
                    trigger('change', this);
                }
            })
        }));

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
                this.value = name;
                dialog.close();

                // Emit change event to outer DOM
                trigger('change', this);
            },

            '[name="close"]': (button, e) => {
                dialog.close();
            }
        }))
    },

    connect: function(shadow, internals, data) {
        const select = shadow.querySelector('select');
        const marker = shadow.getElementById('marker');

        // Declare render signals
        internals.renderers = [
            render(() => {
                const defaultOption = shadow.getElementById('default-option');
                defaultOption.textContent = this.title || 'Storage';
            }),

            render(() => {
                const prefix = this.prefix;
                const options = Object.keys(localStorage)
                    .filter((key) => key.startsWith(prefix))
                    .map((key) => create('option', { value: key, text: key.slice(prefix.length) }));

                // Remove existing options
                while (marker.nextElementSibling.matches('option')) marker.nextElementSibling.remove();

                // Insert new options
                marker.after.apply(marker, options);

                // Select default option and update state
                this.value = select.value = '';
                this.data  = {};

                // Emit change event
                trigger('change', this);
            })
        ];
    },

    disconnect: function(shadow, internals) {
        internals.renderers.forEach(stop);
    }
}, {
    // Declare title property to make it an observable signal
    title:  { type: 'string' },
    // Reserve the prefix '$' for internal use
    prefix: { type: 'string', pattern: /^(?!$\/)/ },
    // Value contains unprefixed key of storage data
    value:  { type: 'string' },
    // Data is the parsed data object from storage
    data:   { value: {}, enumerable: true, writable: true }
}, 'stephen.band/form-elements/storage-select/');
