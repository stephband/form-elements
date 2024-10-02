DEBUG=

# Tell make to ignore existing folders and allow overwriting existing files
.PHONY: module

# Must format with tabs not spaces
module:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../../fn/deno/make-modules.js ./build/storage-select.js ./module.js
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../../fn/deno/make-css.js ./build/storage-select-shadow.css ./module.css
