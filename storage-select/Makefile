DEBUG=

# Tell make to ignore existing folders and allow overwriting existing files
.PHONY: literal number-control select-control range-input rotary-input xy-input y-input modules

# Must format with tabs not spaces
module:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../../fn/deno/make-modules.js ./build/storage-select.js ./module.js
